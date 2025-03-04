import { CALCULATOR } from "./constants";
import { Co2ToTreesCalculatorFields, Co2ToTreesCalculatorInput, StatisticsResult, Tree } from "./types";
import { kgToTons, removeRandomObjects, tonsToKg } from "./utils";

/**
 * This class is responsible to calculate several statistics 
 * based on nature sinks and number of planted trees per year:
 * 1. The list of cumulative absorbed emissions per capita per year 
 * 2. The list of the cumulative differences among the emitted emissions and absorbed emissions per capita
 *  (cumulative refers to the fact that previous year emissions are added to current year; same
 *   goes for absorbed emissions, i.e. previous year absorbed emissions are added to current year)
 * 3. The list of the differences among the emitted emissions and absorbed emissions per capita
 *  (this is different from the statistic 2. because here the difference is not cumulative)
 * 4. The number of years required to become Carbon Negative 
 *  (i.e. the breakeven point of cumulative emitted - cumulative absorbed emissions) 
 */
export class Co2ToTreesCalculator {

    /*  the fields the calculator needs to compute the time to absorb 
        all co2 emissions and become Carbon Negative */
    private readonly fields: Co2ToTreesCalculatorFields;

    /*  cumulative yearly emissions starting from a person age */
    private readonly cumulativeYearlyEmissions: number[];

    /* cumulative yearly emissions absorbed by the planted trees 
       starting from a person age until lifeExpetancyInDevelopedCountries */
    private readonly cumulativeYearlyEmissionsAbsorbedByTrees: number[];

    /* cumulative yearly emissions absorbed by nature carbon sinks Per Capita 
       starting from a person age until lifeExpetancyInDevelopedCountries */
    private readonly cumulativeYearlyEmissionsAbsorbedByCarbonSinks: number[];

    /* cumulative yearly emissions emitted minus the cumulative absorbed by nature carbon sinks Per Capita 
       and planted trees starting from a person age until lifeExpetancyInDevelopedCountries */
    private readonly cumulativeEmittedMinusAbsorbed: number[];

    /* NON-cumulative yearly emissions emitted minus the non-cumulative absorbed by nature carbon sinks Per Capita 
       and planted trees each year starting from a person age until lifeExpetancyInDevelopedCountries */
    private readonly yearlyEmittedMinusAbsorbed: number[];

    /* The array of ALIVE trees that cumulative absorb emissions in the calculation each year */
    private trees: Tree[];

    /* the number of years needed to reach a breakeven point (i.e. to become Carbon Negative) */
    private yearsToBecomeCarbonNegative?: number;

    public constructor(input: Co2ToTreesCalculatorInput) {

        this.fields = {
            ...CALCULATOR.DEFAULT_VALUES,
            ...input,
            numberOfYearsOfAnalysis: CALCULATOR.LIFE_EXPECTANCY_DEVELOPED_COUNTRIES - input.personAge
        }

        this.cumulativeYearlyEmissions = [];
        this.cumulativeYearlyEmissionsAbsorbedByTrees = [];
        this.cumulativeYearlyEmissionsAbsorbedByCarbonSinks = [];
        this.cumulativeEmittedMinusAbsorbed = [];
        this.yearlyEmittedMinusAbsorbed = [];
        this.trees = [];
    }

    private getStartingYearlyEmissionsInKg() {
        return tonsToKg(this.fields.yearlyEmissionsInTons);
    }

    private getTreeEmissionsAbsorbed(treeAge: number) {
        return (Math.log2(treeAge) * this.fields.treeSizeMultiplier) + 3;
    }

    // returns the cumulative emissions of a specific year
    private getCumulativeEmissionsThisYear(yearlyEmissionsInKg: Readonly<number>, year: Readonly<number>) {
        if (this.cumulativeYearlyEmissions.length === 0) {
            const additionalLifeEmissions = yearlyEmissionsInKg * this.fields.personAge;
            return yearlyEmissionsInKg + additionalLifeEmissions;
        } else {
            console.log([yearlyEmissionsInKg, this.cumulativeYearlyEmissions[year - 1]]);
            return yearlyEmissionsInKg + this.cumulativeYearlyEmissions[year - 1];
        }
    }

    /**
     * computes the reduction rate to be applied this year
     * @param emissionsReductionRateForCurrentYear 
     * @param maxReductionRate the maximum yearly reduction rate
     * @returns the reduction rate to be applied this year
     */
    private getEmissionsReductionRateThisYear(
        emissionsReductionRateForCurrentYear: Readonly<number>, 
        maxReductionRate = CALCULATOR.MAX_YEARLY_EMISSIONS_REDUCTION_RATE) {
            return Math.min(
                emissionsReductionRateForCurrentYear + this.fields.emissionReductionRate, 
                maxReductionRate
            );
    }

    private getTreesPlantedThisYear() {
        const treesPlantedThisYear: Array<Tree> = [];
        // trees are planted with a specific age, this age is assigned randomly
        // with values from 1 to 6 (years old)
        const randomTreePlantedAge = Math.floor(
            (Math.random() * CALCULATOR.MAX_TREE_PLANTED_AGE) + CALCULATOR.MIN_TREE_PLANTED_AGE
        );
        for(let i = 0; i < this.fields.treesPlantedEachYear; i++) {
            treesPlantedThisYear.push({
                age: randomTreePlantedAge,
            });
        }

        return treesPlantedThisYear;
    }
    
    /**
     * @returns the sum of all co2 absorbed by the "alive" trees each year
     */
    private getSumOfAbsorbedCo2ThisYear() {
        return this.trees.map(t => {
            return this.getTreeEmissionsAbsorbed(t.age);
        }).reduce((emAbs1, emAbs2) => emAbs1 + emAbs2, 0);
    }

    /**
     * computes several operations on the trees array and returns it
     * 1. increments the age of trees by 1
     * 2. it removes randomly diying trees
     * 3. gets newly planted trees and adds them to the array
     */
    private computeOperationsOnTrees(inputTrees: Tree[]) {
        // increment the trees age by one year
        let trees = this.getTreesWithAgeIncremented(inputTrees);

        // make some trees randomly dies as it would happen in nature
        // trees that are dead are simply removed, i.e. in trees array only alive trees remain
        trees = this.removeRandomlyDiedTrees(trees);

        // adds the trees that each year are planted
        return [...trees, ...this.getTreesPlantedThisYear()];
    }

    /**
     * @param inputTrees 
     * @returns the inputTrees with the field age incremented
     */
    private getTreesWithAgeIncremented(inputTrees: Tree[]) {
        return inputTrees.map(t => ({
            ...t,
            age: t.age + 1
        }));
    }

    /**
     * @returns an array of trees with the "died" ones removed
     */
    private removeRandomlyDiedTrees(inputTrees: Tree[]) {
        const trees = [ ...inputTrees ];
        const numberOfTreesToRemove = trees.length * this.fields.yearlyTreeDeathRate;
        return removeRandomObjects(trees, numberOfTreesToRemove);
    }

    /**
     *  reduce the yearly emissions per year. If the yearlyEmissionsInKg of "this year" are
        less than the minPercentageOfEmissions (by default 20%) 
        of the original emissions received as input no reduction is performed
     * @param yearlyEmissionsInKg the yearlyEmissionsInKg before reduction
     * @param emissionsReductionRateForThisYear the emissionsReductionRateForThisYear to be applied
     * @param minPercentageOfEmissions used to define a maximum limit in emissions reduction compared to the start
     * @returns 
     */
    private getReducedYearlyEmissionsInKg(
        yearlyEmissionsInKg: number, 
        emissionsReductionRateForThisYear: number,
        minPercentageOfEmissions = 0.2) {
        if(yearlyEmissionsInKg / this.getStartingYearlyEmissionsInKg() > minPercentageOfEmissions) {
            yearlyEmissionsInKg -= yearlyEmissionsInKg * emissionsReductionRateForThisYear;
        }
        
        return yearlyEmissionsInKg
    }

    
    /**
     * computes several statistics, such as the cumulative lifetime emissions, the cumulative lifetime absorbtion
     * the cumulative difference of the two just mentioned. The cumulative absorbed emissions by Nature Sinks,
     * the cumulative absorbed by the trees, the years to become carbon negative.
     * Internally it computes yearly statistics used to compute the cumulative statistics iteratively
     * @returns the statistics
     */
    public performEmissionAnalysis(): StatisticsResult {
        let yearlyEmissionsInKg = this.getStartingYearlyEmissionsInKg();
        let emissionsReductionRateForThisYear = this.fields.emissionReductionRate;
        let kgOfCo2AbsorbedByNatureThisYear = this.fields.yearlyKgNatureCo2SinkWorldwide;
        let humansOnEarthThisYear = this.fields.humansOnEarth;

        const averageYearlyPopulationDeltaIncrease = (
                this.fields.peakWorlwidePopulationPredicted - this.fields.humansOnEarth
            ) / this.fields.numberOfYearsOfAnalysis

        // this loop simulate the passing of time in year and computes all statistics
        // described in the class comment 
        for(let year = 0; year < this.fields.numberOfYearsOfAnalysis; year++) {
            const cumulativeEmissionsThisYear = this.getCumulativeEmissionsThisYear(yearlyEmissionsInKg, year);
            this.cumulativeYearlyEmissions.push(cumulativeEmissionsThisYear);

            this.trees = this.computeOperationsOnTrees(this.trees);

            const absorbedCo2ThisYearByPlantedTrees = this.getSumOfAbsorbedCo2ThisYear();

            const natureCarbonSinkPerCapitaThisYear = kgOfCo2AbsorbedByNatureThisYear / humansOnEarthThisYear;

            // add the emissions absorbed by the planted trees and by nature carbon sinks
            // to the cumulative arrays
            if ( year === 0 ){
                this.cumulativeYearlyEmissionsAbsorbedByTrees.push(absorbedCo2ThisYearByPlantedTrees);
                this.cumulativeYearlyEmissionsAbsorbedByCarbonSinks.push(natureCarbonSinkPerCapitaThisYear);
            } else {
                this.cumulativeYearlyEmissionsAbsorbedByTrees.push(
                    absorbedCo2ThisYearByPlantedTrees + this.cumulativeYearlyEmissionsAbsorbedByTrees[year - 1])
                this.cumulativeYearlyEmissionsAbsorbedByCarbonSinks.push(
                    natureCarbonSinkPerCapitaThisYear + this.cumulativeYearlyEmissionsAbsorbedByCarbonSinks[year - 1])
            }

            this.yearlyEmittedMinusAbsorbed.push(yearlyEmissionsInKg - absorbedCo2ThisYearByPlantedTrees - natureCarbonSinkPerCapitaThisYear)
            
            // compute the difference among the cumulative emissions and the cumulative absorbed emissions
            const cumulativeDiffEmittedMinusAbsorbed = this.cumulativeYearlyEmissions[year] - 
                    this.cumulativeYearlyEmissionsAbsorbedByTrees[year] - 
                        this.cumulativeYearlyEmissionsAbsorbedByCarbonSinks[year];

            this.cumulativeEmittedMinusAbsorbed.push(cumulativeDiffEmittedMinusAbsorbed);

            kgOfCo2AbsorbedByNatureThisYear -= kgOfCo2AbsorbedByNatureThisYear * this.fields.natureCo2SinkReductionRate;
            
            humansOnEarthThisYear += averageYearlyPopulationDeltaIncrease
            
            // compute the emission reduction rate (this value is cumulative)
            emissionsReductionRateForThisYear = this.getEmissionsReductionRateThisYear(emissionsReductionRateForThisYear);

            yearlyEmissionsInKg = this.getReducedYearlyEmissionsInKg(yearlyEmissionsInKg, emissionsReductionRateForThisYear);

            // if cumulativeDiffEmittedMinusAbsorbed is < 0 means the breakeven year of becoming
            // carbon negative is not set, than it means this year is the "breakeven" one. Hurray! 
            if (cumulativeDiffEmittedMinusAbsorbed < 0 && !this.yearsToBecomeCarbonNegative) {
                this.yearsToBecomeCarbonNegative = year;
            }
        }

        return this.getStatistics();
    }

    private getStatistics() {
        return {
           cumulativeYearlyEmissions: this.cumulativeYearlyEmissions.map(c => kgToTons(c)),
           cumulativeYearlyEmissionsAbsorbedByTrees: this.cumulativeYearlyEmissionsAbsorbedByTrees.map(c => kgToTons(c)),
           cumulativeYearlyEmissionsAbsorbedByCarbonSinks: this.cumulativeYearlyEmissionsAbsorbedByCarbonSinks.map(c => kgToTons(c)),
           cumulativeEmittedMinusAbsorbed: this.cumulativeEmittedMinusAbsorbed.map(c => kgToTons(c)),
           yearlyEmittedMinusAbsorbed: this.yearlyEmittedMinusAbsorbed.map(c => kgToTons(c)),
           yearsToBecomeCarbonNegative: this.yearsToBecomeCarbonNegative
        }
    }
}
import { removeRandomObjects } from "./utils";

export type Co2ToTreesCalculatorInput = {
    personAge: number;
    yearlyEmissionsInTons?: number;
    treesPlantedEachYear: Readonly<number>;
}

export type StatisticsResult = {
    cumulativeYearlyEmissions: number[];
    cumulativeYearlyEmissionsAbsorbedByTrees: number[];
    cumulativeYearlyEmissionsAbsorbedByCarbonSinks: number[];
    cumulativeEmittedMinusAbsorbed: number[];
    yearlyEmittedMinusAbsorbed: number[];
    yearsToBecomeCarbonNegative: number | undefined;
};

type Co2ToTreesCalculatorFields = Required<Readonly<Co2ToTreesCalculatorInput>> & {
    humansOnEarth: number;
    numberOfYearsOfAnalysis: Readonly<number>;
    emissionReductionRate: Readonly<number>;
    natureCo2SinkReductionRate: Readonly<number>;
    yearlyKgNatureCo2SinkWorldwide: Readonly<number>;
    peakWorlwidePopulationPredicted: Readonly<number>;
    yearlyTreeDeathRate: Readonly<number>;
    treeSizeMultiplier: Readonly<number>;
}

type Tree = {
    age: number;
}

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

    /* average life expetancy in developed countries */
    private readonly lifeExpetancyInDevelopedCountries = 80;

    /* the number of years needed to reach a breakeven point (i.e. to become Carbon Negative) */
    private trees: Tree[];

    /* the number of years needed to reach a breakeven point (i.e. to become Carbon Negative) */
    private yearsToBecomeCarbonNegative?: number;

    public constructor(input: Co2ToTreesCalculatorInput) {
        
        const defaultCalculatorFields = {
            // This is the current number of humans on earth (default to 2025)
            humansOnEarth: 8100000000,
            // Society is reducing its emissions. This rate is an assumption of the rate of yearly emissions reduction
            emissionReductionRate: 0.01,
            // Nature carbon sinks slowly absorb less. This rate is the rate of nature absorbtion reduction
            natureCo2SinkReductionRate: 0.01,
            // 18.5 gigatons estimated to be asborbed by nature each year
            yearlyKgNatureCo2SinkWorldwide: 18500000000000,
            // 10.5 billion predicted as peak worldwide population by 2100
            peakWorlwidePopulationPredicted: 10500000000,
            // the rate at which trees die each year
            yearlyTreeDeathRate: 0.2,
            // the starting emissions of a person in Tons
            yearlyEmissionsInTons: 9,
            // a multiplier used as an assumption to how much carbon each tree each year absorbs
            treeSizeMultiplier: 3.5,
        } as const

        this.fields = {
            ...defaultCalculatorFields,
            ...input,
            numberOfYearsOfAnalysis: this.lifeExpetancyInDevelopedCountries - input.personAge
        }

        this.cumulativeYearlyEmissions = [];
        this.cumulativeYearlyEmissionsAbsorbedByTrees = [];
        this.cumulativeYearlyEmissionsAbsorbedByCarbonSinks = [];
        this.cumulativeEmittedMinusAbsorbed = [];
        this.yearlyEmittedMinusAbsorbed = [];
        this.trees = [];
        
    }

    private getStartingYearlyEmissionsInKg() {
        return this.fields.yearlyEmissionsInTons * 1000;
    }

    private getTreeEmissionsAbsorbed(treeAge: number) {
        if(treeAge === 0) return 1;
        else return (Math.log2(treeAge) * this.fields.treeSizeMultiplier) + 3;
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
        maxReductionRate: Readonly<number> = 0.08) {
            return Math.min(
                emissionsReductionRateForCurrentYear + this.fields.emissionReductionRate, 
                maxReductionRate
            );
    }

    private getTreesPlantedThisYear() {
        const treesPlantedThisYear: Array<Tree> = [];
        for(let i = 0; i < this.fields.treesPlantedEachYear; i++) {
            treesPlantedThisYear.push({
                age: 1,
            });
        }

        return treesPlantedThisYear;
    }
    
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
        let trees = this.getTreesWithAgeIncrementedByOne(inputTrees);

        // make some trees randomly dies as it would happen in nature
        trees = this.getTreesRemovingRandomlyDiedOnes(trees);

         // add the trees that each year are planted
        return [...trees, ...this.getTreesPlantedThisYear()];
    }

    private getTreesWithAgeIncrementedByOne(inputTrees: Tree[]) {
        return inputTrees.map(t => ({
            ...t,
            age: t.age + 1
        }));
    }

    /**
     * @returns an array of trees with the "died" ones removed
     */
    private getTreesRemovingRandomlyDiedOnes(inputTrees: Tree[]) {
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
           cumulativeYearlyEmissions: this.cumulativeYearlyEmissions,
           cumulativeYearlyEmissionsAbsorbedByTrees: this.cumulativeYearlyEmissionsAbsorbedByTrees,
           cumulativeYearlyEmissionsAbsorbedByCarbonSinks: this.cumulativeYearlyEmissionsAbsorbedByCarbonSinks,
           cumulativeEmittedMinusAbsorbed: this.cumulativeEmittedMinusAbsorbed,
           yearlyEmittedMinusAbsorbed: this.yearlyEmittedMinusAbsorbed,
           yearsToBecomeCarbonNegative: this.yearsToBecomeCarbonNegative
        }
    }
}
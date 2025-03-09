import { getCalculatorSchema } from "@/app/components/validators/calculator-schema";
import { z } from "zod";

// ________START COMMON TYPES________
export type ParamsType = Promise<Record<string, string>>;
// ________END COMMON TYPES________

// ________START CALCULATOR SCHEMA TYPES________
export type FormInputInfoType = { 
    label: string;
    name: keyof CalculatorSchemaType;
    type: string;
    placeholder?: string;
    min?: number;
    max?: number;
}

export type CalculatorSchemaDefaultValuesType = Readonly<{
    age: string;
    trees: number;
    yearlyEmissionsInTons: number;
}>;

const translationsFnMockToCreateType = (l: string) => l;

// eslint-disable-next-line
const calculatorSchema = getCalculatorSchema<typeof translationsFnMockToCreateType>(translationsFnMockToCreateType);
export type CalculatorSchemaType = z.infer<typeof calculatorSchema>;
// ________END CALCULATOR SCHEMA TYPES________

// ________START COMPONENT TYPES________
export type CarouselItemType = {
    title: string;
    todos: TodoItemType[];
};

export type TodoItemType =
    | string
    | { type: "list"; text: string; items: string[] }
    | { type: "button"; text: string; label: string; href: string }
    | { type: "logo"; text: string; links: { href: string; label: string }[] };
//________END COMPONENT TYPES________

//________START CALCULATOR TYPES________
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

export type Co2ToTreesCalculatorFields = Required<Readonly<Co2ToTreesCalculatorInput>> & {
    humansOnEarth: number;
    numberOfYearsOfAnalysis: Readonly<number>;
    emissionReductionRate: Readonly<number>;
    natureCo2SinkReductionRate: Readonly<number>;
    yearlyKgNatureCo2SinkWorldwide: Readonly<number>;
    peakWorlwidePopulationPredicted: Readonly<number>;
    yearlyTreeDeathRate: Readonly<number>;
    treeSizeMultiplier: Readonly<number>;
}

export type Tree = {
    age: number;
}
//________END CALCULATOR TYPES________
import { FormInputInfoType } from "./types";

export const THEME_TYPE = {
    LIGHT: 'light',
    DARK: 'dark'
} as const;

export const FORM_CALCULATOR = {
    getInputInfoList: <T extends CallableFunction>(t: T): FormInputInfoType[] => [
        {
            label: t("inputLabelAge"),
            name: "age",
            type: "number",
            min: 1,
            max: 80,
        },
        {
            label: t("inputLabelTrees"),
            name: "trees",
            type: "number",
            min: 1,
        },
        {
            label: t("inputLabelYearlyEmissionsInTons"),
            name: "yearlyEmissionsInTons",
            placeholder: t("inputPlaceholderEmissionsInTons"),
            type: "number",
            min: 0,
        },
    ],
    DEFAULT_VALUES: {
        age: "",
        trees: 1,
        yearlyEmissionsInTons: 9
    }
};

export const CALCULATOR_SCHEMA = {
    AGE: {
        MIN: 1,
        MAX: 80
    } as const,
    TREES: {
        MIN: 1
    } as const,
    YEARLY_EMISSIONS_IN_TONS: {
        MIN: 0
    } as const
} as const;

export const CALCULATOR = {
    DEFAULT_VALUES: {
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
    } as const,
    LIFE_EXPECTANCY_DEVELOPED_COUNTRIES: 80,
    MAX_YEARLY_EMISSIONS_REDUCTION_RATE: 0.08,
    MIN_TREE_PLANTED_AGE: 1,
    MAX_TREE_PLANTED_AGE: 6
} as const;

export const EMISSIONS_ABSORBTION_CHART = {
    color1: 'green',
    color2: 'blue',
} as const;

export const EMISSIONS_CHART = {
    color1: 'red',
    color2: 'orange',
} as const;
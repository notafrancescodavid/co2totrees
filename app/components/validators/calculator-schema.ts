import { z } from "zod"

export const CalculatorSchema = z.object({
    age: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)), // Convert empty string to `undefined`
        z.number({
          required_error: "Age is required.", // Shows error when empty
          invalid_type_error: "Age is required and must be a number.",
        })
        .min(1, { message: "Age must be at least 1 year old." })
        .max(80, { message: "Age must be at less than 80 years old." })
    ),
    trees: z.coerce.number().min(1, {
        message: "The number of trees must be higher than 0"
    }),
    yearlyEmissionsInTons: z.coerce.number().min(0, {
        message: "The number of tons of Co2 emissions must be greater than 0"
    })
}).required({
    age: true,
    trees: true,
});

export type CalculatorSchemaType = {
    ""?: string;
  } & z.infer<typeof CalculatorSchema>;

export const calculatorSchemaDefaultValues = {
    age: "",
    trees: 1,
    yearlyEmissionsInTons: 9
}

type FormInputInfoType = { 
    label: string;
    name: keyof CalculatorSchemaType;
    type: string;
    placeholder?: string;
    min?: number;
    max?: number;
}

export const formInputInfo: Array<FormInputInfoType> = [
    {
        label: "Your Age",
        name: "age",
        type: "number",
        min: 1,
        max: 100,
    },
    {
        label: "Number of Trees",
        name: "trees",
        type: "number",
        min: 1,
    },
    {
        label: "Your Yearly Co2 Emissions in tons",
        name: "yearlyEmissionsInTons",
        placeholder: "Co2 Emissions in tons",
        type: "number",
        min: 0,
    },
]
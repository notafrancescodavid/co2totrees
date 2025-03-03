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
    smTrees: z.coerce.number().min(0, {
        message: "The number of trees must be higher than or equal to 0"
    }),
    mdTrees: z.coerce.number().min(0, {
        message: "The number of trees must be higher than or equal to 0"
    }),
    lgTrees: z.coerce.number().min(0, {
        message: "The number of trees must be higher than or equal to 0"
    }),
    xlTrees: z.coerce.number().min(0, {
        message: "The number of trees must be higher than or equal to 0"
    }),
    yearlyEmissionsInTons: z.coerce.number().min(0, {
        message: "The number of tons of Co2 emissions must be greater than 0"
    })
}).required({
    age: true,
    smTrees: true,
    mdTrees: true,
    lgTrees: true,
    xlTrees: true
}).refine(schema => 
    schema.smTrees + schema.mdTrees + schema.lgTrees + schema.xlTrees > 0,
    {
        message:"The sum of the trees must be greater than 0",
    },
)


export type CalculatorSchemaType = {
    ""?: string;
  } & z.infer<typeof CalculatorSchema>;

export const calculatorSchemaDefaultValues = {
    age: "",
    smTrees: 0,
    mdTrees: 0,
    lgTrees: 0,
    xlTrees: 0,
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
        label: "Number of Small Trees",
        name: "smTrees",
        type: "number",
        min: 1,
    },
    {
        label: "Number of Medium-sized Trees",
        name: "mdTrees",
        type: "number",
        min: 0,
    },
    {
        label: "Number of Large Trees",
        name: "lgTrees",
        type: "number",
        min: 0,
    },
    {
        label: "Number of Huge Trees",
        name: "xlTrees",
        type: "number",
        min: 0,
    },
    {
        label: "Your Yearly Co2 Emissions in tons",
        name: "yearlyEmissionsInTons",
        placeholder: "Co2 Emissions in tons",
        type: "number",
        min: 0,
    },
]
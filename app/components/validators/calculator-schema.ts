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
import { CALCULATOR_SCHEMA } from "@/lib/constants";
import { z } from "zod"

export const getCalculatorSchema = <T extends CallableFunction>(t: T) => {
    return z.object({
        age: z.preprocess(
            (val) => (val === "" ? undefined : Number(val)), // Convert empty string to `undefined`
            z.number({
              required_error: t('ageRequiredError'), // Shows error when empty
              invalid_type_error: t('ageInvalidTypeError'),
            })
            .min(CALCULATOR_SCHEMA.AGE.MIN, { message: t('ageMinError', { min: CALCULATOR_SCHEMA.AGE.MIN}) })
            .max(CALCULATOR_SCHEMA.AGE.MAX, { message: t('ageMaxError', { max: CALCULATOR_SCHEMA.AGE.MAX}) })
        ),
        trees: z.coerce.number().min(CALCULATOR_SCHEMA.TREES.MIN, {
            message: t('treesMinError', { min: CALCULATOR_SCHEMA.TREES.MIN })
        }),
        yearlyEmissionsInTons: z.coerce.number().min(CALCULATOR_SCHEMA.YEARLY_EMISSIONS_IN_TONS.MIN, {
            message: t('yearlyEmissionsMinError', { min: CALCULATOR_SCHEMA.YEARLY_EMISSIONS_IN_TONS.MIN })
        })
    }).required({
        age: true,
        trees: true,
    });
}
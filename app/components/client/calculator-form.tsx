"use client"

import { Button } from "@/components/ui/button"

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { getCalculatorSchema } from "../validators/calculator-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { FORM_CALCULATOR } from "@/lib/constants"
import { CalculatorSchemaDefaultValuesType, CalculatorSchemaType } from "@/lib/types"
import { useTranslations } from "next-intl"

type Props = { 
    convertAndShowChart: CallableFunction;
    data: CalculatorSchemaType | null;
};

export default function CalculatorForm({ convertAndShowChart, data }: Props) {
    const t = useTranslations('CalculatorForm');
    const tCalculatorSchema = useTranslations('calculatorSchema');

    const form = useForm<CalculatorSchemaType>({
        resolver: zodResolver(getCalculatorSchema<typeof tCalculatorSchema>(tCalculatorSchema)),
        defaultValues: data || FORM_CALCULATOR.DEFAULT_VALUES as CalculatorSchemaDefaultValuesType & { age: number },
    })
 
    const onSubmit = (data: CalculatorSchemaType) => {
        convertAndShowChart(data);
    }

    const inputInfoList = FORM_CALCULATOR.getInputInfoList(t);

    return <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <CardHeader>
                    <CardTitle className="text-3xl">{t('cardTitle')}</CardTitle>
                    <CardDescription className="text-md">
                        {t('cardDescription')}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>ⓘ</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div>{t('cardTooltipPart1')}</div>
                                    <div>{t('cardTooltipPart2')}</div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        {inputInfoList.map((f, idx) =>
                            <FormField
                                key={idx}
                                control={form.control}
                                name={f.name}
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel>{f.label}</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type={f.type} 
                                                    placeholder={f?.placeholder || f.label} 
                                                    {...(f.min !== undefined && { min: f.min })} 
                                                    {...(f.max !== undefined && { max: f.max })}
                                                    {...field} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </div>
                </CardContent>
                <CardFooter className="flex float-right">
                    <Button type="submit">{t('checkNow')}</Button>
                </CardFooter>
            </form>
        </Form>
}
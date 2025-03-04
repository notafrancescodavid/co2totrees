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

import { CalculatorSchema } from "../validators/calculator-schema"
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

type Props = { 
    convertAndShowChart: CallableFunction 
};

export default function CalculatorForm({ convertAndShowChart }: Props) {
    const form = useForm<CalculatorSchemaType>({
        resolver: zodResolver(CalculatorSchema),
        defaultValues: FORM_CALCULATOR.DEFAULT_VALUES as CalculatorSchemaDefaultValuesType & { age: number },
    })
     
    const onSubmit = (data: CalculatorSchemaType) => {
        convertAndShowChart(data);
    }

    return <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <CardHeader>
                    <CardTitle className="text-3xl">When will I be Carbon Negative? 🤔</CardTitle>
                    <CardDescription className="text-md">
                        Discover how much time you need to offset your lifetime Co2 Emissions and be Carbon Negative depending on how many trees you plant.
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span> ⓘ</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div>You become Carbon Negative when you absorbed</div>
                                    <div>more than your lifetime Co2 emissions.</div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        {FORM_CALCULATOR.INPUT_INFO_LIST.map((f, idx) =>
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
                    <Button type="submit">Check now</Button>
                </CardFooter>
            </form>
        </Form>
}
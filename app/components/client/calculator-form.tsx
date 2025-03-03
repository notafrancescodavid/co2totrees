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

import { CalculatorSchema, calculatorSchemaDefaultValues, CalculatorSchemaType, formInputInfo } from "../validators/calculator-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"

export default function CalculatorForm({ convertAndShowChart }: { convertAndShowChart: CallableFunction}) {
    const form = useForm<CalculatorSchemaType>({
        resolver: zodResolver(CalculatorSchema),
        defaultValues: calculatorSchemaDefaultValues as typeof calculatorSchemaDefaultValues & { age: number },
    })
     
    const onSubmit = (data: CalculatorSchemaType) => {
        convertAndShowChart(data);
    }

    return <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <CardHeader>
                    <CardTitle className="text-3xl">Co2 to Trees Converter</CardTitle>
                    <CardDescription className="text-md">
                        Imagine you plant some trees every year. These trees will grow mature as small, medium and large sized trees.
                        Discover how many trees you need to offset your Co2 Emissions and how much time you need to be Carbon Negative
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
                        {formInputInfo.map((f, idx) => 
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
                        {form.formState.errors[""]?.message && 
                            <p className="text-red-500">{form.formState.errors[""].message}</p>}
                    </div>
                </div>
                </CardContent>
                <CardFooter className="flex float-right">
                    <Button type="submit">Check now</Button>
                </CardFooter>
            </form>
        </Form>
}
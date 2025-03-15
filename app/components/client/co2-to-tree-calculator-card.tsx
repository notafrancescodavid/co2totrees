"use client"

import { useCallback, useRef, useState } from "react";

import {
  Card,
} from "@/components/ui/card"

import CalculatorForm from "./calculator-form"
import CalculatedChartWrapper from "./calculated-chart-wrapper";
import { CalculatorSchemaType } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function Co2ToTreeCalculatorCard({ className = "" }) {
    const dataRef = useRef<CalculatorSchemaType | null>(null);
    const [showChart, setShowChart] = useState(false);
    
    const convertAndShowChart = useCallback((data: CalculatorSchemaType) => {
        //convert the planted trees into a multi-year chart and show the chart
        dataRef.current = data;
        setShowChart(true);
    }, []);

    const backToCalculator = useCallback(() => {
        setShowChart(false);
    }, []);

    const cssClass = showChart && dataRef.current? 
        `my-10 w-9/10 sm:w-4/5 lg:w-3/5`:
        `my-10 w-9/10 sm:w-3/5 lg:w-2/5`;
    
    return <Card className={cn(cssClass,className)}>
            { showChart && dataRef.current?
                <CalculatedChartWrapper backToCalculator={backToCalculator} data={dataRef.current}/>
                : <CalculatorForm convertAndShowChart={convertAndShowChart} data={dataRef.current}/> 
            }
        </Card>
}
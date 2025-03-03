"use client"

import { useCallback, useRef, useState } from "react";

import {
  Card,
} from "@/components/ui/card"

import CalculatorForm from "./calculator-form"
import CalculatedChartWrapper from "./calculated-chart-wrapper";
import { CalculatorSchemaType } from "../validators/calculator-schema";

export default function Co2ToTreeCalculatorCard() {
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
        `my-10 w-4/5 sm:w-4/5 lg:w-3/5`:
        `my-10 w-4/5 sm:w-3/5 lg:w-2/5`;
    
    return (
        <Card className={cssClass}>
            { showChart && dataRef.current?
                <CalculatedChartWrapper backToCalculator={backToCalculator} data={dataRef.current}/>
                : <CalculatorForm convertAndShowChart={convertAndShowChart} /> 
            }
        </Card>
    )
}
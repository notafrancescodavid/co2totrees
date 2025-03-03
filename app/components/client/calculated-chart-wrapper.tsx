'use client'

import { Button } from "@/components/ui/button";
import { CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { MouseEventHandler, useMemo } from "react";
import { CalculatorSchemaType } from "../validators/calculator-schema";
import { Co2ToTreesCalculator } from "@/lib/Co2ToTreesCalculator";
import { EmissionsChart } from "./charts/emissions-chart";
import { EmissionsAbsorbtionChart } from "./charts/emissions-absorbtion-chart";
import Link from "next/link";
import ChartCard from "./chart-card";

type CalculatedChartProps = { backToCalculator: MouseEventHandler<HTMLButtonElement>, data: CalculatorSchemaType };

export default function CalculatedChartWrapper({ backToCalculator, data } : CalculatedChartProps) {
   const { age, trees, yearlyEmissionsInTons } = data;

   const stats = useMemo(() => {
      const calculator = new Co2ToTreesCalculator({
         personAge: age,
         yearlyEmissionsInTons: yearlyEmissionsInTons,
         treesPlantedEachYear: trees
      });

      return calculator.performEmissionAnalysis();
   }, [age, yearlyEmissionsInTons, trees]);

   const cumulativeEmissionsChartTitle = "Cumulative Emissions & Cumulative Emissions minus Cumulative Absorbed Emissions";
   const absorbedEmissionsChartTitle = "Absorbed Emissions by nature sinks & Absorbed Emissions by the trees you imagine to plant every year";

   return (<>
      <CardHeader>
         <CardTitle className="text-3xl">
            When will I be Carbon Negative?
            <span className="float-right">
               <Button onClick={backToCalculator}>Back to the calculator</Button>
            </span>
         </CardTitle>
         <CardDescription className="text-md">
            <div className="text-xl my-5 pl-6">
               {stats.yearsToBecomeCarbonNegative ? <>
                        You will become Carbon Negative in <span className="text-lg font-semibold">{(new Date()).getFullYear() + stats.yearsToBecomeCarbonNegative}</span>.
                        You will need <span className="text-lg font-semibold">{stats.yearsToBecomeCarbonNegative} years</span> to absorb all your Co2 emissions 
                        by planting every year <span className="text-lg font-semibold">{data.trees} trees</span>.
                  </>
                  : `You would not be able to absorb all your Co2 emissions in your lifetime by planting every year ${data.trees} trees.`
               }
            </div>
            <Link href="/reduce-emissions" className="mt-5">
               <Button variant="outline" className="min-w-full">I Want to Reduce My Emissions</Button>
            </Link>
         </CardDescription>
      </CardHeader>
      <CardContent>
         <ChartCard title={cumulativeEmissionsChartTitle} chart={<EmissionsChart stats={stats} />} />
         <ChartCard title={absorbedEmissionsChartTitle} chart={<EmissionsAbsorbtionChart stats={stats} />} />
      </CardContent>
   </>)
}
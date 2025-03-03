'use client'

import { Button } from "@/components/ui/button";
import { CardHeader, CardDescription, CardContent, CardFooter, CardTitle, Card } from "@/components/ui/card";
import { MouseEventHandler, useMemo } from "react";
import { CalculatorSchemaType } from "../validators/calculator-schema";
import { Co2ToTreesCalculator } from "@/lib/Co2ToTreesCalculator";
import { EmissionsChart } from "./charts/emissions-chart";
import { EmissionsAbsorbtionChart } from "./charts/emissions-absorbtion-chart";
import Link from "next/link";
import ChartCard from "./chart-card";

type CalculatedChartProps = { backToCalculator: MouseEventHandler<HTMLButtonElement>, data: CalculatorSchemaType };

export default function CalculatedChartWrapper({ backToCalculator, data } : CalculatedChartProps) {
   const { age, smTrees, mdTrees, lgTrees, xlTrees, yearlyEmissionsInTons } = data;

   const stats = useMemo(() => {
      const calculator = new Co2ToTreesCalculator({
         personAge: age,
         yearlyEmissionsInTons: yearlyEmissionsInTons,
         treesPlantedEachYear: { smTrees, mdTrees, lgTrees, xlTrees }
      });

      return calculator.performEmissionAnalysis();
   }, [age, yearlyEmissionsInTons, smTrees, mdTrees, lgTrees, xlTrees]);

   const getTreeNumberLi = (treeNumber: number, sizeString: string) => treeNumber > 0 ? 
         <li>
            <span className="text-lg font-semibold">{treeNumber} trees</span> that become {sizeString} when fully grown
         </li> : '';

   const cumulativeEmissionsChartTitle = "Cumulative Emissions & Cumulative Emissions minus Cumulative Absorbed Emissions";
   const absorbedEmissionsChartTitle = "Absorbed Emissions by nature sinks & Absorbed Emissions by the trees you imagine to plant every year";

   return (<>
      <CardHeader>
         <CardTitle className="text-3xl">
            Co2 to Trees Converter
            <span className="float-right">
               <Button onClick={backToCalculator}>Back to the calculator</Button>
            </span>
         </CardTitle>
         <CardDescription className="text-md">
            <div className="text-xl mt-5 pl-6">
               {stats.yearsToBecomeCarbonNegative ? <>
                        You will become Carbon Negative in <span className="text-lg font-semibold">{(new Date()).getFullYear() + stats.yearsToBecomeCarbonNegative}</span>.
                        You will need <span className="text-lg font-semibold">{stats.yearsToBecomeCarbonNegative} years</span> to absorb all your Co2 emissions by planting every year:
                  </>
                  : 'You would not be able to absorb all your Co2 emissions in your lifetime by planting every year:'
               }
            </div>
            <ul className="my-6 ml-6 list-none [&>li]:mt-2">
               {getTreeNumberLi(data.smTrees, 'small')}
               {getTreeNumberLi(data.mdTrees, 'medium-sized')}
               {getTreeNumberLi(data.lgTrees, 'large')}
               {getTreeNumberLi(data.xlTrees, 'huge')}
            </ul>
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
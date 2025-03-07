'use client'

import { Button } from "@/components/ui/button";
import { CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { memo, MouseEventHandler, useMemo } from "react";
import { Co2ToTreesCalculator } from "@/lib/Co2ToTreesCalculator";
import { EmissionsChart } from "./charts/emissions-chart";
import { EmissionsAbsorbtionChart } from "./charts/emissions-absorbtion-chart";
import { Link } from '@/i18n/navigation';
import ChartCard from "./chart-card";
import { CalculatorSchemaType } from "@/lib/types";
import { useTranslations } from "next-intl";

type Props = { 
   backToCalculator: MouseEventHandler<HTMLButtonElement>, 
   data: CalculatorSchemaType 
};

export default memo(function CalculatedChartWrapper({ backToCalculator, data } : Props) {
   const t = useTranslations('CalculatedChartWrapper');
   const tCommon = useTranslations('common');
   const { age, trees, yearlyEmissionsInTons } = data;

   const stats = useMemo(() => {
      const calculator = new Co2ToTreesCalculator({
         personAge: age,
         yearlyEmissionsInTons: yearlyEmissionsInTons,
         treesPlantedEachYear: trees
      });

      return calculator.performEmissionAnalysis();
   }, [age, yearlyEmissionsInTons, trees]);

   return <>
      <CardHeader>
         <CardTitle className="block sm:inline-block text-xl md:text-2xl">
            {t('cardTitle')}
            <span className="sm:float-right">
               <Button className="mt-2 sm:mt-0 min-w-full sm:min-w-3/5" onClick={backToCalculator}>{tCommon('backToCalculator')}</Button>
            </span>
         </CardTitle>
         <CardDescription className="text-md">
            <div className="text-xl my-5 pl-6">
               {stats.yearsToBecomeCarbonNegative ? 
                  t('cardDescriptionOption1', { 
                     yearUserWillBeCarbonNegative: (new Date()).getFullYear() + stats.yearsToBecomeCarbonNegative,
                     yearsToBecomeCarbonNegative: stats.yearsToBecomeCarbonNegative,
                     numberOfTrees: data.trees
                  })
                  : t('cardDescriptionOption2', { numberOfTrees: data.trees })
               }
            </div>
            <Link href="/reduce-emissions" className="mt-5">
               <Button variant="outline" className="min-w-full">{t('reduceEmissionsCTA')}</Button>
            </Link>
         </CardDescription>
      </CardHeader>
      <CardContent>
         <ChartCard title={t('cumulativeEmissionsChartTitle')} chart={<EmissionsChart stats={stats} />} />
         <ChartCard title={t('absorbedEmissionsChartTitle')} chart={<EmissionsAbsorbtionChart stats={stats} />} />
      </CardContent>
   </>
});
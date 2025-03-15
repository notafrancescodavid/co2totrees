'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { StatisticsResult } from "@/lib/types";
import { useTranslations } from "next-intl";
import { EMISSIONS_ABSORBTION_CHART } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
    stats: StatisticsResult;
    className?: string;
}

export function EmissionsAbsorbtionChart({ stats, className = "" } : Props) {
  const t = useTranslations('EmissionsAbsorbtionChart');

  const chartConfig = {
    cumulativeYearlyEmissionsAbsorbedByTrees: {
      label: t('label1'),
      color: EMISSIONS_ABSORBTION_CHART.color1,
    },
    cumulativeAbsorbedByCarbonSinks: {
      label: t('label2'),
      color: EMISSIONS_ABSORBTION_CHART.color2,
    }
  } satisfies ChartConfig;

  // Convert arrays into chart data
  const chartData = stats.cumulativeYearlyEmissionsAbsorbedByTrees.map((value, index) => ({
      year: `Year ${index + 1}`,
      cumulativeYearlyEmissionsAbsorbedByTrees: Math.round(value),
      cumulativeAbsorbedByCarbonSinks: Math.round(stats.cumulativeYearlyEmissionsAbsorbedByCarbonSinks[index])
  }));

  return <ChartContainer config={chartConfig} className={cn(className,"h-[300px] w-full")}>
      <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="cumulativeYearlyEmissionsAbsorbedByTrees" fill={chartConfig.cumulativeYearlyEmissionsAbsorbedByTrees.color} radius={4} />
          <Bar dataKey="cumulativeAbsorbedByCarbonSinks" fill={chartConfig.cumulativeAbsorbedByCarbonSinks.color} radius={4} />
      </BarChart>
  </ChartContainer>
}
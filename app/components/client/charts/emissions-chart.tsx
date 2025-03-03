'use client';

import { StatisticsResult } from "@/lib/Co2ToTreesCalculator";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

// Define chart config with colors
const chartConfig = {
  cumulativeYearlyEmissions: {
    label: "Cumulative Co2 Emissions (in Kg)",
    color: "red",
  },
  cumulativeEmittedMinusAbsorbed: {
    label: "Cumulative Co2 Emissions Minus Cumulative Absorbed (in Kg)",
    color: "orange",
  }
} satisfies ChartConfig;

type Props = {
    stats: StatisticsResult;
}

export function EmissionsChart({ stats } : Props) {
    // Convert arrays into chart data
    const chartData = stats.cumulativeYearlyEmissions.map((value, index) => ({
        year: `Year ${index + 1}`,
        cumulativeYearlyEmissions: Math.round(value),
        cumulativeEmittedMinusAbsorbed: Math.round(stats.cumulativeEmittedMinusAbsorbed[index])
    }));

    return (<ChartContainer config={chartConfig} className="h-[300px] w-full">
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
            <Bar dataKey="cumulativeYearlyEmissions" fill={chartConfig.cumulativeYearlyEmissions.color} radius={4} />
            <Bar dataKey="cumulativeEmittedMinusAbsorbed" fill={chartConfig.cumulativeEmittedMinusAbsorbed.color} radius={4} />
        </BarChart>
    </ChartContainer>);
}
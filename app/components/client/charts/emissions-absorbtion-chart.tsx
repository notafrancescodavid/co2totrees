'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { StatisticsResult } from "@/lib/types";

// Define chart config with colors
const chartConfig = {
  cumulativeYearlyEmissionsAbsorbedByTrees: {
    label: "Cumulative Co2 Emissions Absorbed By The Trees You Planteed (in Tons)",
    color: "green",
  },
  cumulativeAbsorbedByCarbonSinks: {
    label: "Cumulative Co2 Emissions Absorbed By Carbon Sinks (in Tons)",
    color: "blue",
  }
} satisfies ChartConfig;

type Props = {
    stats: StatisticsResult;
}

export function EmissionsAbsorbtionChart({ stats } : Props) {
    // Convert arrays into chart data
    const chartData = stats.cumulativeYearlyEmissionsAbsorbedByTrees.map((value, index) => ({
        year: `Year ${index + 1}`,
        cumulativeYearlyEmissionsAbsorbedByTrees: Math.round(value),
        cumulativeAbsorbedByCarbonSinks: Math.round(stats.cumulativeYearlyEmissionsAbsorbedByCarbonSinks[index])
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
            <Bar dataKey="cumulativeYearlyEmissionsAbsorbedByTrees" fill={chartConfig.cumulativeYearlyEmissionsAbsorbedByTrees.color} radius={4} />
            <Bar dataKey="cumulativeAbsorbedByCarbonSinks" fill={chartConfig.cumulativeAbsorbedByCarbonSinks.color} radius={4} />
        </BarChart>
    </ChartContainer>);
}
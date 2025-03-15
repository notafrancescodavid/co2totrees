'use client'

import { CardHeader, CardContent, CardTitle, Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = { 
    title: string,
    chart: React.ReactNode 
    className?: string
};

export default function ChartCard({ title, chart, className = "" } : Props) {
   return <Card className={cn(className, "mt-5")}>
            <CardHeader>
                <CardTitle>
                {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {chart}
            </CardContent>
        </Card>
}
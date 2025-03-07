'use client'

import { CardHeader, CardContent, CardTitle, Card } from "@/components/ui/card";

type Props = { 
    title: string,
    chart: React.ReactNode 
};

export default function ChartCard({ title, chart } : Props) {
   return <Card className="mt-5">
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
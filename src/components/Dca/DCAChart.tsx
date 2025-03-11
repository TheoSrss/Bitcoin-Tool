import React from "react";
import {HistoryData} from "@/lib/calculateDCA";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import {TrendingUp} from "lucide-react";


export default function DCAChart({history}: {history:HistoryData[]}) {

    const chartConfig = {
        btc: {
            label: "BTC Price", color: "btc",
        },
    } satisfies { [key: string]: { label: string; color: string } };

    return (
        <div className="w-full h-64">
            <Card className="m-6">
                <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <CardTitle className="text-center sm:text-left">
                        DCA Chart
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="w-full ">
                        <LineChart data={history} margin={{left: 100, right: 100}}>
                            <CartesianGrid vertical={false}/>
                            <XAxis
                                dataKey="date"
                                tickMargin={15}
                                interval={200}
                            />
                            <YAxis
                                yAxisId="left"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tickFormatter={(value) => `$${value.toFixed(0)}`}
                                label={{ value: "Valeur en USD", angle: -90, position: "outsideRight" }}

                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tickFormatter={(value) => `${value.toFixed(0)}`}
                                label={{ value: "Valeur en Sats", angle: 90, position: "outsideLeft", margin: 50 }}
                            />

                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

                            <Line
                                dataKey="satsEarned"
                                type="natural"
                                stroke='blue'
                                strokeWidth={2}
                                dot={false}
                                yAxisId="right"
                            />
                            <Line
                                dataKey="dollarsValue"
                                type="natural"
                                stroke='red'
                                strokeWidth={2}
                                dot={false}
                                yAxisId="left"
                            />
                            <Line
                                dataKey="dollarsInvested"
                                type="natural"
                                stroke='yellow'
                                strokeWidth={2}
                                dot={false}
                                yAxisId="left"
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Trending up by 5.2% this month{" "}
                        <TrendingUp className="h-4 w-4"/>
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Showing price for the last 30 days
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
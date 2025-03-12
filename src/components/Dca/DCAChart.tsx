"use client";

import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {CartesianGrid, Legend, LegendProps, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {HistoryData} from "@/lib/calculateDCA";


const mobileConfig = {
    tickInterval: 300, angle: 55, margin: 0, dx: 0, tickMargin: 30
}

const desktopConfig = {
    tickInterval: 80, angle: 0, margin: 50, dx: 20, tickMargin: 15
}

export default function DCAChart({history}: { history: HistoryData[] }) {

    const [responsiveData, setResponsiveData] = useState(desktopConfig);

    useEffect(() => {
        const updateResponsiveConfig = () => {
            setResponsiveData(window.innerWidth < 768 ? mobileConfig : desktopConfig);
        };

        updateResponsiveConfig();
        window.addEventListener("resize", updateResponsiveConfig);
        return () => window.removeEventListener("resize", updateResponsiveConfig);
    }, []);

    const chartConfig = {
        btc: {
            label: "BTC Price", color: "btc",
        },
    } satisfies { [key: string]: { label: string; color: string } };

    return (<div className="w-full">
        <Card className=" md:m-6 ">
            <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <CardTitle className="text-center sm:text-left">Result</CardTitle>
            </CardHeader>
            <CardContent style={{ height: "60vh" }} >
                <ChartContainer config={chartConfig} className="w-full h-full" >
                    <ResponsiveContainer width="100%">
                        <LineChart data={history}
                                   margin={{left: responsiveData.margin, right: responsiveData.margin, bottom: 50}}>
                            <Legend content={<CustomLegend />} verticalAlign='top' />
                            <CartesianGrid strokeDasharray="5 5"/>
                            <XAxis
                                dataKey="date"
                                tickMargin={responsiveData.tickMargin}
                                interval={responsiveData.tickInterval}
                                angle={-responsiveData.angle}
                            />
                            <YAxis
                                yAxisId="left"
                                tickLine={false}
                                axisLine={true}
                                tickFormatter={(value) => `${value.toFixed(0)}`}
                                label={{
                                    value: "USD", angle: -90, position: "insideLeft", dx: -responsiveData.dx,
                                }}
                                angle={-responsiveData.angle}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickLine={false}
                                axisLine={true}
                                tickFormatter={(value) => `${value.toFixed(0).toLocaleString()}`}
                                label={{
                                    value: "Sats", angle: 90, position: "insideRight", dx: responsiveData.dx,
                                }}
                                angle={responsiveData.angle}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel/>}/>
                            <Line
                                dataKey="satsEarned"
                                type="monotone"
                                stroke="orange"
                                strokeWidth={2}
                                dot={false}
                                yAxisId="right"
                                animationEasing='linear'
                            />
                            <Line
                                dataKey="dollarsValue"
                                type="monotone"
                                stroke="blue"
                                strokeWidth={2}
                                dot={false}
                                yAxisId="left"
                                animationEasing='linear'
                            />
                            <Line
                                dataKey="dollarsInvested"
                                type="monotone"
                                stroke="grey"
                                strokeWidth={2}
                                dot={false}
                                yAxisId="left"
                                animationEasing='linear'
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>);
}

const legendLabels: Record<string, string> = {
    satsEarned: "Satoshis earned",
    dollarsValue: "USD amount",
    dollarsInvested: "USD invested",
};
const CustomLegend = (props: LegendProps) => {
    const { payload } = props;
    return (
        <div className="flex justify-center gap-6 md:gap-20 mb-8">
            {payload?.map((entry, index) => (
                <div key={`legend-${index}`} className="flex flex-col items-center text-sm font-medium">
                    <span className="text-gray-700">{legendLabels[entry.value] || entry.value}</span>
                    <div className="w-16 h-[4px] mt-1 rounded" style={{ backgroundColor: entry.color }} />
                </div>
            ))}
        </div>
    );
};
"use client";

import React, {useEffect, useMemo, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import {ChartContainer, ChartTooltip,} from "@/components/ui/chart";
import {TrendingUp} from "lucide-react";
import btc_history from "../../../public/data/btc_historical.json";
import ChartToolTipBtc from "@/components/Dashboard/ChartToolTipBtc";

export interface BtcHistoryData {
    time: number;
    USD: number;
    EUR: number;
    exchangeRates: {
        [key: string]: number;
    }
}

const BtcChart = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const transformedData = useMemo(() => {
        return (btc_history as BtcHistoryData[])
            .slice()
            .map((data) => ({
                ...data,
                readableDate: new Date(data.time * 1000).toLocaleDateString(),
                currencyPrice: Number((1000000000 / data.USD).toFixed(2)),
            }));
    }, []);
    const [chartData] = useState(transformedData);

    useEffect(() => {
        if (transformedData.length > 0) {
            setLoading(false);
        }
    }, [transformedData]);

    const chartConfig = {
        btc: {
            label: "BTC Price", color: "btc",
        },
    } satisfies { [key: string]: { label: string; color: string } };

    return (<>
        <Card className="m-6">
            <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <CardTitle className="text-center sm:text-left">
                    Bitcoin Price Chart
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (<Skeleton className="h-64 w-full"/>) : (
                    <ChartContainer config={chartConfig} className="w-full h-64">
                        <LineChart data={chartData} margin={{left: 12, right: 12}}>
                            <CartesianGrid vertical={false}/>
                            <XAxis
                                dataKey="time"
                                tickMargin={15}
                                interval={365}
                                tickFormatter={(value) => {
                                    const date = (new Date(value * 1000)).toLocaleDateString();
                                    const parts = date.split("/");
                                    return parts[2] || '';
                                }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tickFormatter={(value) => value.toFixed(0)}
                            />
                            <ChartTooltip
                                cursor={true}
                                content={<ChartToolTipBtc/>}
                            />
                            <Line
                                dataKey="USD"
                                type="natural"
                                stroke='blue'
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>)}
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
    </>);
};

export default BtcChart;
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {SpanHoverCard} from "@/components/ui/hover-card";

interface DCASummaryProps {
    totalInvested: number;
    satsEarned: number;
    profitPercent: number;
    profitValue: number;
}

export default function DCASummary({
                                       totalInvested, satsEarned, profitPercent, profitValue
                                   }: DCASummaryProps) {
    const classProfit ="font-semibold"+(profitValue > 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400");

    return (
        <Card className=" max-w-4xl mx-auto p-6 min-w-1/3  w-full sm:w-auto">
        <CardHeader>
            <CardTitle className="text-lg font-semibold">
                <SpanHoverCard label='DCA Summary'>
                    This summary gives an overview of your DCA investment performance.
                </SpanHoverCard>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
                <SpanHoverCard label='Invested'>
                    This is the total amount of money you have invested in the DCA strategy.
                </SpanHoverCard>
                <span className="font-semibold">{totalInvested} €</span>
            </div>
            <div className="flex justify-between">
                <SpanHoverCard label='Sats Earned'>
                    This is the total amount of sats you have earned through the DCA strategy.<br/>
                    1 BTC = 100 000 000 sats
                </SpanHoverCard>
                <span className="font-semibold">{satsEarned.toFixed()} sats</span>
            </div>
            <div className="flex justify-between">
                <SpanHoverCard label='Profit'>
                    This is the percentage of profit you have made through the DCA strategy.
                </SpanHoverCard>
                <span className={classProfit}>{profitPercent.toFixed(2)} %</span>
            </div>

            <div className="flex justify-between">
                <SpanHoverCard label='Profit amount'>
                    This is the total amount of profit you have made through the DCA strategy.
                </SpanHoverCard>
                <span className={classProfit}>{profitValue.toFixed(2)} $</span>
            </div>
        </CardContent>
    </Card>);
}
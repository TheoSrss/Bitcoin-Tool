import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface DCASummaryProps {
    totalInvested: number;
    satsEarned: number;
    profitPercent: number;
    profitValue: number;
}

export default function DCASummary({
                                       totalInvested, satsEarned, profitPercent, profitValue
                                   }: DCASummaryProps) {
    return (

        <Card className=" max-w-4xl mx-auto p-6 min-w-1/3">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">DCA summary</CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className="text-lg font-bold">DCA Summary</h2>
                <p>Invested: {totalInvested} €</p>
                <p>Sats Earned: {satsEarned.toFixed()}</p>
                <p>Profit: {profitPercent.toFixed(2)} %</p>
                <p>Price now: {profitValue.toFixed(2)} $</p>
            </CardContent>
        </Card>
    );
}
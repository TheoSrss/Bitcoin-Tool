import React from "react";
import {TooltipProps} from "recharts";
import {legendLabels} from "@/components/Dca/DCAChart";
import {formatCurrencyBtc} from "@/lib/utils";

function ChartToolTipDCA({active, payload}: TooltipProps<string, number>) {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;
    console.log(data)
    return (<div className="p-4 bg-white dark:bg-gray-800 text-sm  shadow-md rounded-lg">
            <p className="font-bold mb-2">Date : {data.date}</p>
            <p>{legendLabels.satsEarned} : {formatCurrencyBtc(data.satsEarned, true)} </p>
            <p>{legendLabels.dollarsValue} : {data.dollarsValue} USD </p>
            <p>{legendLabels.dollarsInvested} : {data.dollarsInvested} USD </p>
            <p>Purchase day: {data.isPurchaseDay ? 'Yes' : 'No'}  </p>
        </div>);
}

export default ChartToolTipDCA;
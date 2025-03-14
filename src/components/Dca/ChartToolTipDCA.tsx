import React from "react";
import {TooltipProps} from "recharts";
import {legendLabels} from "@/components/Dca/DCAChart";

function ChartToolTipDCA({active, payload}: TooltipProps<string, number>) {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;
    return (<div className="p-4 bg-white dark:bg-gray-800 text-sm  shadow-md rounded-lg">
            <p className="font-bold mb-2">Date : {data.date}</p>
            <p className='text-orange-400 font-bold'>{legendLabels.satsEarned} : {data.satsEarned.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Sats</p>
            <p  className='text-blue-500 font-bold'>{legendLabels.dollarsValue} : {data.dollarsValue.toFixed(2)} USD </p>
            <p  className='text-gray-500 font-bold'>{legendLabels.dollarsInvested} : {data.dollarsInvested} USD </p>
            <p className='pt-2'>Purchase day: {data.isPurchaseDay ? 'Yes' : 'No'}  </p>
        </div>);
}

export default ChartToolTipDCA;
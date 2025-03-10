import React from "react";
import { TooltipProps } from "recharts";

function CustomTooltip({ active, payload }: TooltipProps<string, number>) {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;
    return (
        <div className="p-4 bg-white dark:bg-gray-800 text-sm  shadow-md rounded-lg">
            <p className="font-semibold mb-1">Date : {data.readableDate}</p>
            <p>Prix : {data.USD} USD </p>
        </div>
    );
}

export default CustomTooltip;
'use client';

import React, {useEffect, useState} from "react";
import DCAForm, {DCASettings} from "@/components/Dca/DCAForm";
import {calculateDCA, DCAResults} from "@/lib/calculateDCA";
import DCASummary from "@/components/Dca/DCASummary";
import {Skeleton} from "@/components/ui/skeleton";
import DCAChart from "@/components/Dca/DCAChart";


export default function DCASimulator() {
    const [settings, setSettings] = useState<DCASettings>({
        investAmount: 10, frequency: "week", duration: 3,
    });

    const [result, setResult] = useState<DCAResults>();

    useEffect(() => {
        setResult(calculateDCA(settings))
    }, [settings])

    return (<div className='p-2 md:p-6'>
            <div className='flex flex-row flex-wrap align-items-center mb-10 gap-7 '>
                <DCAForm settings={settings} setSettings={setSettings}/>
                {result ? (<DCASummary
                    totalInvested={result.totalInvested}
                    satsEarned={result.totalSatsEarned}
                    profitPercent={result.profitData.percentProfit}
                    profitValue={result.profitData.dollarValue - result.totalInvested}
                />) : <Skeleton className="max-w-4xl mx-auto p-6 min-w-1/3"/>}

            </div>
            {result ? (<DCAChart history={result.history}/>) : <Skeleton className=" h-96 m-28"/>}
        </div>
    );
}
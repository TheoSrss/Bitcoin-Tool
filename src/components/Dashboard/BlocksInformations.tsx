'use client';

import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const BlocksInformations = () => {
    const [transactionsPlanned, setTransactionsPlanned] = useState<number>(0);
    const [blocksPlanned, setBlocksPlanned] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (blocksPlanned.length > 0) {
            const total = blocksPlanned.reduce((sum, block) => sum + block['nTx'], 0);
            setTransactionsPlanned(total);
            setLoading(false);
        }
    }, [blocksPlanned]);
    const fetchData = async () => {
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_MEMPOOL_SPACE_API;
            const res = await fetch(`${apiUrl}fees/mempool-blocks`);
            const data = await res.json();
            if (data) {
                setBlocksPlanned(data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (<Card className="w-full max-w-md mx-auto">
        <CardHeader className="flex flex-col  justify-between gap-2">
            <CardTitle>Transactions informations</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:p-4">
            {loading ? (<Skeleton className="h-4 w-[150px]"/>) : (<span>
                    Transactions planned: {transactionsPlanned}
                    </span>)}
        </CardContent>
    </Card>)
}

export default BlocksInformations;
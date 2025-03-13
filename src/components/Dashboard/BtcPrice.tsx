'use client';

import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Skeleton} from "@/components/ui/skeleton";

const BtcPrice = () => {
    const [currency, setCurrency] = useState<string>("USD");
    const [price, setPrice] = useState<number>(0);
    const [priceInSat, setPriceInSat] = useState<number>(0);

    useEffect(() => {
        fetchPrice();
    }, [currency]);

    const fetchPrice = async () => {
        setPrice(0);
        setPriceInSat(0);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_MEMPOOL_SPACE_API;
            const res = await fetch(`${apiUrl}prices`);
            const data = await res.json();
            if (data && data[currency]) {
                setPrice(data[currency]);
                setPriceInSat(Number((100000000 / data[currency]).toFixed()));
            } else {
                setPrice(0);
                setPriceInSat(0);
            }
        } catch  {
            setPrice(0);
            setPriceInSat(0);
        }
    };

    return (<Card className="w-full max-w-md mx-auto">
        <CardHeader className="flex flex-col  justify-between gap-2">
            <CardTitle>Bitcoin Price</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:p-4">
            <div className="text-2xl font-bold flex flex-col gap-2">
          <span className="whitespace-nowrap">
              {price !== 0 ? `1 BTC = ${price} ${currency}` : <Skeleton className="h-4 w-[150px]"/>}
          </span>
                <span className="whitespace-nowrap">
                    {priceInSat !== 0 ? `1 ${currency} = ${priceInSat} Satoshi` : <Skeleton className="h-8 w-full"/>}
          </span>
            </div>
            {price !== 0 ? (<Select onValueChange={(e) => setCurrency(e)} value={currency}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder='currency'/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="CHF">CHF</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                    </SelectContent>
                </Select>) :<Skeleton className="h-8 w-20"/>
            }

        </CardContent>
    </Card>);
};
export default BtcPrice;
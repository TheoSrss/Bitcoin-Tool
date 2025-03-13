'use client';

import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Skeleton} from "@/components/ui/skeleton";

const BtcPriceOriginal = () => {
    const [data, setData] = useState([]);
    const [commodityKey, setCommodityKey] = useState<string>("WEGGS");
    const [commodity, setCommodity] = useState<object>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(`https://api.pricedinbitcoin21.com/api/bitcoin-stats-v2/summary?type=commodity&subType=agriculture`);
            const json = await res.json();
            if (json) {
                setData(json);
                updateCommodity()
                console.log(json)
                // let commodityFind = json.find((item: { key: string }) => item.key === commodityKey);
                // console.log(commodityFind)
                // setCommodity(commodityFind);
                setLoading(false);
            }
        } catch (error) {
            setLoading(true);
        }
    };

    const updateCommodity = (key=commodityKey) => {
        let commodityFind = data.find((item: { key: string }) => item.key === key);
        setCommodity(commodityFind);
        setCommodityKey(commodityFind.key);
    }


    console.log(commodity)
    return (<Card className="w-full max-w-md mx-auto">
        {/*{(commodity.today*100000000).toFixed(0)}*/}
        <CardHeader className="flex flex-col  justify-between gap-2">
            <CardTitle>Commodities Price in Sats</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:p-4">
            <div className="text-2xl font-bold flex flex-col gap-2">

                <span className="whitespace-nowrap">
                    {!loading ? `1 ${commodity.name} = ${(commodity.today * 100000000).toFixed()} Satoshi` : <Skeleton className="h-8 w-full"/>}
                    {/*PRICE*/}
          </span>
            </div>
            {!loading ? (<Select onValueChange={(e) => updateCommodity(e) } value={commodityKey}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder='commodityKey'/>
                    </SelectTrigger>
                    <SelectContent>
                        {data.map((item: { key: string }) => (
                            <SelectItem key={item.key} value={item.key}>{item.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>) :<Skeleton className="h-8 w-20"/>
            }

        </CardContent>
    </Card>);
};
export default BtcPriceOriginal;
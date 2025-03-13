"use client";

import React, {useCallback, useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Skeleton} from "@/components/ui/skeleton";

// Définition des types
type Commodity = {
    key: string; name: string; today: number;
} & {
    [key: string]: string | number;
};

const BtcPriceOriginal = () => {
    const [data, setData] = useState<Commodity[]>([]);
    const [commodityKey, setCommodityKey] = useState<string>("WEGGS");
    const [commodity, setCommodity] = useState<Commodity | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fonction pour récupérer les données
    const fetchData = useCallback(async () => {
        try {
            const res = await fetch("https://api.pricedinbitcoin21.com/api/bitcoin-stats-v2/summary?type=commodity&subType=agriculture");
            const json: Commodity[] = await res.json();
            if (json.length > 0) {
                setData(json);
                updateCommodity(json, commodityKey);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(true);
        }
    }, [commodityKey]);

    // Fonction pour mettre à jour la sélection du commodity
    const updateCommodity = (commodities = data, key = commodityKey) => {
        const selectedCommodity = commodities.find((item) => item.key === key);
        if (selectedCommodity) {
            setCommodity(selectedCommodity);
            setCommodityKey(selectedCommodity.key);
        }
    };

    // Récupération des données au montage
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (<Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-col justify-between gap-2">
                <CardTitle>Commodities Price in Sats</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:p-4">
                <div className="text-2xl font-bold flex flex-col gap-2">
                    <span className="whitespace-nowrap">
                        {!loading && commodity ? (`1 ${commodity.name} = ${(commodity.today * 100000000).toFixed(0)} Satoshi`) : (
                            <Skeleton className="h-8 w-full"/>)}
                    </span>
                </div>
                {!loading ? (<Select onValueChange={(e) => updateCommodity(data, e)} value={commodityKey}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Commodity"/>
                        </SelectTrigger>
                        <SelectContent>
                            {data.map((item) => (<SelectItem key={item.key} value={item.key}>
                                    {item.name}
                                </SelectItem>))}
                        </SelectContent>
                    </Select>) : (<Skeleton className="h-8 w-20"/>)}
            </CardContent>
        </Card>);
};

export default BtcPriceOriginal;
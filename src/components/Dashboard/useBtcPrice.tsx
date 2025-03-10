import { useState, useEffect } from "react";

export default function useBtcPrice(currency: string ='USD') {
    const [price, setPrice] = useState<number | null>(null);
    console.log(process.env.MEMPOOL_SPACE_API)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        fetchPrice();
    }, [currency]);
    console.log(apiUrl);
    const fetchPrice = async () => {
        try {
            const res = await fetch(
                `${apiUrl}`
            );
            const data = await res.json();
            if (data.bitcoin) {
                setPrice(data.bitcoin[currency.toLowerCase()]);
            }
        } catch (error) {
            console.error("Error fetching BTC price:", error);
        }
    };

    return price;
}
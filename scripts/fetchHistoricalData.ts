// const fetch = require("node-fetch"); // ou utilisez une version native avec Node 18+
import fs from "fs";

// Définir la date de départ et la date de fin en timestamp Unix (secondes)
const startTimestamp = 1231006505; // par exemple, 3 janvier 2009
const endTimestamp = Math.floor(Date.now() / 1000); // aujourd'hui en UTC

const oneDay = 86400; // secondes dans une journée

async function fetchDailyPrice(timestamp: number) {
    const url = `https://mempool.space/api/v1/historical-price?currency=EUR&timestamp=${timestamp}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.prices && data.prices.length > 0) {
            const dayData = data.prices[0];
            return {
                time: dayData.time,
                EUR: dayData.EUR,
                USD: dayData.USD,
                exchangeRates : data.exchangeRates
            };
        } else {
            return { time: timestamp, error: "No data" };
        }
    } catch (error) {
        console.error("Error fetching data for timestamp", timestamp, error);
    }
}

async function buildHistoricalPrices() {
    const allData = [];
    for (let ts = startTimestamp; ts <= endTimestamp; ts += oneDay) {
        console.log("Fetching data for timestamp", ts);
        const dayPrice = await fetchDailyPrice(ts);
        allData.push(dayPrice);
        await new Promise((resolve) => setTimeout(resolve, 500)); // 500 ms de délai par exemple
    }
    fs.writeFileSync("./public/data/btc_historical.json", JSON.stringify(allData, null, 2));
    console.log("Historical data saved to btc_historical.json");
}

buildHistoricalPrices();
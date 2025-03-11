import {DCASettings} from "@/components/Dca/DCAForm";
import btc_history from "../../public/data/btc_historical.json";
import {BtcHistoryData} from "@/components/Dashboard/BtcChart";

export interface HistoryData {
    date: string;
    satsEarned: number;
    dollarsInvested: number;
    dollarsValue: number;
    isPurchaseDay: boolean;
}

export interface DCAResults {
    totalInvested: number;
    totalSatsEarned: number;
    profitData: {
        dollarValue: number;
        currencyProfit: number;
        percentProfit: number;
    };
    history: HistoryData[];
}

export function calculateDCA(settings: DCASettings): DCAResults {

    const daysPerPeriod = 365 * settings.duration;
    const investmentInterval = settings.frequency === "week" ? 7 : settings.frequency === "month" ? 30 : 365;

    const selectedHistoryData: BtcHistoryData[] = btc_history
        .filter((entry) => entry.USD !== undefined)
        .slice(-daysPerPeriod);

    const initialAccumulator: DCAResults = {
        history: [], totalInvested: 0, totalSatsEarned: 0, profitData: {
            currencyProfit: 0, percentProfit: 0, dollarValue: 0
        }
    };

    const result = selectedHistoryData.reduce<DCAResults>((acc, data: BtcHistoryData, index: number) => {

        let dailySats = 0;
        let totalDollarsInvested = acc.totalInvested;
        const purchaseDay = index % investmentInterval === 0;
        if (purchaseDay) {
            dailySats = (settings.investAmount / data.USD) * 100000000;
            totalDollarsInvested += settings.investAmount;
        }
        const totalSatsEarned = acc.totalSatsEarned + dailySats;

        const entry: HistoryData = {
            date: new Date(data.time * 1000).toLocaleDateString(),
            satsEarned: totalSatsEarned,
            dollarsInvested: totalDollarsInvested,
            dollarsValue: totalSatsEarned / 100000000 * data.USD,
            isPurchaseDay: purchaseDay
        };

        acc.history.push(entry);
        acc.totalSatsEarned += dailySats;
        acc.totalInvested += purchaseDay ? settings.investAmount : 0;

        return acc;
    }, initialAccumulator);

    result.profitData = {
        currencyProfit: result.history[result.history.length - 1].dollarsValue - result.totalInvested,
        percentProfit: ((result.history[result.history.length - 1].dollarsValue - result.totalInvested) / result.totalInvested) * 100,
        dollarValue: result.history[result.history.length - 1].dollarsValue,
    };

    return result;
}
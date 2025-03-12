import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function formatCurrencyBtc(value: number, isBtc = false) {
    if (value / 100000000 > 1 && isBtc) return `${(value / 100000000).toFixed(2)}BTC`
    if (value / 1000000 > 1) return `${(value / 1000000)}M`
    if (value / 1000 > 1) return `${(value / 1000)}K`
    return `${value.toFixed(0)}`
}
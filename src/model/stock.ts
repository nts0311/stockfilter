import { Candle } from "./candle"
import '../extension/CandleArrExt'

export class Stock {
    marketSymbol: string
    prices: Candle[]

    constructor(marketSymbol: string, prices: Candle[]) {
        this.marketSymbol = marketSymbol
        this.prices = prices
    }

    //T
    public get todayVolume() : number {
        if (this.prices.isEmpty()) {
            return 0
        }

        return this.prices[0].volume
    }

    //T - 1
    public get yesterdayVolume() : number {
        if (this.prices.length < 2) {
            return 0
        }

        return this.prices[1].volume
    }

    public getAverageVolumeInDay(numberOfDay: number): number {
        let sum = this.prices.map(p => p.volume)
            .slice(0, numberOfDay)
            .reduce((acc, val) => acc + val, 0.0)

        return sum / numberOfDay
    }
    
}
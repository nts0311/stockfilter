import { Stock } from "../model/stock";
import { Filter } from "./filter";
import '../extension/CandleArrExt'
import * as taUtils from "../ta/TAUtils"

/**
 * MACD(t) - MACD(t-1) >= 0
 * AND
 * EMA12(t) - EMA12(t-1) >= 0
 */

export class MACDAndEMA12Filter implements Filter {

    async filter(stock: Stock): Promise<boolean> {
        return await this.macdConditionPassed(stock) && await this.ema12ConditionPassed(stock)
    }

    private async macdConditionPassed(stock: Stock): Promise<boolean> {
        let macdSeries = (await taUtils.calculateMACD(stock.closePrice)).outMACD

        return macdSeries.last() - macdSeries[macdSeries.length - 2] >= 0
    }

    private async ema12ConditionPassed(stock: Stock): Promise<boolean> {
        let macdSeries: number[] = await taUtils.calculateEMA(12, stock.closePrice)

        return macdSeries.last() - macdSeries[macdSeries.length - 2] >= 0
    }

}
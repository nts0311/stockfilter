import { Stock } from "../../model/stock";
import { Filter, CompareType, CompareTypeAction } from "../filter";
import '../../extension/CandleArrExt'

import * as taUtils from "../../ta/TAUtils"

/**
 * EMA12(t) - EMA12(t-1) compare to value
 */

export class TwoLastSessionEma12ComparatorFilter implements Filter {

    compareType: CompareType

    constructor(compareType: CompareType) {
        this.compareType = compareType
    }

    async filter(stock: Stock): Promise<boolean> {
        let ema12Series: number[] = await taUtils.calculateEMA(12, stock.closePrice)

        let ema12T = ema12Series.last()
        let ema12TMinus1 =  ema12Series[ema12Series.length - 2]

        let compareAction = CompareTypeAction[this.compareType]

        return compareAction(ema12T, ema12TMinus1)
    }

}
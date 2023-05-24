import { Stock } from "../../model/stock";
import { Filter, CompareType, CompareTypeAction } from "../filter";
import '../../extension/CandleArrExt'

import * as taUtils from "../../ta/TAUtils"

export class MacdComparatorFilter implements Filter {

    compareType: CompareType
    value: number

    constructor(compareType: CompareType, value: number) {
        this.compareType = compareType
        this.value = value
    }

    async filter(stock: Stock): Promise<boolean> {
        let macdT = (await taUtils.calculateMACD(stock.closePrice)).outMACD.last()

        let compareAction = CompareTypeAction[this.compareType]

        return compareAction(macdT, this.value)
    }

}

export class MacdCrossOverFilter implements Filter {

    async filter(stock: Stock): Promise<boolean> {
        let macd = (await taUtils.calculateMACD(stock.closePrice))

        //let crossOver = macd.outMACDHist.last() >= -1.0 && macd.outMACDHist.last() <= 1.0

        let macdVal = macd.outMACD.last()
        let macdSignalVal = macd.outMACDSignal.last()

        const minMacdVal = Math.min(Math.abs(macdVal), Math.abs(macdSignalVal))
        const maxMacdVal = Math.max(Math.abs(macdVal), Math.abs(macdSignalVal))

        let crossOver = (minMacdVal / maxMacdVal) * 100 >= 95.0


        let macdIncreasing = (macd.outMACD.last() - macd.outMACD[macd.outMACD.length - 2]) > 0

        return crossOver && macdIncreasing
    }

}
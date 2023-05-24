import { Stock } from "../../model/stock";
import { Filter, CompareType, CompareTypeAction } from "../filter";
import '../../extension/CandleArrExt'

import * as taUtils from "../../ta/TAUtils"

export class RsiComparatorFilter implements Filter {

    compareType: CompareType
    value: number

    constructor(compareType: CompareType, value: number) {
        this.compareType = compareType
        this.value = value
    }

    async filter(stock: Stock): Promise<boolean> {
        let rsiT = (await taUtils.calculateRSI(stock.closePrice)).last()

        let compareAction = CompareTypeAction[this.compareType]

        return compareAction(rsiT, this.value)
    }

}
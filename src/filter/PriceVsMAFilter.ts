import { Stock } from "../model/stock";
import { Filter } from "./filter";
import '../extension/CandleArrExt'
//const taUtils = require('../ta/TAUtils')

import * as taUtils from "../ta/TAUtils"

/**
 * P(t-1) < MA(20)
 * AND
 * P(t) >= MA(20)
 */

export class PriceVsMAFilter implements Filter {

    async filter(stock: Stock): Promise<boolean> {
        let ma20 = await taUtils.calculateMA(20, stock.closePrice)

        let lastMA20 = ma20.last()

        return stock.closePriceT >= lastMA20
    }

}
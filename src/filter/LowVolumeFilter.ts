
import { Stock } from "../model/stock";
import { Filter } from "./filter";
import '../extension/CandleArrExt'
//const taUtils = require('../ta/TAUtils')

import * as taUtils from "../ta/TAUtils"

/**
 * last 3 day volume must >= 10000
 */

const MIN_VOLUME = 10000

export class LowVolumeFilter implements Filter {

    async filter(stock: Stock): Promise<boolean> {
        for (let candle of stock.prices.slice(-3)) {
            if (candle.volume < MIN_VOLUME) {
                return false
            }
        }

        return true
    }

}


import { Stock } from "../../model/stock";
import { Filter, CompareType, CompareTypeAction } from "../filter";
import '../../extension/CandleArrExt'

import * as taUtils from "../../ta/TAUtils"

/**
 * -1 <= MA5 - MA20 <= 1
 */

export class Ma5AndMa20ComparatorFilter implements Filter {

    async filter(stock: Stock): Promise<boolean> {
        let ma20Series: number[] = await taUtils.calculateMA(20, stock.closePrice)
        let ma5Series: number[] = await taUtils.calculateMA(5, stock.closePrice)

        let ma20T = ma20Series.last()
        let ma5T = ma5Series.last()

        return (ma5T - ma20T >= -1) && (ma5T - ma20T <= 1)
    }

}
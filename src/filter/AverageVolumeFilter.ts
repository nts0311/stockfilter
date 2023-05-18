import '../extension/CandleArrExt'
import { Stock } from "../model/stock";
import { Filter } from "./filter";

/**
 * V(t-1) < V(t)
 * AND
 * V(t) > Vtb(20) OR V(t) >= 1.5 * V(t-1)
 */

export class AverageVolumeFilter implements Filter {

    async filter(stock: Stock): Promise<boolean> {
        if (stock.prices.isEmpty()) {
            return false
        }

        return this.satifyCondition1(stock) && this.satifyCondition2(stock)
    }

    // V(t-1) < V(t)
    private satifyCondition1(stock: Stock): boolean {
        return stock.yesterdayVolume < stock.todayVolume
    }

    // V(t) > Vtb(20) OR V(t) >= 1.5 * V(t-1)
    private satifyCondition2(stock: Stock): boolean {
        let subCondition1 = stock.todayVolume > stock.getAverageVolumeInDay(20)
        let subCondition2 = stock.todayVolume >= 1.5 * stock.yesterdayVolume
        return subCondition1 || subCondition2
    }
}
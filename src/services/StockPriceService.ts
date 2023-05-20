import { Filter } from "../filter/filter";
import { Candle } from "../model/candle";
import { Stock } from "../model/stock";
const TradingView = require('./TradingViewService')

// export class StockFilterServices {
//     symbols: string[]
//     filters: Filter[]
//     private stocks: Stock[] = []

//     constructor(symbols: string[], filters: Filter[]) {
//         this.symbols = symbols
//         this.filters = filters
//     }

//     async performFiltering(): Promise<Stock[]> {
//         await this.getStocks()

//         let filteredStock: Stock[] = []

//         this.stocks.forEach(async (stock) => {
//             let isStockSatifyAllFilters = await this.isStockSatisfyAllFilters(stock)
//             if (isStockSatifyAllFilters) {
//                 filteredStock.push(stock)
//             }
//         })

//         return filteredStock
//     }
     
//     private async isStockSatisfyAllFilters(stock: Stock): Promise<boolean> {
//         this.filters.forEach(async (filter) => {
//             let passed = await filter.filter(stock)
//             if (!passed) {
//                 return false
//             }
//         })

//         return true
//     }

//     private async getStocks() {
//         let result: Stock[] = []
//         this.symbols.forEach(async (symbol) => {
//             let price = await TradingView.getOHLCV(symbol)
//             let stock = new Stock(symbol, price)
//             result.push(stock)
//         })

//         this.stocks = result
//     }
// }    

export class SerialStockFilterServices {
    symbols: string[]
    filters: Filter[]
    private stocks: Stock[] = []

    constructor(symbols: string[], filters: Filter[]) {
        this.symbols = symbols
        this.filters = filters
    }

    async performFiltering(): Promise<Stock[]> {

        let filteredStock: Stock[] = []

        for (let symbol of this.symbols) {
            let stock = await this.getStock(symbol)
            let isStockSatifyAllFilters = await this.isStockSatisfyAllFilters(stock)
            if (isStockSatifyAllFilters) {
                filteredStock.push(stock)
            }
        }

        return filteredStock
    }
     
    private async isStockSatisfyAllFilters(stock: Stock): Promise<boolean> {
        for (let filter of this.filters) {
            let passed = await filter.filter(stock)
            if (!passed) {
                return false
            }
        }

        return true
    }

    private async getStock(symbol: string): Promise<Stock> {
        let price: Candle[] = await TradingView.getOHLCV(symbol)
        return new Stock(symbol, price.reverse())
    }
}    

import { Filter } from "../filter/filter";
import { Candle } from "../model/candle";
import { Stock } from "../model/stock";
const TradingView = require('./TradingViewService')

export class StockMutipeFilterSetService {
    symbols: string[]

    filterSetList: Array<Array<Filter>>

    result: Array<Array<Stock>> = []

    constructor(symbols: string[], filterSetList: Array<Array<Filter>>) {
        this.symbols = symbols
        this.filterSetList = filterSetList

        this.result = [...Array(filterSetList.length)].map(x => [])
    }
 
    async performFiltering(): Promise<any> {
        
        for (let symbol of this.symbols) {
            let stock = await this.getStock(symbol)
            await this.filterStock(stock)
        }

        return this.processResult()
    }

    private async filterStock(stock: Stock) {
        for (let i = 0; i < this.filterSetList.length; i++) {
            const filterSet = this.filterSetList[i];
            
            let stockPassedFilterSet = await this.applyFilterSet(stock, filterSet)

            if (stockPassedFilterSet) {
                this.result[i].push(stock)
            }
        }
    }
     
    private async applyFilterSet(stock: Stock, filters: Filter[]): Promise<boolean> {
        for (let filter of filters) {
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

    private processResult(): any {
        let result: any = {}

        let stockSymbolList = this.result.map(stocks => stocks.map(s => s.marketSymbol))

        let intersection = stockSymbolList.reduce((a, c) => a.filter(i => c.includes(i)))

        result.stockSymbolList = stockSymbolList
        result.intersection = intersection

        return result
    }
}    

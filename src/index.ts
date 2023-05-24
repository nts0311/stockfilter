import './extension/CandleArrExt'
import { SerialStockFilterServices } from "./services/StockPriceService";
import { AverageVolumeFilter } from "./filter/AverageVolumeFilter";
import { PriceVsMAFilter } from './filter/PriceVsMAFilter';
import { MACDAndEMA12Filter } from './filter/MACDAndEMA12Filter';
import { LowVolumeFilter } from './filter/LowVolumeFilter';
import { MacdComparatorFilter, MacdCrossOverFilter } from "./filter/v2/MacdComparatorFilter";
import { StockMutipeFilterSetService } from './services/StockMutipeFilterSetService';
import { CompareType } from './filter/filter';
import { TwoLastSessionEma12ComparatorFilter } from './filter/v2/TwoLastSessionEma12ComparatorFilter';
import { RsiComparatorFilter } from './filter/v2/RsiComparatorFilter';
import { Ma5AndMa20ComparatorFilter } from './filter/v2/Ma5AndMa20ComparatorFilter';

const TradingViewService = require('./services/TradingViewService')
const fs = require("fs")
const talib = require("talib")
//import TradingViewService from "./services/TradingViewService"

// const TradingView = require('@mathieuc/tradingview')

// const client = new TradingView.Client();

// const chart = new client.Session.Chart();

//https://scanner.tradingview.com/vietnam/scan

async function getPrice() {
   

    let listSymbol: string[] = (await TradingViewService.getListMarketSymbol())
    

    const numberOfChunk = listSymbol.length
    let symbolChunks = listSymbol.chunks(numberOfChunk)
    console.log(symbolChunks)

    var job: Promise<any>[] = []

    for (let symbolChunk of symbolChunks) {
        job.push(processChunk(symbolChunk))
    }
    
    await Promise.allSettled(job)
    
    console.log("done")
}

async function processChunk(listSymbol: string[]) {
    let worker = new StockMutipeFilterSetService(
        listSymbol, 
        [
            [
                new LowVolumeFilter(),
                //new TwoLastSessionEma12ComparatorFilter(CompareType.greaterThan),
                //new RsiComparatorFilter(CompareType.greaterThan, 60),
                new MacdCrossOverFilter()
            ],
            [
                new LowVolumeFilter(),
                new Ma5AndMa20ComparatorFilter()
            ]
        ]
    )

    let result: string[] = await worker.performFiltering()

    console.log(result.length)
    writeResult(result)
}

function writeResult(obj: any) {
    var stringify = JSON.stringify(obj);
    fs.writeFileSync('./data.json', stringify, 'utf-8');
}

getPrice()

// var function_desc = talib.explain("RSI");
// console.dir(function_desc);
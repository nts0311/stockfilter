import './extension/CandleArrExt'
import { SerialStockFilterServices } from "./services/StockPriceService";
import { AverageVolumeFilter } from "./filter/AverageVolumeFilter";
import { PriceVsMAFilter } from './filter/PriceVsMAFilter';
import { MACDAndEMA12Filter } from './filter/MACDAndEMA12Filter';
import { LowVolumeFilter } from './filter/LowVolumeFilter';
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
    // [
    //   'HOSE:VHM',
    //   'HOSE:FPT',
    //   'HOSE:NVL',
      
      
     
    //   'HOSE:FUESSVFL',
    //   'HOSE:ADS',
    //   'UPCOM:WSB'
    // ]

    const numberOfChunk = listSymbol.length
    let symbolChunks = listSymbol.chunks(numberOfChunk)
    console.log(symbolChunks)

    var job: Promise<any>[] = []

    for (let symbolChunk of symbolChunks) {
        job.push(processChunk(symbolChunk))
    }
    
    await Promise.allSettled(job)
    
    console.log("done")

    // let worker = new SerialStockFilterServices(listSymbol, [new AverageVolumeFilter()])

    // let result: string[] = (await worker.performFiltering()).map(s => s.marketSymbol)

    // console.log(result)
    // console.log(result.length)
}

async function processChunk(listSymbol: string[]) {
    let worker = new SerialStockFilterServices(
        listSymbol, 
        [
            new LowVolumeFilter(),
            new PriceVsMAFilter(),
            new AverageVolumeFilter(),
            new MACDAndEMA12Filter()
        ]
    )

    let result: string[] = (await worker.performFiltering()).map(s => s.marketSymbol)

    console.log(result.length)
    writeResult(result)
}

function writeResult(obj: any) {
    var stringify = JSON.stringify(obj);
    fs.writeFileSync('./data.json', stringify, 'utf-8');
}

getPrice()

//var function_desc = talib.explain("MA");
//console.dir(function_desc);
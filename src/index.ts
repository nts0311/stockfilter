import { log } from "console";
import { Candle } from "./model/candle";
import { SerialStockFilterServices, StockFilterServices } from "./services/StockPriceService";
import { AverageVolumeFilter } from "./filter/AverageVolumeFilter";
const TradingViewService = require('./services/TradingViewService')
//import TradingViewService from "./services/TradingViewService"

// const TradingView = require('@mathieuc/tradingview')

// const client = new TradingView.Client();

// const chart = new client.Session.Chart();

//https://scanner.tradingview.com/vietnam/scan

async function getPrice() {
    let listSymbol: string[] = (await TradingViewService.getListMarketSymbol())//.slice(0, 100)
    // [
    //   'HOSE:VHM',
    //   'HOSE:FPT',
    //   'HOSE:NVL',
      
      
     
    //   'HOSE:FUESSVFL',
    //   'HOSE:ADS',
    //   'UPCOM:WSB'
    // ]
    console.log(listSymbol)

    let worker = new SerialStockFilterServices(listSymbol, [new AverageVolumeFilter()])

    let result: string[] = (await worker.performFiltering()).map(s => s.marketSymbol)

    console.log(result)
    console.log(result.length)
}

getPrice()
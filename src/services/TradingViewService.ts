import { Candle } from "../model/candle";
const TradingView = require('@mathieuc/tradingview')
const HttpUtils = require('./HttpUtils')

exports.getListMarketSymbol = async (): Promise<String[]> => {
    let dataResponse = await HttpUtils.getRequest('https://scanner.tradingview.com/vietnam/scan')
    let dataArr: any[] = dataResponse['data']
    return dataArr.map(it => it['s'])
}

exports.getOHLCV = async (
    marketSymbol: string,
    barNumber: number = 100,
    timeframe: string = '1D'
): Promise<Candle[]> => {
    return new Promise<Candle[]>(function (resolve, reject) {
        const client = new TradingView.Client();
        const chart = new client.Session.Chart();

        chart.setMarket(marketSymbol, {
            timeframe: timeframe,
            range: barNumber,
        });

        chart.onUpdate(() => {
            resolve(chart.periods);
            client.end()
        });

        chart.onError(() => {
            reject(Error(`Get price symbol ${marketSymbol} failed`))
            client.end()
        })
    })
}
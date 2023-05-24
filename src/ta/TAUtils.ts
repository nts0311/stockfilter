import { MacdResult } from "../model/MacdResult";

var talib = require('talib');

export function calculateMA(timePeriod: number, closePrices: number[]): Promise<number[]> {
    return new Promise(function(resolve, reject){
        talib.execute({
            name: "MA",
            startIdx: 0,
            endIdx: closePrices.length - 1,
            inReal: closePrices,
            optInMAType: 0,
            optInTimePeriod: timePeriod
        }, function (err: string, result: any) {
            if(err) {
                console.log(err)
                reject(err);
            } else {
                resolve(result['result']['outReal'])
            }
    
        });
    });
}

export function calculateEMA(timePeriod: number, closePrices: number[]): Promise<any> {
    return new Promise(function(resolve, reject){
        talib.execute({
            name: "EMA",
            startIdx: 0,
            endIdx: closePrices.length - 1,
            inReal: closePrices,
            optInTimePeriod: timePeriod
        }, function (err: string, result: any) {
            if(err) {
                console.log(err)
                reject(err);
            } else {
                resolve(result['result']['outReal'])
            }
    
        });
    });
}


export function calculateMACD(closePrices: number[]): Promise<MacdResult> {
    return new Promise(function(resolve, reject){
        talib.execute({
            name: "MACD",
            startIdx: 0,
            endIdx: closePrices.length - 1,
            inReal: closePrices,
            optInFastPeriod: 12,
            optInSlowPeriod: 26,
            optInSignalPeriod: 9 
        }, function (err: string, result: any) {
            if(err) {
                console.log(err)
                reject(err);
            } else {
                resolve(result['result'])
            }
        });
    });
}

export function calculateRSI(closePrices: number[]): Promise<number[]> {
    return new Promise(function(resolve, reject){
        talib.execute({
            name: "RSI",
            startIdx: 0,
            endIdx: closePrices.length - 1,
            inReal: closePrices,
            optInTimePeriod: 14
        }, function (err: string, result: any) {
            if(err) {
                console.log(err)
                reject(err);
            } else {
                resolve(result['result']['outReal'])
            }
    
        });
    });
}
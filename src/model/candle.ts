export class Candle {
    time: number = 0
    open: number = 0.0
    close: number = 0.0
    max: number = 0.0
    min: number = 0.0
    volume: number = 0.0

    get high() : number {
        return this.max
    }

    get low() : number {
        return this.min
    }

}

module.exports = Candle
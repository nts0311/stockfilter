import { Candle } from "../model/candle";

export{}

declare global {
    interface Array<T extends Candle> {
        remove(elem: T): Array<T>;
        isEmpty(): boolean
    }
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function <T>(this: T[], elem: T): T[] {
        return this.filter(e => e !== elem);
    }
}

if (!Array.prototype.isEmpty) {
    Array.prototype.isEmpty = function <T>(this: T[]): boolean {
        return this.length == 0;
    }
}
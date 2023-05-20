import { Candle } from "../model/candle";

export{}

declare global {
    interface Array<T> {
        remove(elem: T): Array<T>;
        isEmpty(): boolean
        chunks(size: number): Array<Array<T>>
        last(): T
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

if (!Array.prototype.chunks) {
    Array.prototype.chunks = function <T>(this: T[], size: number): Array<Array<T>> {
        var chunks: Array<Array<T>> = []

        for (let i = 0; i < this.length; i += size) {
            chunks.push(this.slice(i, i + size))
        }

        return chunks
    }
}

if (!Array.prototype.last) {
    Array.prototype.last = function <T>(this: T[]): T {
        return this[this.length - 1]
    }
}
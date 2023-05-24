
import { type } from "os";
import { Stock } from "../model/stock";

export enum CompareType {
    lessThan,
    lessThanOrEqual,
    equal,
    greaterThan,
    greaterThanOrEqual
}

export type CompareFunction = (a: number, b: number) => boolean

export const CompareTypeAction: { [key in CompareType]: CompareFunction } = {
    [CompareType.lessThan]: (a, b) => a < b,
    [CompareType.lessThanOrEqual]: (a, b) => a <= b,
    [CompareType.equal]: (a, b) => a == b,
    [CompareType.greaterThan]: (a, b) => a > b,
    [CompareType.greaterThanOrEqual]: (a, b) => a >= b
}

export interface Filter {
    filter(stock: Stock): Promise<boolean>
}
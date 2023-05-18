
import { Stock } from "../model/stock";

export interface Filter {
    filter(stock: Stock): Promise<boolean>
}
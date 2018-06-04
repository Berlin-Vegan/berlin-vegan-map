import { JsonLocation } from "./json-location";

export interface JsonShoppingLocation extends JsonLocation {
    tags: ("foods" | "beverages" | "clothing" | "toiletries" | "supermarket" | "bakery")[]; // 1..6
}

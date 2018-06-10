import { JsonLocation } from "./json-location";

export interface JsonShoppingLocation extends JsonLocation {
    tags: ("foods" | "clothing" | "toiletries" | "supermarket")[]; // 1..4
}

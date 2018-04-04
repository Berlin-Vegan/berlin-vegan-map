import { JsonLocation } from "./json-location";

export interface JsonShoppingLocation extends JsonLocation {
    tags: ("Bio" | "Backwaren" | "Eis" | "Drogerie" | "Kleidung" | "Naturkostladen")[]; // 1..6
}

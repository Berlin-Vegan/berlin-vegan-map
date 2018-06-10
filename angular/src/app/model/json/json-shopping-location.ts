import { JsonLocation } from "./json-location";

export interface JsonShoppingLocation extends JsonLocation {

    /**
     * Tags.
     * 1 to 4 items.
     */
    tags: ("foods" | "clothing" | "toiletries" | "supermarket")[];
}

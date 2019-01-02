export type ShoppingTag =
    "foods"
    | "clothing"
    | "toiletries"
    | "supermarket"
    | "hairdressers"
    | "sports"
    | "tattoostudio"
    | "accommodation";
export function getShoppingTags(): ShoppingTag[] {
    return [
        "foods",
        "clothing",
        "toiletries",
        "supermarket",
        "hairdressers",
        "sports",
        "tattoostudio",
        "accommodation",
    ];
}

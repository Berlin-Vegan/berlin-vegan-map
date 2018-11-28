export type ShoppingTag =
    "foods"
    | "clothing"
    | "toiletries"
    | "supermarket"
    | "hairdressers"
    | "fitness"
    | "tattoostudio"
    | "accommodation";
export function getShoppingTags(): ShoppingTag[] {
    return [
        "foods",
        "clothing",
        "toiletries",
        "supermarket",
        "hairdressers",
        "fitness",
        "tattoostudio",
        "accommodation",
    ];
}

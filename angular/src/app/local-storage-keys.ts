// ----------------------------------------
// TODO: Move to external utils library.

function trimX(s: string, x: string) {
    let trimmed = s;
    while (trimmed.startsWith(x)) {
        trimmed = trimmed.substring(x.length);
    }
    while (trimmed.endsWith(x)) {
        trimmed = trimmed.substring(0, trimmed.length - x.length);
    }
    return trimmed;
}

function getRelativeBasePath() {
    if (document.baseURI) {
        if (document.location == null) {
            throw new Error("document.location is null");
        }
        const origin = trimX(document.location.origin, "/");
        return trimX(document.baseURI.substring(origin.length), "/");
    } else {
        return "";
    }
}

// ----------------------------------------

const path = getRelativeBasePath();
const prefix = (path ? path + ":" : "") + "berlin-vegan-map.";

export const keys = {
    settings: prefix + "settings",
    gastroQuery: prefix + "gastroQuery",
    language: prefix + "lang",
    shoppingQuery: prefix + "shoppingQuery",
};

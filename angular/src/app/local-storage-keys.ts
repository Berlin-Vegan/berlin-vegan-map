import { DocumentUtil } from "@marco-eckstein/js-utils";

const baseURI = DocumentUtil.getRelativeBaseURI();
const prefix = (baseURI ? baseURI + ":" : "") + "berlin-vegan-map.";

export const keys = {
    settings: prefix + "settings",
    gastroQuery: prefix + "gastroQuery",
    language: prefix + "lang",
    shoppingQuery: prefix + "shoppingQuery",
};

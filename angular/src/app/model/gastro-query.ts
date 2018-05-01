import { getGastroTags } from "./gastro-tag";
import { Query } from "./query";

export class GastroQuery extends Query {
    tags: { [key: string]: boolean; } = {};
    organic = false;
    glutenFree = false;
    breakfast = false;
    brunch = false;
    dog = false;
    childChair = false;
    handicappedAccessible = false;
    handicappedAccessibleWc = false;
    delivery = false;
    catering = false;
    wlan = false;
    review = false;

    constructor() {
        super();
        for (const tag of getGastroTags()) {
            this.tags[tag] = true;
        }
    }
}

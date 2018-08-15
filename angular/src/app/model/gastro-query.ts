import { getGastroTags } from "./gastro-tag";
import { Query } from "./query";

export class GastroQuery extends Query {
    tags: { [key: string]: boolean; } = {};
    glutenFree = false;
    breakfast = false;
    brunch = false;
    dog = false;
    childChair = false;
    handicappedAccessibleWc = false;
    catering = false;
    wlan = false;
    delivery = false;

    constructor(props: any = {}) {
        super();
        for (const tag of getGastroTags()) {
            this.tags[tag] = true;
        }
        Object.assign(this, props);
    }
}

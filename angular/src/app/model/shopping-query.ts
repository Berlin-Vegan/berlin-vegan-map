import { getShoppingTags } from "./shopping-tag";
import { Query } from "./query";

export class ShoppingQuery extends Query {
    tags: { [key: string]: boolean; } = {};

    constructor(props: any = {}) {
        super();
        for (const tag of getShoppingTags()) {
            this.tags[tag] = true;
        }
        Object.assign(this, props);
    }
}

import { Query } from "./query";
import { getShoppingTags } from "./shopping-tag";
import { toMapObject } from "./util";

export class ShoppingQuery extends Query {
    tags: { [key: string]: boolean; } = toMapObject(getShoppingTags(), true);

    constructor(props: any = null) {
        super(props);
        if (props) {
            this.tags = Object.assign({}, props.tags);
        }
    }
}

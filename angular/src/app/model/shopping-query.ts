import { getShoppingTags } from "./shopping-tag";
import { Query } from "./query";
import { toMapOfStringToBoolean } from "./util";

export class ShoppingQuery extends Query {
    tags: { [key: string]: boolean; } = toMapOfStringToBoolean(getShoppingTags(), true);

    constructor(props: any = null) {
        super(props);
        if (props) {
            this.tags = Object.assign({}, props.tags);
        }
    }
}

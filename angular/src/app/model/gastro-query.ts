import { getGastroTags } from "./gastro-tag";
import { Query } from "./query";
import { toMapObject } from "./util";

export class GastroQuery extends Query {
    tags: { [key: string]: boolean; } = toMapObject(getGastroTags(), true);
    glutenFree = false;
    breakfast = false;
    brunch = false;
    dog = false;
    childChair = false;
    handicappedAccessibleWc = false;
    catering = false;
    wlan = false;
    delivery = false;

    constructor(props: any = null) {
        super(props);
        if (props) {
            this.tags = Object.assign({}, props.tags);
            this.glutenFree = props.glutenFree;
            this.breakfast = props.breakfast;
            this.brunch = props.brunch;
            this.dog = props.dog;
            this.childChair = props.childChair;
            this.handicappedAccessibleWc = props.handicappedAccessibleWc;
            this.catering = props.catering;
            this.wlan = props.wlan;
            this.delivery = props.delivery;
        }
    }
}

import { Place } from "./place";
import { SortOrder } from "./sort-order";

export class Distance {

    constructor(
        private readonly query: { sortOrder: SortOrder, distance: Distance },
        props: any = null
    ) {
        if (props) {
            this.enabled = props.enabled;
            this.km = props.km;
            this.place = props.place ? new Place(props.place) : props.place;
        }
    }

    enabled = false;
    km = 1;

    _place: Place | null = null;
    get place(): Place | null { return this._place; }
    set place(place: Place | null) {
        if (place) {
            if (!this._place) {
                this.query.sortOrder = "distance";
            }
        } else {
            this.query.sortOrder = "name";
            this.query.distance.enabled = false;
        }
        this._place = place;
    }

    // Used by JSON.stringify().
    toJSON(): any {
        return {
            enabled: this.enabled,
            km: this.km,
            place: this.place,
        };
    }
}

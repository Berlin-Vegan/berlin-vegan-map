import { Place } from "./place";

export class Distance {

    constructor(props: any = null) {
        if (props) {
            this.enabled = props.enabled;
            this.place = props.place ? new Place(props.place) : props.place;
            this.km = props.km;
        }
    }

    enabled = false;
    place: Place | null = null;
    km = 1;
}

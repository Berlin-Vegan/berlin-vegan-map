import { Storable } from "./storable";

export class Settings extends Storable {
    rememberLastQuery = true;
    showPictures = true;
    clickInListCentersLocation = true;
    monthsNew = 3;
    map = {
        mapTypeControl: false,
        zoomControl: false,
    };

    constructor(props: any = null) {
        super(props);
        if (props) {

            // Persisted props may not have it yet.
            if (typeof props.monthsNew === "undefined") {
                props.monthsNew = this.monthsNew;
            }

            this.rememberLastQuery = props.rememberLastQuery;
            this.showPictures = props.showPictures;
            this.clickInListCentersLocation = props.clickInListCentersLocation;
            this.monthsNew = props.monthsNew;
            this.map = Object.assign({}, props.map);
        }
    }
}

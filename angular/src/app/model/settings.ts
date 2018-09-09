import { Storable } from "./storable";

export class Settings extends Storable {
    rememberLastQuery = true;
    showPictures = true;
    clickInListCentersLocation = true;
    map = {
        mapTypeControl: false,
        zoomControl: false,
    };

    constructor(props: any = null) {
        super(props);
        if (props) {
            this.rememberLastQuery = props.rememberLastQuery;
            this.showPictures = props.showPictures;
            this.clickInListCentersLocation = props.clickInListCentersLocation;
            this.map = Object.assign({}, props.map);
        }
    }
}

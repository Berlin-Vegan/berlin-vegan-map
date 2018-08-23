import { Storable } from "./storable";

export class Settings extends Storable {
    rememberLastQuery = true;
    showPictures = true;
    clickInListCentersLocation = true;
    map = {
        mapTypeControl: false,
        zoomControl: false,
    };

    constructor(props: any = {}) {
        super();
        Object.assign(this, props);
    }
}

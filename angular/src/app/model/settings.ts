export class Settings {
    rememberLastQuery = true;
    showPictures = true;
    map = {
        mapTypeControl: true,
        zoomControl: false,
    };

    constructor(props: any = {}) {
        Object.assign(this, props);
    }
}

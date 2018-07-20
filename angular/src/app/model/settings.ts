export class Settings {
    rememberLastQuery = true;
    infoMode: "box" | "popUp" = "box";

    constructor(props: any = {}) {
        Object.assign(this, props);
    }
}

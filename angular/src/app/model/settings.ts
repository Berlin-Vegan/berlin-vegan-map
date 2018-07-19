export class Settings {
    rememberLastQuery: boolean;
    infoMode: "box" | "popUp";

    constructor(any?: any) {
        const props = any ? any : {};
        this.rememberLastQuery = props.rememberLastQuery || true;
        this.infoMode = props.infoMode || "box";
    }
}

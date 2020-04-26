import { Injectable } from "@angular/core";

import { VeganCategory } from "../model/vegan-category";

@Injectable()
export class ConfigurationService {

    // Keep these in sync with styles/variables.scss!
    private readonly mediaQueries = {
        "min-width-1": "all and (min-width: 568px)",
        "is-touch-device": "(pointer: coarse),"
            + "(-moz-touch-enabled),"
            + "screen and (max-width: 480px) and (orientation: portrait),"
            + "screen and (max-width: 640px) and (orientation: landscape)",
    };
    readonly minWidths = [568, 655, 740, 1080, 1210, 1380, 1600, 1915];

    hasMobileSize(): boolean {
        return !window.matchMedia(this.mediaQueries["min-width-1"]).matches;
    }

    isTouchDevice = () => {
        return window.matchMedia(this.mediaQueries["is-touch-device"]).matches;
    }

    getColor(veganCategory: VeganCategory): string {
        switch (veganCategory) {
            case "omnivorous":
                return "red";
            case "vegetarian":
                return "orange";
            case "vegan":
                return "green";
            default:
                throw new Error("Unexpected value for veganCategory: " + veganCategory);
        }
    }

    getIconUrl(veganCategory: VeganCategory): string {
        return this.getIconUrlByColor(this.getColor(veganCategory));
    }

    getIconUrlForCoordinates(): string {
        return this.getIconUrlByColor("blue");
    }

    private getIconUrlByColor(colorString: string): string {
        return "https://maps.google.com/mapfiles/ms/icons/" + colorString + "-dot.png";
    }
}

import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";
import { VeganCategory } from "../model/vegan-category";

import { defaultConfig as config } from "./default-config";

const environmentKey = (environment.production ? "prod" : "dev");

@Injectable()
export class ConfigurationService {

    private readonly locationsBaseUrl = config.baseUrls[environmentKey].locations;
    readonly gastroLocationsUrl = this.locationsBaseUrl + "GastroLocations.json";
    readonly shoppingLocationsUrl = this.locationsBaseUrl + "ShoppingLocations.json";
    readonly reviewBaseUrl = config.baseUrls[environmentKey].reviews;
    readonly geoLocationTimeoutMillis = environment.production ? 15000 : 5000;
    readonly geoLocationFirefoxWorkaroundTimeoutMillis = environment.production ? 16000 : 8000;
    readonly geoLocationUpdateMillis = environment.production ? 20000 : 5000;
    readonly area = config.area;
    readonly googleAnalyticsTrackingIds = config.googleAnalyticsTrackingIds;
    readonly homePage = config.homePage;
    readonly nativeAppUrl = config.nativeAppUrl;
    readonly reportNewLocationUrl = config.reportNewLocationUrl;
    readonly reportProblemEmail = config.reportProblemEmail;

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

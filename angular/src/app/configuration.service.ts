import { Injectable } from "@angular/core";

import { environment } from "../environments/environment";

import { VeganCategory } from "./model/vegan-category";

@Injectable()
export class ConfigurationService {

    private readonly locationsBaseUrl = (environment.production ? "/app/data/" : "assets/");
    readonly gastroLocationsUrl = this.locationsBaseUrl + "GastroLocations.json";
    readonly shoppingLocationsUrl = this.locationsBaseUrl + "ShoppingLocations.json";
    readonly reviewBaseUrl = "https://www.berlin-vegan.de/essen-und-trinken/kritiken/";
    readonly geoLocationTimeoutMillis = environment.production ? 15000 : 5000;
    readonly geoLocationFirefoxWorkaroundTimeoutMillis = environment.production ? 16000 : 8000;
    readonly geoLocationUpdateMillis = environment.production ? 20000 : 5000;
    readonly area = {
        country: "de",
        center: { lat: 52.5200070, lng: 13.4049540 },
        bounds: {
            north: 52.65,
            south: 52.35,
            west: 13.1,
            east: 13.8,
        },
        zoom: 12,
    };
    readonly googleAnalyticsTrackingIds: { readonly[key: string]: string } = {
        website: "UA-1323925-1",
        map: "UA-1323925-4",
    };

    // Keep these in sync with styles/variables.scss!
    readonly mediaQueries = {
        "min-width-1": "all and (min-width: 568px)",
        "is-touch-device": "(pointer: coarse),"
            + "(-moz-touch-enabled),"
            + "screen and (max-width: 480px) and (orientation: portrait),"
            + "screen and (max-width: 640px) and (orientation: landscape)",
    };
    readonly minWidths = [ 568, 655, 740, 1080, 1210, 1380, 1600, 1915 ];

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

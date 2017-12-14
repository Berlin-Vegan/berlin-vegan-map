import { Injectable } from "@angular/core";

import { VeganCategory } from "./vegan-category";

const debugMode = false; // TODO: Set something like that depending on build.

@Injectable()
export class ConfigurationService {

    readonly locationsUrl = (debugMode ? "assets/" : "/app/data/") + "GastroLocations.json";
    readonly mapCenter = { lat: 52.5200070, lng: 13.4049540 };
    readonly geoLocationTimeoutMillis = debugMode ? 5000 : 15000;
    readonly geoLocationFirefoxWorkaroundTimeoutMillis = debugMode ? 8000 : 16000;

    getColor (veganCategory: VeganCategory): string {
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
}

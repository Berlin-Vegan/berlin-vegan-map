import { Injectable } from "@angular/core";

import { environment } from "../environments/environment";
import { VeganCategory } from "./model/vegan-category";

@Injectable()
export class ConfigurationService {

    private readonly locationsBaseUrl = (environment.production ? "/app/data/" : "assets/");
    readonly gastroLocationsUrl = this.locationsBaseUrl + "GastroLocations.json";
    readonly shoppingLocationsUrl = this.locationsBaseUrl + "ShoppingLocations.json";
    readonly reviewBaseUrl = "https://www.berlin-vegan.de/essen-und-trinken/kritiken/";
    readonly mapCenter = { lat: 52.5200070, lng: 13.4049540 };
    readonly geoLocationTimeoutMillis = environment.production ? 15000 : 5000;
    readonly geoLocationFirefoxWorkaroundTimeoutMillis = environment.production ? 16000 : 8000;
    readonly refreshCoordinatesTimeoutMillis = environment.production ? 20000 : 5000;

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

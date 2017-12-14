import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { GastroLocation } from "./gastro-location";
import { Tag } from "./tag";
import { VeganCategory } from "./vegan-category";
import { I18nService } from "./i18n.service";
import { OpeningTimesService } from "./opening-times.service";

declare var JsCommon: () => void; // TODO

const veganCategories = [];
veganCategories[5] = "vegan";
veganCategories[4] = "vegetarian";
veganCategories[2] = "omnivorous";
const jsCommon = new JsCommon(); // TODO

@Injectable()
export class LocationService {

    constructor(
        private readonly http: Http,
        private readonly openingTimesService: OpeningTimesService,
        private readonly i18nService: I18nService
    ) {}

    getGastroLocations(): Promise<GastroLocation[]> {
        return this.http.get("assets/GastroLocations.json")
            .toPromise()
            .then(response => response.json())
            .then(locations => { this.enhanceLocations(locations); return locations; });
    }

    private enhanceLocations(locations: any[]) { // TODO: location type
        for (const location of locations) {
            this.enhanceLocation(location);
        }
    }

    private enhanceLocation(location) { // TODO: location type

        location.tags = location.tags.sort();
        location.tagsFriendly = location.tags.map(it => this.i18nService.getI18n().enums.tag[it]).join(", ");
        location.commentWithoutFormatting = this.removeFormatting(location.comment);
        location.commentEnglishWithoutFormatting = this.removeFormatting(location.commentEnglish);

        if (location.reviewURL) {
            // Possibly not necessary in production. TODO: Configure
            location.reviewURL = "http://www.berlin-vegan.de/essen-und-trinken/kritiken/" + location.reviewURL;
        }

        location.address = location.street + ", " + location.cityCode + " " + location.district;
        location.openingTimes = this.openingTimesService.getOpeningTimesCollection(location);
        location.getOpenComment = () => this.openingTimesService.getOpenComment(location);

        location.position = {
            lat: function() { return location.latCoord; },
            lng: function() { return location.longCoord; }
        };

        location.getDistanceToPositionInKm = function(position) {
            return jsCommon.geoUtil.getDistanceInKm(position, this.position);
        };

        location.getVeganCategory = function() {
            const veganCategory = veganCategories[this.vegan];
            if (!veganCategory) {
                throw new Error("Unexpected value for vegan: " + this.vegan);
            }
            return veganCategory;
        };
    }

    private removeFormatting(locationComment: string | undefined): string | undefined {
        return locationComment ? locationComment.replace(/&shy;/g, "").replace(/<br\/>/g, " ") : locationComment;
    }

    getSortedTags(): Tag[] {
        return ["Cafe", "Eiscafe", "Imbiss", "Restaurant"];
    }

    getSortedVeganCategories(): VeganCategory[] {
        return veganCategories.filter(it => !!it).reverse();
    }
}

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { ConfigurationService } from "./configuration.service";
import { GastroLocation } from "./model/gastro-location";
import { VeganCategory } from "./model/vegan-category";
import { I18nService } from "./i18n.service";
import { OpeningTimesService } from "./opening-times.service";
import { ShoppingLocation } from "./model/shopping-location";

@Injectable()
export class LocationService {

    constructor(
        private readonly http: Http,
        private readonly configurationService: ConfigurationService,
        private readonly openingTimesService: OpeningTimesService,
        private readonly i18nService: I18nService
    ) {}

    getGastroLocations(): Promise<GastroLocation[]> {
        return this.http.get(this.configurationService.gastroLocationsUrl)
            .toPromise()
            .then(response => response.json())
            .then(locations => locations.map(it => this.newGastroLocation(it)));
    }

    getShoppingLocations(): Promise<ShoppingLocation[]> {
        return this.http.get(this.configurationService.shoppingLocationsUrl)
            .toPromise()
            .then(response => response.json())
            // Temporary fixes for bad data TODO
            .then(locations => locations.filter(it => it.tags))
            .then(locations => { locations.forEach(it => it.tags = it.tags.map(tag => tag.trim())); return locations; })
            // (end)
            .then(locations => locations.map(it => this.newShoppingLocation(it)));
    }

    private newGastroLocation(location) { // TODO: location type
        return new GastroLocation(
            location.id,
            location.name,
            location.street,
            location.cityCode,
            location.city,
            location.latCoord,
            location.longCoord,
            location.telephone,
            location.website,
            location.email,
            this.openingTimesService.getOpeningTimesCollection(location),
            this.openingTimesService.getOpenComment(location),
            this.getVeganCategory(location),
            location.comment,
            this.removeFormatting(location.comment),
            location.commentEnglish,
            this.removeFormatting(location.commentEnglish),
            location.tags.map(it => this.i18nService.getI18n().enums.gastroTag[it]).join(", "),
            // Possibly not necessary in production. TODO: Configure
            location.reviewURL ? "http://www.berlin-vegan.de/essen-und-trinken/kritiken/" + location.reviewURL : location.reviewURL,
            location.organic,
            location.glutenFree,
            location.dog,
            location.childChair,
            location.handicappedAccessible,
            location.handicappedAccessibleWc,
            location.delivery,
            location.catering,
            location.wlan,
            location.district,
            location.publicTransport,
            location.tags.sort(),
        );
    }

    private newShoppingLocation(location) { // TODO: location type
        return new ShoppingLocation(
            location.id,
            location.name,
            location.street,
            location.cityCode,
            location.city,
            location.latCoord,
            location.longCoord,
            location.telephone,
            location.website,
            location.email,
            this.openingTimesService.getOpeningTimesCollection(location),
            this.openingTimesService.getOpenComment(location),
            this.getVeganCategory(location),
            location.comment,
            this.removeFormatting(location.comment),
            location.commentEnglish,
            this.removeFormatting(location.commentEnglish),
            location.tags.map(it => this.i18nService.getI18n().enums.shoppingTag[it]).join(", "),
            location.tags.sort(),
        );
    }

    private getVeganCategory(location): VeganCategory { // TODO: Type
        switch (location.vegan) {
            case 5:
                return "vegan";
            case 4:
                return "vegetarian";
            case 2:
                return "omnivorous";
            default:
                throw new Error("Unexpected value for vegan: " + location.vegan);
        }
    }

    private removeFormatting(locationComment: string | undefined): string | undefined {
        return locationComment ? locationComment.replace(/&shy;/g, "").replace(/<br\/>/g, " ") : locationComment;
    }
}

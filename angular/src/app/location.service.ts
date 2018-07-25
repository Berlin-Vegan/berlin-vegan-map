import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ConfigurationService } from "./configuration.service";
import { JsonGastroLocation } from "./model/json/json-gastro-location";
import { JsonLocation } from "./model/json/json-location";
import { JsonShoppingLocation } from "./model/json/json-shopping-location";
import { GastroLocation } from "./model/gastro-location";
import { VeganCategory } from "./model/vegan-category";
import { I18nService } from "./i18n.service";
import { OpeningTimesService } from "./opening-times.service";
import { ShoppingLocation } from "./model/shopping-location";

@Injectable()
export class LocationService {

    constructor(
        private readonly httpClient: HttpClient,
        private readonly configurationService: ConfigurationService,
        private readonly openingTimesService: OpeningTimesService,
        private readonly i18nService: I18nService
    ) {}

    getGastroLocations(): Promise<GastroLocation[]> {
        return this.httpClient.get(this.configurationService.gastroLocationsUrl)
            .toPromise()
            .then(response => response as any)
            .then((locations: JsonGastroLocation[]) => locations.map(it => this.newGastroLocation(it)));
    }

    getShoppingLocations(): Promise<ShoppingLocation[]> {
        return this.httpClient.get(this.configurationService.shoppingLocationsUrl)
            .toPromise()
            .then(response => response as any)
            .then((locations: JsonShoppingLocation[]) => locations.map(it => this.newShoppingLocation(it)));
    }

    private newGastroLocation(location: JsonGastroLocation) {
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
            this.openingTimesService.getOpeningTimesCollection(location),
            this.getOpenComment(location),
            this.getVeganCategory(location),
            location.comment,
            this.removeFormatting(location.comment),
            location.commentEnglish,
            this.removeFormatting(location.commentEnglish),
            // Base URL possibly not necessary in production:
            location.reviewURL ? this.configurationService.reviewBaseUrl + location.reviewURL : undefined,
            location.delivery,
            location.organic,
            location.handicappedAccessible,
            location.tags.map(it => this.i18nService.getI18n().enums.gastroTag[it]).join(", "),
            location.email,
            location.glutenFree,
            location.breakfast,
            location.brunch,
            location.dog,
            location.childChair,
            location.handicappedAccessibleWc,
            location.catering,
            location.wlan,
            location.district,
            location.publicTransport,
            location.tags.sort(),
        );
    }

    private newShoppingLocation(location: JsonShoppingLocation) {
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
            this.openingTimesService.getOpeningTimesCollection(location),
            this.getOpenComment(location),
            this.getVeganCategory(location),
            location.comment,
            this.removeFormatting(location.comment),
            location.commentEnglish,
            this.removeFormatting(location.commentEnglish),
            // Base URL possibly not necessary in production:
            location.reviewURL ? this.configurationService.reviewBaseUrl + location.reviewURL : undefined,
            location.delivery,
            location.organic,
            location.handicappedAccessible,
            location.tags.map(it => this.i18nService.getI18n().enums.shoppingTag[it]).join(", "),
            location.tags.sort(),
        );
    }

    private getOpenComment(location: JsonLocation): string | undefined {
        return location.openComment && this.i18nService.getLanguage() === "en" ?
            "Please see location website for opening time details!"
            :
            location.openComment;
    }

    private getVeganCategory(location: JsonLocation): VeganCategory {
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
        return locationComment ?
            locationComment.replace(/&shy;/g, "").replace(/<br\/>/g, " ")
            :
            locationComment;
    }
}

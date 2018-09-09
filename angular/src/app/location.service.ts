import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";

import { ConfigurationService } from "./configuration.service";
import { GastroLocation } from "./model/gastro-location";
import { I18N } from "./i18n-provider";
import { JsonGastroLocation } from "./model/json/json-gastro-location";
import { JsonLocation } from "./model/json/json-location";
import { JsonShoppingLocation } from "./model/json/json-shopping-location";
import { LocalStorageService } from "./local-storage.service";
import { OpeningTimesService } from "./opening-times.service";
import { ShoppingLocation } from "./model/shopping-location";
import { VeganCategory } from "./model/vegan-category";

@Injectable()
export class LocationService {

    constructor(
        @Inject(I18N) private readonly i18n: any,
        private readonly httpClient: HttpClient,
        private readonly configurationService: ConfigurationService,
        private readonly openingTimesService: OpeningTimesService,
        private readonly localStorageService: LocalStorageService,
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
            location.organic,
            location.handicappedAccessible,
            location.pictures,
            location.publicTransport,
            location.tags.map(it => this.i18n.enums.gastroTag[it]).join(", "),
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
            location.delivery,
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
            location.organic,
            location.handicappedAccessible,
            [],
            undefined,
            location.tags.map(it => this.i18n.enums.shoppingTag[it]).join(", "),
            location.tags.sort(),
        );
    }

    private getOpenComment(location: JsonLocation): string | undefined {
        return location.openComment && this.localStorageService.getLanguage() === "en" ?
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

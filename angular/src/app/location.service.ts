import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as moment from "moment";

import { ConfigurationService } from "./configuration.service";
import { I18N } from "./i18n-provider";
import { LocalStorageService } from "./local-storage.service";
import { GastroLocation } from "./model/gastro-location";
import { JsonGastroLocation } from "./model/json/json-gastro-location";
import { JsonLocation } from "./model/json/json-location";
import { JsonShoppingLocation } from "./model/json/json-shopping-location";
import { ShoppingLocation } from "./model/shopping-location";
import { VeganCategory } from "./model/vegan-category";
import { OpeningTimesService } from "./opening-times.service";

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
            location.dateCreated ? moment(location.dateCreated) : undefined,
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
            location.commentEnglish,
            this.removeFormatting(location.review),
            // Base URL possibly not necessary in production:
            location.reviewURL ? this.configurationService.reviewBaseUrl + location.reviewURL : undefined,
            location.organic,
            location.handicappedAccessible,
            location.pictures,
            location.publicTransport,
            window.location.origin + "/gastro/" + location.id,
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
            location.dateCreated ? moment(location.dateCreated) : undefined,
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
            location.commentEnglish,
            this.removeFormatting(location.review),
            // Base URL possibly not necessary in production:
            location.reviewURL ? this.configurationService.reviewBaseUrl + location.reviewURL : undefined,
            location.organic,
            location.handicappedAccessible,
            [],
            undefined,
            window.location.origin + "/shops/" + location.id,
            location.tags.map(it => this.i18n.enums.shoppingTag[it]).join(", "),
            location.tags.sort(),
        );
    }

    private getOpenComment(location: JsonLocation): string | undefined {
        if (this.localStorageService.getLanguage() === "en") {
            if (location.openComment && !location.openCommentEnglish) {
                return "Please see location website for opening time details!";
            } else {
                return location.openCommentEnglish;
            }
        } else {
            return location.openComment;
        }
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

    private removeFormatting(review: string | undefined): string | undefined {
        return review ? review.replace(/&shy;/g, "").replace(/<br\/>/g, " ") : review;
    }
}

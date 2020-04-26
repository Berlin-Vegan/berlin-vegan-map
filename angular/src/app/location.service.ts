import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { NativeGastroLocation, NativeLocation, NativeShoppingLocation } from "@berlin-vegan/berlin-vegan-data-js";
import * as moment from "moment";
import { environment } from "src/environments/environment";

import { I18N } from "./i18n-provider";
import { LocalStorageService } from "./local-storage.service";
import { GastroLocation } from "./model/gastro-location";
import { ShoppingLocation } from "./model/shopping-location";
import { VeganCategory } from "./model/vegan-category";
import { OpeningTimesService } from "./opening-times.service";

@Injectable()
export class LocationService {

    constructor(
        @Inject(I18N) private readonly i18n: any,
        private readonly httpClient: HttpClient,
        private readonly openingTimesService: OpeningTimesService,
        private readonly localStorageService: LocalStorageService,
    ) { }

    getGastroLocations(): Promise<GastroLocation[]> {
        return this.httpClient.get(environment.gastroLocationsUrl)
            .toPromise()
            .then(response => response as any)
            .then((locations: NativeGastroLocation[]) => locations.map(it => fix(it)))
            .then((locations: NativeGastroLocation[]) => locations.map(it => this.newGastroLocation(it)));
    }

    getShoppingLocations(): Promise<ShoppingLocation[]> {
        if (!environment.shoppingLocationsUrl) {
            throw new Error("environment.shoppingLocationsUrl is missing.");
        }
        return this.httpClient.get(environment.shoppingLocationsUrl)
            .toPromise()
            .then(response => response as any)
            .then((locations: NativeShoppingLocation[]) => locations.map(it => fix(it)))
            .then((locations: NativeShoppingLocation[]) => locations.map(it => this.newShoppingLocation(it)));
    }

    private newGastroLocation(location: NativeGastroLocation) {
        return new GastroLocation(
            location.id,
            moment(location.dateCreated),
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
            location.reviewURL ? environment.reviewsBaseUrl + location.reviewURL : undefined,
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

    private newShoppingLocation(location: NativeShoppingLocation) {
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
            location.reviewURL ? environment.reviewsBaseUrl + location.reviewURL : undefined,
            location.organic,
            location.handicappedAccessible,
            [],
            undefined,
            window.location.origin + "/shops/" + location.id,
            location.tags.map(it => this.i18n.enums.shoppingTag[it]).join(", "),
            location.tags.sort(),
        );
    }

    private getOpenComment(location: NativeLocation): string | undefined {
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

    private getVeganCategory(location: NativeLocation): VeganCategory {
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

/**
 * Workaround for a bug: wrong property name "created"
 *
 * TODO: Remove when bug has been fixed.
 */
export function fix<T extends NativeLocation>(location: T): T {
    // tslint:disable-next-line: deprecation
    location.dateCreated = location.dateCreated ?? location.created;
    return location;
}

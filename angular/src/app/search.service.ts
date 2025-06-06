import { Injectable } from "@angular/core";
import { DayOfWeek } from "@marco-eckstein/js-utils";

import { LocalStorageService } from "./local-storage.service";
import { GastroLocation } from "./model/gastro-location";
import { GastroQuery } from "./model/gastro-query";
import { GastroTag } from "./model/gastro-tag";
import { Location } from "./model/location";
import { ShoppingLocation } from "./model/shopping-location";
import { ShoppingQuery } from "./model/shopping-query";
import { ShoppingTag } from "./model/shopping-tag";

@Injectable()
export class SearchService {

    constructor(private readonly localStorageService: LocalStorageService) {}

    isResult(location: Location, query: GastroQuery | ShoppingQuery): boolean {

        if (
            (location instanceof GastroLocation && query instanceof ShoppingQuery)
            ||
            (location instanceof ShoppingLocation && query instanceof GastroQuery)
        ) {
            throw new Error();
        }

        const filter1 = () => {

            if (query.openNow) {
                const now = new Date(Date.now());
                return location.openingTimes.isOpen(now.getDay() as DayOfWeek, now);
            } else if (!query.allWeekDays()) {
                return location.openingTimes.isOpen(
                    parseInt(query.openAtWeekDay, 10) as DayOfWeek,
                    query.openAtTimeAsDate()
                );
            } else {
                return true;
            }
        };

        const filter2 = () => {
            const distance = query.distance;
            if (distance.enabled && distance.place && distance.place.coordinates) {
                return location.getDistanceToCoordinatesInKm(distance.place.coordinates) <= query.distance.km;
            } else {
                return true;
            }
        };

        const filter3 = () => {

            let searchedValues = [location.name];

            if (!query.textAppliesToNamesOnly) {
                searchedValues = searchedValues.concat([
                    location.street,
                    location.cityCode + "",
                    location.telephone ?? "",
                    location.website ?? "",
                    location.getLocalizedComment(this.localStorageService.getLanguage()) ?? "",
                    location.reviewWithoutFormatting ?? "",
                ]);

                if (location instanceof GastroLocation) {
                    searchedValues = searchedValues.concat([
                        location.district,
                        location.publicTransport ?? "",
                        location.email ?? "",
                    ]);
                }

                // Always true, but smart cast does not recognize that:
                if (location instanceof GastroLocation || location instanceof ShoppingLocation) {
                    searchedValues = searchedValues.concat(location.tags);
                }
            }
            return searchedValues.some(property =>
                normalizeText(property).includes(normalizeText(query.text))
            );
        };

        const filter4 = () => {

            for (const tag in query.tags) {
                if (query.tags.hasOwnProperty(tag) && query.tags[tag]) { // Tag is selected...
                    if (
                        (location instanceof GastroLocation && location.tags.includes(tag as GastroTag))
                        ||
                        (location instanceof ShoppingLocation && location.tags.includes(tag as ShoppingTag))
                    ) {
                        // ... and location has tag
                        return true;
                    }
                }
            }

            return false;
        };

        const filter5 = () => {

            for (const veganCategory in query.veganCategories) {
                if (
                    query.veganCategories.hasOwnProperty(veganCategory)
                    && query.veganCategories[veganCategory]
                ) { // Vegan category is selected...
                    if (location.veganCategory === veganCategory) { // ... and location belongs to it
                        return true;
                    }
                }
            }

            return false;
        };

        const filter6 = () =>
            (!query.isNew || location.hasBeenCreatedInLastMonths(this.localStorageService.settings.monthsNew))
            && (!query.review || !!location.reviewURL);

        const filter7 = () => {
            return (!query.organic || location.organic === 1)
                && (!query.handicappedAccessible || location.handicappedAccessible === 1);
        };

        let filter8 = () => true;

        if (location instanceof GastroLocation && query instanceof GastroQuery) {
            filter8 = () => {
                return (!query.glutenFree || location.glutenFree === 1)
                    && (!query.breakfast || location.breakfast === 1)
                    && (!query.brunch || location.brunch === 1)
                    && (!query.dog || location.dog === 1)
                    && (!query.childChair || location.childChair === 1)
                    && (!query.handicappedAccessibleWc || location.handicappedAccessibleWc === 1)
                    && (!query.catering || location.catering === 1)
                    && (!query.wlan || location.wlan === 1)
                    && (!query.delivery || location.delivery === 1);
            };
        }

        return filter1()
            && filter2()
            && filter3()
            && filter4()
            && filter5()
            && filter6()
            && filter7()
            && filter8();
    }
}

function normalizeText(text: string | undefined): string {

    if (!text) {
        return "";
    }

    // So we find café when searching for cafe and vice versa.
    // Analogous motivation for the other letters.
    return text
        .toLowerCase()
        .replace(/á|â|à/g, "a")
        .replace(/é|ê/g, "e")
        .replace(/ó|ô/g, "o")
        .replace(/ñ/g, "n")
        .replace(/['´`]/g, "")
        .trim();
}

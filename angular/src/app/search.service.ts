import { Injectable } from "@angular/core";

import { DayOfWeek } from "./day-of-week";
import { GastroLocation } from "./gastro-location";
import { GastroTag } from "./gastro-tag";
import { I18nService } from "./i18n.service";
import { LocationService } from "./location.service";

@Injectable()
export class SearchService {

    constructor(
        private readonly i18nService: I18nService,
        private readonly locationService: LocationService
    ) {}

    isResult(location: GastroLocation, query): boolean { // TODO: query type

        const filter0 = () => {
            return (!query.organic || location.organic === 1)
                && (!query.glutenFree || location.glutenFree === 1)
                && (!query.dog || location.dog === 1)
                && (!query.childChair || location.childChair === 1)
                && (!query.handicappedAccessible || location.handicappedAccessible === 1)
                && (!query.handicappedAccessibleWc || location.handicappedAccessibleWc === 1)
                && (!query.delivery || location.delivery === 1)
                && (!query.catering || location.catering === 1)
                && (!query.wlan || location.wlan === 1);
        };

        const filter1 = () => {

            if (query.openNow) {
                const now = new Date(Date.now());
                return location.openingTimes.isOpen(now.getDay() as DayOfWeek, now);
            } else if (!query.allWeekDays()) {
                return location.openingTimes.isOpen(parseInt(query.openAtWeekDay, 10) as DayOfWeek, query.openAtTimeAsDate());
            } else {
                return true;
            }
        };

        const filter2 = () => {

            if (query.distance.enabled) {
                return location.getDistanceToPositionInKm(query.distance.position) <= query.distance.km;
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
                    location.district,
                    location.publicTransport,
                    location.telephone,
                    location.website,
                    location.email,
                    (this.i18nService.getLanguage() === "en" ?
                        location.commentEnglishWithoutFormatting
                        :
                        location.commentWithoutFormatting
                    )
                ]);

                searchedValues = searchedValues.concat(location.tags);
            }
            return searchedValues.some(function(property) {
                return normalizeText(property).includes(normalizeText(query.text));
            });
        };

        const filter4 = () => {

            for (const tag in query.tags) {
                if (query.tags.hasOwnProperty(tag) && query.tags[tag]) { // Tag is selected...
                    if (location.tags.indexOf(tag as GastroTag) >= 0) { // ... and location has tag
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
                    if (location.getVeganCategory() === veganCategory) { // ... and location belongs to it
                        return true;
                    }
                }
            }

            return false;
        };

        const filter6 = () => !query.review || !!location.reviewURL;

        return filter0()
            && filter1()
            && filter2()
            && filter3()
            && filter4()
            && filter5()
            && filter6();
    }

    getInitialQuery() { // TODO: query type

        const tagsMap = {};

        for (const tag of this.locationService.getSortedGastroTags()) {
            tagsMap[tag] = true;
        }

        const veganCategoriesMap = {};

        for (const veganCategory of this.locationService.getSortedVeganCategories()) {
            veganCategoriesMap[veganCategory] = true;
        }

        return {
            text: "",
            openAtWeekDay: "all",
            tags: tagsMap,
            veganCategories: veganCategoriesMap,
            allWeekDays: function() { return this.openAtWeekDay === "all"; },
            distance: { enabled: false, position: null, km: 1},
            openAtTime: "",
            openAtTimeAsDate: function() { return parseTime(this.openAtTime); },
        };
    }
}

function normalizeText(text: string | undefined): string {

    if (!text) {
        text = "";
    }

    // So we find café when searching for cafe and vice versa.
    // Analogous motivation for the other letters.
    return text
        .replace(/á|â|à/g, "a")
        .replace(/é|ê/g, "e")
        .replace(/ó|ô/g, "o")
        .replace(/ñ/g, "n")
        .toLowerCase();
}

// TODO: Refactor to library
function parseTime(hoursAndMinutes: string): Date | undefined {
    const parts = hoursAndMinutes.split(":");
    if (parts.length === 2 && parts[0].length === 2 && parts[1].length === 2) {
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        if (0 <= hours && hours <= 23 && 0 <= minutes && minutes <= 59) {
            const timeAsDate = new Date(0);
            timeAsDate.setHours(hours);
            timeAsDate.setMinutes(minutes);
            return timeAsDate;
        }
    }
    return undefined;
}

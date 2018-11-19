import { GeoUtil, LatitudeLongitude } from "@marco-eckstein/js-utils";

import { OpeningTimesCollection } from "./opening-times-collection";
import { Picture } from "./picture";
import { VeganCategory } from "./vegan-category";
import { YesNoUnknown } from "./yes-no-unknown";

export class Location {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly street: string,
        public readonly cityCode: number,
        public readonly city: string,
        public readonly latCoord: number,
        public readonly longCoord: number,
        public readonly telephone: string | undefined,
        public readonly website: string | undefined,
        public readonly openingTimes: OpeningTimesCollection,
        public readonly localizedOpenComment: string | undefined,
        public readonly veganCategory: VeganCategory,
        public readonly comment: string | undefined,
        public readonly commentWithoutFormatting: string | undefined,
        public readonly commentEnglish: string | undefined,
        public readonly commentEnglishWithoutFormatting: string | undefined,
        public readonly reviewURL: string | undefined,
        public readonly organic: YesNoUnknown,
        public readonly handicappedAccessible: YesNoUnknown,
        public readonly pictures: Picture[],
        public readonly publicTransport: string | undefined,
        public readonly tagsFriendly: string,
    ) {}

    private get latitudeLongitude(): LatitudeLongitude {
        return {
            latitude: this.latCoord,
            longitude: this.longCoord,
        };
    }

    getDistanceToCoordinatesInKm(coordinates: Coordinates): number {
        return GeoUtil.getDistanceInKm(coordinates, this.latitudeLongitude);
    }

    get address(): string {
        return this.street + ", " + this.cityCode + " " + this.city;
    }
}

import { VeganCategory } from "./vegan-category";
import { OpeningTimesCollection } from "./opening-times-collection";

declare var JsCommon: () => void; // TODO
const jsCommon = new JsCommon(); // TODO

export class Location {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly street: string,
        public readonly cityCode: number,
        public readonly city: string,
        public readonly latCoord: number, // TODO: Needed?
        public readonly longCoord: number, // TODO: Needed?
        public readonly telephone: string | undefined,
        public readonly website: string | undefined,
        public readonly openingTimes: OpeningTimesCollection,
        public readonly localizedOpenComment: string | undefined,
        public readonly veganCategory: VeganCategory,
        public readonly comment: string | undefined,
        public readonly commentWithoutFormatting: string | undefined,
        public readonly commentEnglish: string | undefined,
        public readonly commentEnglishWithoutFormatting: string | undefined,
        public readonly tagsFriendly: string,
    ) {}

    private get position() { // TODO: Type
        return {
            lat: () => this.latCoord,
            lng: () => this.longCoord,
        };
    }

    getDistanceToCoordinatesInKm(coordinates: Coordinates): number {
        return jsCommon.geoUtil.getDistanceInKm(this.transformCoordinates(coordinates), this.position);
    }

    get address(): string {
        return this.street + ", " + this.cityCode + " " + this.city;
    }

    // TODO
    private transformCoordinates(coordinates: Coordinates): any {
        return {
            lat: () => coordinates.latitude,
            lng: () => coordinates.longitude,
        };
    }
}

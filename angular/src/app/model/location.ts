import { VeganCategory } from "./vegan-category";
import { OpeningTimesCollection } from "./opening-times-collection";

declare var JsCommon: () => void; // TODO
const jsCommon = new JsCommon(); // TODO

export class Location {
    // TODO: Check types for null/undefined.
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly street: string,
        public readonly cityCode: number,
        public readonly city: string,
        public readonly latCoord: number, // TODO: Needed?
        public readonly longCoord: number, // TODO: Needed?
        public readonly telephone: string,
        public readonly website: string,
        public readonly openingTimes: OpeningTimesCollection,
        public readonly localizedOpenComment: string,
        public readonly veganCategory: VeganCategory,
        public readonly comment: string,
        public readonly commentWithoutFormatting: string,
        public readonly commentEnglish: string,
        public readonly commentEnglishWithoutFormatting: string,
        public readonly tagsFriendly: string,
    ) {}

    private get position() { // TODO: Type
        return {
            lat: () => this.latCoord,
            lng: () => this.longCoord,
        };
    }

    getDistanceToPositionInKm(position) { // TODO: Type
        return jsCommon.geoUtil.getDistanceInKm(position, this.position);
    }

    get address(): string {
        return this.street + ", " + this.cityCode + " " + this.city;
    }
}

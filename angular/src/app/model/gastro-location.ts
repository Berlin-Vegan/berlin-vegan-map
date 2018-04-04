import { GastroTag } from "./gastro-tag";
import { Location } from "./location";
import { OpeningTimesCollection } from "./opening-times-collection";
import { VeganCategory } from "./vegan-category";

type YesNoUnknown = 1 | 0 | -1;

export class GastroLocation extends Location {
    // TODO: Check types for null/undefined.
    constructor(
        id: string,
        name: string,
        street: string,
        cityCode: number,
        city: string,
        latCoord: number,
        longCoord: number,
        telephone: string,
        website: string,
        openingTimes: OpeningTimesCollection,
        localizedOpenComment: string,
        veganCategory: VeganCategory,
        comment: string,
        commentWithoutFormatting: string,
        commentEnglish: string,
        commentEnglishWithoutFormatting: string,
        tagsFriendly: string,
        public readonly reviewURL: string,
        public readonly email: string,
        public readonly organic: YesNoUnknown,
        public readonly glutenFree: YesNoUnknown,
        public readonly dog: YesNoUnknown,
        public readonly childChair: YesNoUnknown,
        public readonly handicappedAccessible: YesNoUnknown,
        public readonly handicappedAccessibleWc: YesNoUnknown,
        public readonly delivery: YesNoUnknown,
        public readonly catering: YesNoUnknown,
        public readonly wlan: YesNoUnknown,
        public readonly district: string,
        public readonly publicTransport: string,
        public readonly tags: GastroTag[],
    ) {
        super(
            id,
            name,
            street,
            cityCode,
            city,
            latCoord,
            longCoord,
            telephone,
            website,
            openingTimes,
            localizedOpenComment,
            veganCategory,
            comment,
            commentWithoutFormatting,
            commentEnglish,
            commentEnglishWithoutFormatting,
            tagsFriendly,
        );
    }

    get address(): string {
        return this.street + ", " + this.cityCode + " " + this.district;
    }
}

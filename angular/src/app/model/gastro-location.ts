import { GastroTag } from "./gastro-tag";
import { Location } from "./location";
import { OpeningTimesCollection } from "./opening-times-collection";
import { VeganCategory } from "./vegan-category";

type YesNoUnknown = 1 | 0 | -1;

export class GastroLocation extends Location {
    constructor(
        id: string,
        name: string,
        street: string,
        cityCode: number,
        city: string,
        latCoord: number,
        longCoord: number,
        telephone: string | undefined,
        website: string | undefined,
        openingTimes: OpeningTimesCollection,
        localizedOpenComment: string | undefined,
        veganCategory: VeganCategory,
        comment: string | undefined,
        commentWithoutFormatting: string | undefined,
        commentEnglish: string | undefined,
        commentEnglishWithoutFormatting: string | undefined,
        tagsFriendly: string,
        public readonly reviewURL: string | undefined,
        public readonly email: string | undefined,
        public readonly organic: YesNoUnknown,
        public readonly glutenFree: YesNoUnknown,
        public readonly breakfast: YesNoUnknown,
        public readonly brunch: YesNoUnknown,
        public readonly dog: YesNoUnknown,
        public readonly childChair: YesNoUnknown,
        public readonly handicappedAccessible: YesNoUnknown,
        public readonly handicappedAccessibleWc: YesNoUnknown,
        public readonly delivery: YesNoUnknown,
        public readonly catering: YesNoUnknown,
        public readonly wlan: YesNoUnknown,
        public readonly district: string,
        public readonly publicTransport: string | undefined,
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

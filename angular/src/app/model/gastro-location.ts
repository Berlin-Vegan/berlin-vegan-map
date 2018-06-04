import { GastroTag } from "./gastro-tag";
import { Location } from "./location";
import { OpeningTimesCollection } from "./opening-times-collection";
import { VeganCategory } from "./vegan-category";
import { YesNoUnknown } from "./yes-no-unknown";

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
        reviewURL: string | undefined,
        delivery: YesNoUnknown,
        organic: YesNoUnknown,
        handicappedAccessible: YesNoUnknown,
        tagsFriendly: string,
        public readonly email: string | undefined,
        public readonly glutenFree: YesNoUnknown,
        public readonly breakfast: YesNoUnknown,
        public readonly brunch: YesNoUnknown,
        public readonly dog: YesNoUnknown,
        public readonly childChair: YesNoUnknown,
        public readonly handicappedAccessibleWc: YesNoUnknown,
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
            reviewURL,
            delivery,
            organic,
            handicappedAccessible,
            tagsFriendly,
        );
    }

    get address(): string {
        return this.street + ", " + this.cityCode + " " + this.district;
    }
}

import { Location } from "./location";
import { OpeningTimesCollection } from "./opening-times-collection";
import { Picture } from "./picture";
import { ShoppingTag } from "./shopping-tag";
import { VeganCategory } from "./vegan-category";
import { YesNoUnknown } from "./yes-no-unknown";

export class ShoppingLocation extends Location {
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
        commentEnglish: string | undefined,
        reviewWithoutFormatting: string | undefined,
        reviewURL: string | undefined,
        organic: YesNoUnknown,
        handicappedAccessible: YesNoUnknown,
        pictures: Picture[],
        publicTransport: string | undefined,
        tagsFriendly: string,
        public readonly tags: ShoppingTag[],
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
            commentEnglish,
            reviewWithoutFormatting,
            reviewURL,
            organic,
            handicappedAccessible,
            pictures,
            publicTransport,
            tagsFriendly,
        );
    }
}

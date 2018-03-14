import { ShoppingTag } from "./shopping-tag";
import { Location } from "./location";
import { OpeningTimesCollection } from "./opening-times-collection";
import { VeganCategory } from "./vegan-category";

type YesNoUnknown = 1 | 0 | -1;

export class ShoppingLocation extends Location {
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
        email: string,
        openingTimes: OpeningTimesCollection,
        localizedOpenComment: string,
        veganCategory: VeganCategory,
        comment: string,
        commentWithoutFormatting: string,
        commentEnglish: string,
        commentEnglishWithoutFormatting: string,
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
            email,
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
}
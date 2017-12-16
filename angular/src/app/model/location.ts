import { VeganCategory } from "./vegan-category";
import { OpeningTimesCollection } from "./opening-times-collection";

export interface Location {
    // TODO: Check types for null/undefined.
    id: string;
    name: string;
    street: string;
    cityCode: number;
    address: string;
    latCoord: number;
    longCoord: number;
    telephone: string;
    website: string;
    email: string;
    otSun: string;
    otMon: string;
    otTue: string;
    otWed: string;
    otThu: string;
    otFri: string;
    otSat: string;
    openingTimes: OpeningTimesCollection;
    openComment: string;
    getOpenComment: () => string;
    getDistanceToPositionInKm: (position: any) => number; // TODO: Type
    getVeganCategory: () => VeganCategory;
    comment: string;
    commentWithoutFormatting: string;
    commentEnglish: string;
    commentEnglishWithoutFormatting: string;
    tagsFriendly: string;
}

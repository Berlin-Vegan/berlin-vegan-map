import { YesNoUnknown } from "./yes-no-unknown";

export interface JsonLocation {

    /**
     * Unique identifier.
     * Non-Empty.
     * Note that the id is not guaranteed to be stable between multiple versions of the JSON file.
     */
    id: string;

    /**
     * Name.
     * Non-empty.
     */
    name: string;

    /**
     * Address: street and street number.
     * Non-empty.
     */
    street: string;

    /**
     * Address: zip code.
     */
    cityCode: number;

    /**
     * Address: city.
     * Non-empty.
     */
    city: string;

    /**
     * Address: latitude.
     */
    latCoord: number;

    /**
     * Address: longitude.
     */
    longCoord: number;

    /**
     * Telephone number.
     * Non-empty.
     */
    telephone?: string;

    /**
     * Website URL.
     * Non-empty.
     */
    website?: string;

    /**
     * Opening/closing times Monday.
     * Possibly empty (i.e. closed that day).
     * Examples: 11 - 18:30, 11:00 - 18:30, 0 - 0
     */
    otMon: string;

    /**
     * Opening/closing times Tuesday.
     * See otMon.
     */
    otTue: string;

    /**
     * Opening/closing times Wednesday.
     * See otMon.
     */
    otWed: string;

    /**
     * Opening/closing times Thursday.
     * See otMon.
     */
    otThu: string;

    /**
     * Opening/closing times Friday.
     * See otMon.
     */
    otFri: string;

    /**
     * Opening/closing times Saturday.
     * See otMon.
     */
    otSat: string;

    /**
     * Opening/closing times Sunday.
     * See otMon.
     */
    otSun: string;

    /**
     * Opening/closing times comment (German).
     * Possibly empty.
     */
    openComment?: string;

    /**
     * Vegan category code.
     * 2 = omnivore (vegan declared),
     * 4 = vegetarian (vegan declared),
     * 5 = 100% vegan
     */
    vegan: 2 | 4 | 5;

    /**
     * Description (German).
     * Non-empty.
     */
    comment?: string;

    /**
     * Description (English).
     * Non-empty.
     */
    commentEnglish?: string;

    /**
     * The food is mostly organic.
     */
    organic: YesNoUnknown;

    /**
     * The location is handicapped accessible.
     */
    handicappedAccessible: YesNoUnknown;

    /**
     * URL of a review by Berlin-Vegan, relative to Berlin-Vegan's review base URL.
     * Non-empty.
     */
    reviewURL?: string;
}

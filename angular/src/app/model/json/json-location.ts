import { YesNoUnknown } from "./yes-no-unknown";

export interface JsonLocation {

    /**
     * Unique identifier.
     * Non-Empty.
     * Note that the id is not guaranteed to be stable between multiple versions of the JSON file.
     */
    id: string;

    /**
     * The creation date of this record in format "YYYY-MM-DD" (UTC).
     *
     * I.e., this is not the date when the actual location was created/opened,
     * but rather the date when this record was created in the database.
     *
     * It is optional because right now, it is missing in JsonShoppingLocations. Still, JsonLocation is the
     * correct place to define it, because in the future, all JsonLocations will have it.
     *
     * Note that due to a bug, this is currently named "created".
     */
    // TODO: Remove notice about "created" when bug has been fixed.
    dateCreated?: string;

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
     * Opening/closing times comment (English).
     * Possibly empty.
     */
    openCommentEnglish?: string;

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
     * Review by Berlin-Vegan.
     * Non-empty.
     */
    review?: string;

    /**
     * URL of a review by Berlin-Vegan, relative to Berlin-Vegan's review base URL.
     * Non-empty.
     */
    reviewURL?: string;
}

/**
 * Workaround for a bug: wrong property name (see above)
 *
 * TODO: Remove when bug has been fixed.
 */
export function fix<T extends JsonLocation>(location: T): T {
    if (!location.dateCreated) {
        location.dateCreated = (location as any).created;
    }
    return location;
}

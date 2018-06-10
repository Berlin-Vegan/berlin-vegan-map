import { JsonLocation } from "./json-location";
import { YesNoUnknown } from "./yes-no-unknown";

interface Picture {

    /**
     * URL.
     * Non-empty.
     */
    url: string;

    width: number;

    height: number;
}

export interface JsonGastroLocation extends JsonLocation {

    /**
     * Adress district.
     * Non-empty.
     */
    district: string;

    /**
     * Pictures.
     * 0 to many items.
     */
    pictures: Picture[];

    /**
     * Public transport description.
     * Non-empty.
     */
    publicTransport?: string;

    /**
     * WC/toilet is handicapped accessible.
     */
    handicappedAccessibleWc: YesNoUnknown;

    /**
     * Dogs are allowed.
     */
    dog: YesNoUnknown;

    /**
     * Child chair (high chair) is available.
     */
    childChair: YesNoUnknown;

    /**
     * Catering is available.
     */
    catering: YesNoUnknown;

    /**
     * Number of seats outdoor, or -1 = unknown.
     */
    seatsOutdoor: number;

    /**
     * Number of seats indoor, or -1 = unknown.
     */
    seatsIndoor: number;

    /**
     * Free WiFi is available.
     */
    wlan: YesNoUnknown;

    /**
     * Gluten-free food is available.
     */
    glutenFree: YesNoUnknown;

    /**
     * Breakfast is available.
     */
    breakfast: YesNoUnknown;

    /**
     * Brunch is available.
     */
    brunch: YesNoUnknown;

    /**
     * Tags.
     * 1 to 5 items.
     */
    tags: ("Bar" | "Cafe" | "Eiscafe" | "Imbiss" | "Restaurant")[];

    /**
     * Email address.
     * Non-empty.
     */
    email?: string;
}

import { Location } from "./location";

type YesNoUnknown = 1 | 0 | -1;

export interface GastroLocation extends Location {
    // TODO: Check types for null/undefined.
    tagsFriendly: string;
    reviewURL: string;
    organic: YesNoUnknown;
    glutenFree: YesNoUnknown;
    dog: YesNoUnknown;
    childChair: YesNoUnknown;
    handicappedAccessible: YesNoUnknown;
    handicappedAccessibleWc: YesNoUnknown;
    delivery: YesNoUnknown;
    catering: YesNoUnknown;
    wlan: YesNoUnknown;
    district: string;
    publicTransport: string;
    tags: string[];
}

import { JsonLocation } from "./json-location";

interface Picture {
    url: string; // non-empty
    width: number;
    height: number;
}

type YesNoUnknown = 1 | 0 | -1;

export interface JsonGastroLocation extends JsonLocation {
    district: string; // non-empty
    pictures: Picture[]; // 0..*
    publicTransport: string; // non-empty
    handicappedAccessible: YesNoUnknown;
    handicappedAccessibleWc: YesNoUnknown;
    dog: YesNoUnknown;
    childChair: YesNoUnknown;
    catering: YesNoUnknown;
    delivery: YesNoUnknown;
    organic: YesNoUnknown;
    seatsOutdoor: number;
    seatsIndoor: number;
    wlan: YesNoUnknown;
    glutenFree: YesNoUnknown;
    tags: ("Restaurant" | "Imbiss" | "Eiscafe" | "Cafe")[]; // 1..4
    openComment?: string; // possibly empty
    reviewURL?: string; // non-empty
    email?: string; // non-empty
}

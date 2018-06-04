import { JsonLocation } from "./json-location";
import { YesNoUnknown } from "./yes-no-unknown";

interface Picture {
    url: string; // non-empty
    width: number;
    height: number;
}

export interface JsonGastroLocation extends JsonLocation {
    district: string; // non-empty
    pictures: Picture[]; // 0..*
    publicTransport?: string; // non-empty
    handicappedAccessibleWc: YesNoUnknown;
    dog: YesNoUnknown;
    childChair: YesNoUnknown;
    catering: YesNoUnknown;
    seatsOutdoor: number;
    seatsIndoor: number;
    wlan: YesNoUnknown;
    glutenFree: YesNoUnknown;
    breakfast: YesNoUnknown;
    brunch: YesNoUnknown;
    tags: ("Bar" | "Cafe" | "Eiscafe" | "Imbiss" | "Restaurant")[]; // 1..5
    email?: string; // non-empty
}

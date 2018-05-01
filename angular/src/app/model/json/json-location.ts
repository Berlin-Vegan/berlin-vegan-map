export interface JsonLocation {
    id: string; // non-empty
    name: string; // non-empty
    street: string; // non-empty
    cityCode: number;
    city: string; // non-empty
    latCoord: number;
    longCoord: number;
    telephone?: string; // non-empty
    website?: string; // non-empty
    otMon: string; // possibly empty
    otTue: string; // possibly empty
    otWed: string; // possibly empty
    otThu: string; // possibly empty
    otFri: string; // possibly empty
    otSat: string; // possibly empty
    otSun: string; // possibly empty
    vegan: 2 | 4 | 5;
    comment?: string; // non-empty
    commentEnglish?: string; // non-empty
}

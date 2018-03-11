import { Injectable } from "@angular/core";

declare var JsCommon: () => void; // TODO
declare var global_language: string; // TODO

const i18nUtil = new JsCommon().i18nUtil;
const nbsp = "\xa0"; // Non-breaking space
const i18n = {
    enums: {
        veganCategory: {
            concise: {
                vegan: {
                    en: "vegan",
                    de: "vegan",
                },
                vegetarian: {
                    en: "vegetarian",
                    de: "vegetarisch",
                },
                omnivorous: {
                    en: "omnivorous",
                    de: "omnivor",
                },
            },
            verbose: {
                vegan: {
                    en: "100% vegan",
                    de: "100% vegan",
                },
                vegetarian: {
                    en: "vegetarian, vegan declaration",
                    de: "vegetarisch, vegan deklariert",
                },
                omnivorous: {
                    en: "omnivorous, vegan declaration",
                    de: "omnivor, vegan deklariert",
                },
            },
        },
        gastroTag: {
            // Capitalized values because they are capitalized in the data source.
            Cafe: {
                en: "Cafe",
                de: "Café",
            },
            Eiscafe: {
                en: "Ice cream shop",
                de: "Eiscafé",
            },
            Imbiss: {
                en: "Snack bar",
                de: "Imbiss",
            },
            Restaurant: {
                en: "Restaurant",
                de: "Restaurant",
            },
        },
        shoppingTag: {
            // Capitalized values because they are capitalized in the data source.
            Bio: {
                en: "Organic",
                de: "Bio",
            },
            Backwaren: {
                en: "Baked goods",
                de: "Backwaren",
            },
            Eis: {
                en: "Ice cream",
                de: "Eis",
            },
            Drogerie: {
                en: "Drug store",
                de: "Drogerie",
            },
            Kleidung: {
                en: "Clothing",
                de: "Kleidung",
            },
        },
        weekday: {
            all: {
                en: "All days",
                de: "Alle Wochentage",
            },
            today: {
                en: "Today",
                de: "Heute",
            },
            "0": {
                en: "Sunday",
                de: "Sonntag",
            },
            "1": {
                en: "Monday",
                de: "Montag",
            },
            "2": {
                en: "Tuesday",
                de: "Dienstag",
            },
            "3": {
                en: "Wednesday",
                de: "Mittwoch",
            },
            "4": {
                en: "Thursday",
                de: "Donnerstag",
            },
            "5": {
                en: "Friday",
                de: "Freitag",
            },
            "6": {
                en: "Saturday",
                de: "Samstag",
            },
        },
    },
    locationSwitch: {
        gastro: {
            en: "Food & beverages",
            de: "Essen & Trinken",
        },
        shopping: {
            en: "Shopping",
            de: "Einkaufen",
        },
    },
    search: {
        text: {
            placeholder: {
                en: "Search text",
                de: "Suchtext",
            },
            namesOnly: {
                en: "Search names only",
                de: "Nur Namen durchsuchen",
            },
        },
    },
    category: {
        header: {
            en: "Category",
            de: "Kategorie",
        },
    },
    tag: {
        header: {
            en: "Type",
            de: "Art",
        },
    },
    features: {
        organic: {
            en: "Organic",
            de: "Bioware",
        },
        glutenFree: {
            en: "Gluten-free food",
            de: "Glutenfreie Speisen",
        },
        dog: {
            en: "Dogs allowed",
            de: "Hunde erlaubt",
        },
        childChair: {
            en: "High chair",
            de: "Kinderstuhl",
        },
        handicappedAccessible: {
            en: "Wheelchair-accessible",
            de: "Rollstuhlgerecht",
        },
        handicappedAccessibleWc: {
            en: "Wheelchair-accessible toilet",
            de: "Rollstuhlgerechtes WC",
        },
        delivery: {
            en: "Delivery service",
            de: "Lieferdienst",
        },
        catering: {
            en: "Catering",
            de: "Catering",
        },
        wlan: {
            en: "Wi-Fi",
            de: "WLAN",
        },
        review: {
            en: "With review (German)",
            de: "Mit Rezension",
        },
    },
    openingTimes: {
        header: {
            en: "Open",
            de: "Geöffnet",
        },
        timePlaceholder: {
            openNow: {
                en: "- Now -",
                de: "- Jetzt -",
            },
            notOpenNow: {
                en: "hh:mm (Time)",
                de: "hh:mm (Uhrzeit)",
            },
        },
        invalidTime: {
            en: "Invalid time (ignored); Format: hh:mm",
            de: "Ungültige Zeit (wird ignoriert); Format: hh:mm",
        },
        nowCheckbox: {
            en: "Now",
            de: "Jetzt",
        },
        isOpenToday: {
            en: "Open today",
            de: "Heute geöffnet",
        },
        isClosedToday: {
            en: "Closed today",
            de: "Heute geschlossen",
        },
        isClosed: {
            en: "Closed",
            de: "Geschlossen",
        },
    },
    geolocation: {
        header: {
            en: "Geolocation",
            de: "Standorterkennung",
        },
        currentLocation: {
            en: "Current location",
            de: "Aktueller Standort",
        },
        distance: {
            en: "Distance",
            de: "Entfernung",
        },
        detecting: {
            en: "Geolocating...",
            de: "Ermittle Standort...",
        },
        theError: {
            en: "Geolocation impossible",
            de: "Standortzugriff nicht möglich",
        },
        PERMISSION_DENIED: {
            en: "Permission denied",
            de: "Zugriff verweigert",
        },
        POSITION_UNAVAILABLE: {
            en: "Position unavailable",
            de: "Standort nicht verfügbar",
        },
        TIMEOUT: {
            en: "Timeout",
            de: "Zeitüberschreitung",
        },
    },
    sortBy: {
        header: {
            en: "Sort by",
            de: "Sortierung",
        },
        name: {
            en: "Name",
            de: "Name",
        },
        distance: {
            en: "Distance",
            de: "Entfernung",
        },
        distanceRequiresGeolocation: {
            en: "Geolocation required",
            de: "Standorterkennung erforderlich",
        },
    },
    resultsLength: {
        en: " results of ",
        de: " Treffer von ",
    },
    showOnMap: {
        en: "Show on map",
        de: "Auf der Karte anzeigen",
    },
    infoWindow: {
        distance: {
            en: "Distance",
            de: "Entfernung",
        },
        openingTimes: {
            en: "Opening hours",
            de: "Öffnungszeiten",
        },
        review: {
            en: "Review (German)",
            de: "Rezension",
        },
    },
    header: {
        reportNewLocation: {
            en: "Report" + nbsp + "new" + nbsp + "location",
            de: "Neueintrag" + nbsp + "melden",
        },
        reportProblem: {
            en: "Report" + nbsp + "problem",
            de: "Problem" + nbsp + "melden",
        },
        fullMapViewbuttonTitle: {
            en: "Full map view",
            de: "Kartenvollansicht",
        },
        searchButtonTitle: {
            en: "Show search form",
            de: "Suchformular anzeigen",
        },
        language: {
            // A bit dirty, but we want to display the language in its language.
            en: {
                en: "English",
                de: "English",
            },
            de: {
                en: "Deutsch",
                de: "Deutsch",
            },
        },
    }
};

const transformedI18n = i18nUtil.transform(i18n, global_language);

@Injectable()
export class I18nService {

    setLanguage(language: string) {
        if (localStorage) {
            localStorage.setItem("lang", language);
            // Clear search parameters: (location.search = "" leaves question mark in some browsers.)
            location.href = location.href.split("?")[0];
        } else {
            location.search = "?lang=" + language;
        }
    }

    getLanguage(): string {
        return global_language;
    }

    getI18n(): any {
        return transformedI18n;
    }

    formatNumberString(numberString: string): string {
        return i18nUtil.formatNumberString(numberString, global_language);
    }

    abbreviateWeekDay(weekday: string): string {
        return i18nUtil.abbreviateWeekDay(weekday, global_language);
    }

    formatTimeInterval(beginDate: Date, endDate: Date): string {
        return i18nUtil.formatTimeInterval(beginDate, endDate, global_language);
    }
}

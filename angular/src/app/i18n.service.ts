import { Injectable } from "@angular/core";
import { I18nUtil } from "@marco-eckstein/js-utils";

import { TimeInterval } from "./model/time-interval";

declare var global_language: "de" | "en";

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
            Bar: {
                en: "Bar",
                de: "Bar",
            },
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
            foods: {
                en: "Foods",
                de: "Lebensmittel",
            },
            clothing: {
                en: "Clothing",
                de: "Kleidung",
            },
            toiletries: {
                en: "Toiletries",
                de: "Hygieneartikel",
            },
            supermarket: {
                en: "Supermarket",
                de: "Supermarkt",
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
    loadingLocations: {
        en: "Loading locations...",
        de: "Lade Locations...",
    },
    locationSwitch: {
        gastro: {
            en: "Food & beverages",
            de: "Gastronomie",
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
        breakfast: {
            en: "Breakfast",
            de: "Frühstück",
        },
        brunch: {
            en: "Brunch",
            de: "Brunch",
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
        openAtWeekDay: {
            en: "Open at week day",
            de: "Geöffnet am Wochentag",
        },
        openAtTime: {
            en: "Open at time",
            de: "Geöffnet zur Uhrzeit",
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
            en: "Position",
            de: "Standort",
        },
        currentPosition: {
            en: "Position",
            de: "Standort",
        },
        detectButton: {
            en: "Detect",
            de: "Erkennen",
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
        placeSelectPlaceholder: {
            en: "Or enter an address",
            de: "Oder geben Sie eine Adresse ein.",
        },
    },
    sortBy: {
        label: {
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
        distanceRequiresPosition: {
            en: "Position required",
            de: "Standort erforderlich",
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
    openingHoursInfo: {
        en: "Opening hours info",
        de: "Info zu Öffnungszeiten",
    },
    infoWindow: {
        distance: {
            en: "Distance",
            de: "Entfernung",
        },
        phone: {
            en: "Phone",
            de: "Tel.",
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
    address: {
        locationInGoogleMaps: {
            en: "Location in Google Maps",
            de: "Location in Google Maps",
        },
        directionsInGoogleMaps: {
            en: "Directions in Google Maps",
            de: "Wegbeschreibung in Google Maps",
        },
        publicTransport: {
            en: "Public transport (beta)",
            de: "ÖPNV (beta)",
        },
        geolocationRequired: {
            en: "Geolocation required",
            de: "Standorterkennung erforderlich",
        },
    },
    infoBox: {
        close: {
            en: "Close info",
            de: "Info schließen",
        }
    },
    header: {
        nativeApp: {
            long: {
                en: "Mobile native app",
                de: "Mobile native App",
            },
            short: {
                en: "Native app",
                de: "Native App",
            },
        },
        reportNewLocation: {
            long: {
                en: "Report new location",
                de: "Neueintrag melden",
            },
            short: {
                en: "Report location",
                de: "Neueintrag",
            },
        },
        reportProblem: {
            long: {
                en: "Report problem",
                de: "Problem melden",
            },
            short: {
                en: "Problem",
                de: "Problem",
            },
        },
        fullMapViewbuttonTitle: {
            en: "Full map view",
            de: "Kartenvollansicht",
        },
        searchButtonTitle: {
            en: "Show search form",
            de: "Suchformular anzeigen",
        },
        settingsButtonTitle: {
            en: "Open settings",
            de: "Einstellungen öffnen",
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
    },
    settings: {
        backButtonText: {
            en: "Back to map",
            de: "Zurück zur Karte",
        },
        heading: {
            en: "Settings",
            de: "Einstellungen",
        },
        rememberLastQuery: {
            en: "Remember last query",
            de: "Letzte Suche merken",
        },
        showPictures: {
            en: "Show location pictures",
            de: "Fotos der Locations anzeigen",
        },
        noLocalStorageWarning: {
            en: "Local storage is unavailable or disabled in your browser. Nothing will be saved permanently.",
            de: "Local Storage ist in deinem Browser nicht vorhanden oder deaktiviert. "
                + "Nichts wird dauerhaft gespeichert.",
        },
        deleteQueriesConfirmation: {
            en: "Delete last queries?",
            de: "Letzte Suchen löschen?",
        }
    }
};

const transformedI18n = I18nUtil.transform(i18n, global_language);

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
        return I18nUtil.formatNumberString(numberString, global_language);
    }

    abbreviateWeekDay(weekday: string): string {
        return I18nUtil.abbreviateWeekDay(weekday, global_language);
    }

    formatTimeInterval(timeInterval: TimeInterval): string {
        return I18nUtil.formatTimeInterval(timeInterval.begin, timeInterval.end, global_language);
    }
}

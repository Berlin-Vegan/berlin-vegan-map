import { InjectionToken } from "@angular/core";
import { I18nUtil } from "@marco-eckstein/js-utils";

import { Language } from "./model/language";

declare var global_language: Language;

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
                en: "Food",
                de: "Lebensmittel",
            },
            clothing: {
                en: "Fashion",
                de: "Kleidung",
            },
            toiletries: {
                en: "Toiletries",
                de: "Kosmetik",
            },
            supermarket: {
                en: "Supermarket",
                de: "Supermarkt",
            },
            hairdressers: {
                en: "Hairdresser's",
                de: "Friseursalon",
            },
            sports: {
                en: "Sports",
                de: "Sport",
            },
            tattoostudio: {
                en: "Tattoo studio",
                de: "Tattoostudio",
            },
            accommodation: {
                en: "Accommodation",
                de: "Unterkunft",
            }
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
        isNew: {
            en: "New",
            de: "Neu",
        },
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
        latest: {
            en: "Latest",
            de: "Aktuell",
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
            de: "Oder gib eine Adresse ein.",
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
    infoBox: {
        distance: {
            en: "Distance",
            de: "Entfernung",
        },
        phone: {
            en: "Phone",
            de: "Tel.",
        },
        review: {
            en: "Review (German)",
            de: "Rezension",
        },
        close: {
            en: "Close info",
            de: "Info schließen",
        },
        shareLink: {
            title: {
                en: "Share the link to this location",
                de: "Link zu dieser Location teilen",
            },
            header: {
                en: "Share the link to this location:",
                de: "Link zu dieser Location teilen:",
            },
            clipboardTitle: {
                en: "Copy to clipboard",
                de: "In die Zwischenablage kopieren",
            },
        }
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
            en: "BVG (public transport) (beta)",
            de: "BVG (beta)",
        },
        geolocationRequired: {
            en: "Position required",
            de: "Standort erforderlich",
        },
    },
    header: {
        fullMapViewbuttonTitle: {
            en: "Full map view",
            de: "Kartenvollansicht",
        },
        searchButtonTitle: {
            en: "Show search form",
            de: "Suchformular anzeigen",
        },
        gastro: {
            en: "Eating out",
            de: "Gastronomie",
        },
        shops: {
            en: "Shops",
            de: "Geschäfte",
        },
        reportNewLocation: {
            en: "Suggest new location",
            de: "Neue Location vorschlagen",
        },
        reportProblem: {
            en: "Report problem",
            de: "Problem melden",
        },
        settings: {
            en: "Settings",
            de: "Einstellungen",
        },
        about: {
            en: "About",
            de: "Über",
        },
        nativeApp: {
            en: "Native app",
            de: "Native App",
        },
        menu: {
            en: "Menu",
            de: "Menü",
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
        clickInListCentersLocation: {
            en: "Click on location list centers location",
            de: "Klick auf Location in der Liste zentriert die Location",
        },
        monthsNew: {
            en: "The maximum age (in months) of a location record that is considered as new",
            de: "Das maximale Alter (in Monaten) eines Location-Eintrags, der als neu gilt",
        },
        map: {
            header: {
                en: "Map",
                de: "Karte",
            },
            mapTypeControl: {
                en: "Show map type controls (Map, Satellite)",
                de: "Schalter für Kartenart anzeigen (Karte, Satellit)",
            },
            zoomControl: {
                en: "Show zoom controls (+, -)",
                de: "Schalter für Vergrößerung/Verkleinerung anzeigen (+, -)",
            },
        },
        noLocalStorageWarning: {
            en: "Local storage is unavailable or disabled in your browser. Nothing will be saved permanently.",
            de: "Local Storage ist in deinem Browser nicht vorhanden oder deaktiviert. "
                + "Nichts wird dauerhaft gespeichert.",
        },
        deleteQueriesConfirmation: {
            en: "Delete last queries?",
            de: "Letzte Suchen löschen?",
        },
        reset: {
            en: "Reset to defaults",
            de: "Auf Standardeinstellungen zurücksetzen",
        },
    },
    about: {
        versionInfoHeading: {
            en: "Version info",
            de: "Versionsinfo",
        },
    },
};

export const I18N = new InjectionToken<any>("i18n");
const getTransformedI18n = () => I18nUtil.transform(i18n, global_language);
export const I18nProvider = { provide: I18N, useFactory: getTransformedI18n };

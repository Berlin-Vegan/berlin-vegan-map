import { Environment } from "./environment-type-def";

export const environmentDefault: Environment = {
    production: false,
    geoLocation: {
        timeoutMillis: 5000,
        firefoxWorkaroundTimeoutMillis: 8000,
        updateMillis: 5000
    },
    gastroLocationsUrl: "assets/GastroLocations.json",
    shoppingLocationsUrl: "assets/ShoppingLocations.json",
    reviewsBaseUrl: "https://www.berlin-vegan.de/essen-und-trinken/kritiken/",
    nativeAppUrl: "https://www.berlin-vegan.de/bv-guide/",
    reportNewLocationUrl: "https://data.berlin-vegan.de/gastro-submit/",
    reportProblemEmail: "karte@berlin-vegan.de",
    homePage: {
        url: "https://www.berlin-vegan.de/",
        title: "Berlin-Vegan",
    },
    area: {
        country: "de",
        center: {
            lat: 52.5200070,
            lng: 13.4049540,
        },
        bounds: {
            north: 52.65,
            south: 52.35,
            west: 13.1,
            east: 13.8,
        },
        zoom: 12,
    },
    googleAnalyticsTrackingIds: {
        website: "UA-1323925-1",
        map: "UA-1323925-4",
    }
};

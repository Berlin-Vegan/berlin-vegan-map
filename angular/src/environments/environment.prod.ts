import { environmentDefault } from "./environment-default";
import { Environment } from "./environment-type-def";

export const environment: Environment = {
    ...environmentDefault,
    production: true,
    geoLocation: {
        timeoutMillis: 15000,
        firefoxWorkaroundTimeoutMillis: 16000,
        updateMillis: 20000
    },
    gastroLocationsUrl: "https://www.berlin-vegan.de/app/data/GastroLocations.json",
    shoppingLocationsUrl: "https://www.berlin-vegan.de/app/data/ShoppingLocations.json",
};

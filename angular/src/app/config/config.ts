export interface Config {

    readonly baseUrls: {
        readonly dev: {
            readonly locations: string
            readonly reviews?: string
        }
        readonly prod: {
            readonly locations: string
            readonly reviews?: string
        }
    };

    readonly homePage: {
        readonly url: string
        readonly title: string
    };

    readonly nativeAppUrl?: string;
    readonly reportNewLocationUrl?: string;
    readonly reportProblemEmail: string;
    readonly enableShops: boolean;

    readonly area: {

        /**
         * Two-letter county code in lowercase.
         *
         * E.g. "de"
         */
        readonly country: string

        /**
         * The initial center of the map
         */
        readonly center: {
            readonly lat: number
            readonly lng: number
        },

        /**
         * The initial bounds of the map
         */
        readonly bounds: {
            readonly north: number
            readonly south: number
            readonly west: number
            readonly east: number
        },

        /**
         * The initial zoom of the map
         */
        readonly zoom: 12
    };

    readonly googleAnalyticsTrackingIds: {
        readonly website?: string
        readonly map?: string
    };
}

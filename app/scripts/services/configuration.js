"use strict";

app.factory('ConfigurationService', function() {

    var debugMode = false; // TODO: Set something like that depending on build.

    return {
      locationsUrl: (debugMode ? "assets/" : "/app/data/") + "GastroLocations.json",
      mapCenter: { lat: 52.5200070, lng: 13.4049540 },
      geoLocationTimeoutMillis: debugMode ? 5000 : 15000,
      geoLocationFirefoxWorkaroundTimeoutMillis: debugMode ? 8000 : 16000,
      getColor: function (veganCategory) {
        switch (veganCategory) {
            case "omnivorous":
                return "red";
            case "vegetarian":
                return "orange";
            case "vegan":
                return "green";
            default:
                throw new Error("Unexpected value for veganCategory: " + veganCategory);
        }
    }
    };
});

"use strict";

app.factory('ResourcesService', function() {

    return {
        getRedDotImageUrl: function() {
            return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
        },
        getOrangeDotImageUrl: function() {
            return "https://maps.google.com/mapfiles/ms/icons/orange-dot.png";
        },
        getGreenDotImageUrl: function() {
            return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
        },
    };
});
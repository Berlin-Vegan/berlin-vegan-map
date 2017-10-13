"use strict";

app.factory('ResourcesService', function() {

    return {
        getDotImageUrl: function(colorString) {
            return "https://maps.google.com/mapfiles/ms/icons/" + colorString + "-dot.png";
        },
    };
});
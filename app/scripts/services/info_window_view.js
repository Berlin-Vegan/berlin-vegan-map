"use strict";

/**
 * There have been great technical diffculties when trying to define the google.maps.InfoWindow content HTML 
 * with a proper AngularJS template. So, to at least have it in a dedicated file, we use this service.
 */
app.factory("InfoWindowViewService", function() {

    var service = {};
    
    service.getContent = function(location) {
        return "<h2>" + location.name + "</h2>" 
            + "<div class='infoWindowContent'>" 
            + "<p>" + location.tags.join(", ") + "</p>"
            + "<p>" + location.comment + "</p>"
            + "</div>";
    };
    
    return {
        getContent: function(location) {
            return service.getContent(location);
        }
    };
});
"use strict";

/**
 * Clean the location JSON data. 
 *
 * Should become obsolete in the future when source spreadsheet/database 
 * and JSON generator have been enhanced.
 */
app.factory('LocationCleansingService', function(OpeningTimesService, UtilService) {

    var service = {};
    
    service.cleanLocations = function(locations) {
        for (var i = 0; i < locations.length; i++) {
            cleanLocation(locations[i]);
        }
    };
    
    function cleanLocation(location) {

        location.openComment = getCleanOpenComment(location.openComment);
    }
    
    function getCleanOpenComment(openComment) {
    
        if (openComment) {
            openComment = openComment.trim();
            if (openComment.length === 0) {
                openComment = undefined;
            }
        }
        
        return openComment;
    }
    
    return {
        cleanLocations: function(locations) {
            return service.cleanLocations(locations);
        }
    };
});
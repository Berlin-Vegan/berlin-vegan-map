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
        location.tags = getCleanTags(location.tags);
        
        var otPropertyNames = ["otSun", "otMon", "otTue", "otWed", "otThu", "otFri", "otSat"];
        
        for (var i = 0; i < otPropertyNames.length; i++) {
            var propertyName = otPropertyNames[i];
            location[propertyName] = getCleanOt(location[propertyName]);
        }
        
        if (location.website && location.website.length > 0) {
            location.website = getCleanWebsite(location.website);
        }
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
    
    function getCleanTags(tags) {
        // Fixes that should be done during JSON generation:
        return tags.map(function(tag) { return tag.trim(); });
    }

    function getCleanOt(otString) {
        // Fixes that should be done during JSON generation:
        return otString.replace(/\s/g, "").replace(/-24/g, "-0");
    }
    
    function getCleanWebsite(website) {
        // Fixes that should be done during JSON generation:
        return website.startsWith("http") ? website : "http://" + website;
    }
    
    return {
        cleanLocations: function(locations) {
            return service.cleanLocations(locations);
        }
    };
});
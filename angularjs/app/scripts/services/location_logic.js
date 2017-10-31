"use strict";

app.factory('LocationLogicService', function(OpeningTimesService, I18nService) {

    var veganCategories = [];
    veganCategories[5] = "vegan";
    veganCategories[4] = "vegetarian";
    veganCategories[2] = "omnivorous";
    var jsCommon = new JsCommon();
    var service = {};
    
    service.enhanceLocations = function(locations) {
        for (var i = 0; i < locations.length; i++) {
            enhanceLocation(locations[i]);
        }
    };
    
    function enhanceLocation(location) {
    
        location.tags = location.tags.sort();
        location.tagsFriendly = location.tags.map(function(it) { return I18nService.getI18n().enums.tag[it]; }).join(", ");
        location.commentWithoutFormatting = removeFormatting(location.comment);
        location.commentEnglishWithoutFormatting = removeFormatting(location.commentEnglish);
        
        if (location.reviewURL) {
            // Possibly not necessary in production
            location.reviewURL = "http://www.berlin-vegan.de/essen-und-trinken/kritiken/" + location.reviewURL;
        }

        location.address = location.street + ", " + location.cityCode + " " + location.district;
        location.openingTimes = OpeningTimesService.getOpeningTimesCollection(location);
        location.getOpenComment = function() { return OpeningTimesService.getOpenComment(location); };
        
        location.position = {
            lat: function() { return location.latCoord; },
            lng: function() { return location.longCoord; }
        }

        location.getDistanceToPositionInKm = function(position) {
            return jsCommon.geoUtil.getDistanceInKm(position, this.position);
        };
        
        location.getVeganCategory = function() {
            var veganCategory = veganCategories[this.vegan];
            if (!veganCategory) {
                throw new Error("Unexpected value for vegan: " + this.vegan);
            }
            return veganCategory;
        }
    }
    
    function removeFormatting(locationComment) {
        return locationComment ? locationComment.replace(/&shy;/g, "").replace(/<br\/>/g, " ") : locationComment;
    }
    
    service.getSortedTags = function() {
        return ["Cafe", "Eiscafe", "Imbiss", "Restaurant"];
    }
    
    service.getSortedVeganCategories = function() {
        return veganCategories.workaroundFilter(function(it) { return !!it; }).reverse();
    }

    return {
        enhanceLocations: function(locations) {
            return service.enhanceLocations(locations);
        },
        getSortedTags: function() {
            return service.getSortedTags();
        },
        getSortedVeganCategories: function() {
            return service.getSortedVeganCategories();
        },
    };
});
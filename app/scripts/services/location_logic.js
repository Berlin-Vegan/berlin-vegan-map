"use strict";

app.factory('LocationLogicService', function(OpeningTimesService) {

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
        location.commentWithoutFormatting = removeFormatting(location.comment);
        location.commentEnglishWithoutFormatting = removeFormatting(location.commentEnglish);
        
        if (location.reviewURL) {
            // Possibly not necessary in production
            location.reviewURL = "http://www.berlin-vegan.de/essen-und-trinken/kritiken/" + location.reviewURL;
        }

        location.address = location.street + ", " + location.cityCode + " " + location.district;
        location.openingTimes = OpeningTimesService.getOpeningTimes(location);
        location.getOpeningTimeTodayFriendly = 
            function() { return OpeningTimesService.getOpeningTimeTodayFriendly(location.openingTimes); };
        location.getOpeningTimesCompressed = 
            function() { return OpeningTimesService.getOpeningTimesCompressed(location.openingTimes) };
        location.isOpen = 
            function(weekDay, timeAsDate) { return OpeningTimesService.isOpen(this.openingTimes, weekDay, timeAsDate) };
        location.getOpenComment = 
            function() { return OpeningTimesService.getOpenComment(location); };
        
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
        return onlyDefined(veganCategories).reverse();

        // Build process seems to have a problem with an array's filter funtion.
        // The problem shows up at runtime in production.
        // So we use this workaround: (TODO: Refactor)
        function onlyDefined(arr) {
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    result.push(arr[i]);
                }
            }
            return result;
        } 
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
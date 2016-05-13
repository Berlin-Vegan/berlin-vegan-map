"use strict";

app.factory('LocationLogicService', function(OpeningTimesService, UtilService) {

    var service = {};
    
    service.enhanceLocations = function(locations) {
        for (var i = 0; i < locations.length; i++) {
            enhanceLocation(locations[i]);
        }
    };
    
    function enhanceLocation(location) {
    
        location.tags = getCleanAndSortedTags(location.tags);
        location.commentWithoutFormatting = removeFormatting(location.comment);

        location.openingTimes = [
            new OpeningTimes(location.otSun), 
            new OpeningTimes(location.otMon), 
            new OpeningTimes(location.otTue), 
            new OpeningTimes(location.otWed), 
            new OpeningTimes(location.otThu), 
            new OpeningTimes(location.otFri), 
            new OpeningTimes(location.otSat)
        ];
        
        location.getOpeningTimeTodayFriendly = function() {
        
            var otToday = this.openingTimes[new Date().getDay()].otString;
            
            if (otToday === "") {
                return "Heute geschlossen";
            } else {
                return "Heute geöffnet: " + otToday + " Uhr";
            }
        }
        
        location.isOpen = function(weekDay, timeAsDate) {
            return OpeningTimesService.isOpen(this.openingTimes, weekDay, timeAsDate);
        }
        
        location.getDistanceToPositionInKm = function(position) {
        
            return UtilService.getDistanceFromLatLonInKm(
                position.lat(), 
                position.lng(), 
                parseFloat(this.latCoord), 
                parseFloat(this.longCoord)
            )
        };
    }
    
    function getCleanAndSortedTags(tags) {
        var newTags = 
            tags
                .map(function(tag) {
                    return tag.trim();
                })
                .map(function(tag) {
                    if (tag === "Cafe") {
                        return "Café";
                    } else if (tag === "Eiscafe") {
                        return "Eiscafé";
                    } else {
                        return tag;
                    }
                });
        newTags.sort();
        return newTags;
    }
    
    function removeFormatting(locationComment) {
        return locationComment.replace(/&shy;/g, "").replace(/<br\/>/g, " ");
    }
    
    function OpeningTimes(otString) {
        
        this.otString = otString;
        
        if (otString && otString.trim() !== "") {
        
            var otParts = otString.split("-");
            var begin = otParts[0].trim();
            var end = otParts[1].trim();
            
            var beginParts = begin.split(":");
            var beginHour = beginParts[0];
            var beginMinute = beginParts.length > 1 ? beginParts[1] : 0;
            
            var endParts = end.split(":");
            var endHour = endParts[0];
            var endMinute = endParts.length > 1 ? endParts[1] : 0;
            
            var year = 2000; // Arbitrary
            var month = 1; // Arbitrary
            var day = 1; // Arbitrary
            
            this.begin = new Date(year, month, day, parseInt(beginHour), parseInt(beginMinute), 0, 0);
            this.end = new Date(year, month, day, parseInt(endHour === "24" ? "0" : endHour), parseInt(endMinute), 0, 0);
        }
    }
    
    service.getSortedDistricts = function(locations) {
    
        var pseudoSet = {};
        
        for (var i = 0; i < locations.length; i++) {
            pseudoSet[locations[i].district] = "";
        }
        
        return pseudoSetToSortedArray(pseudoSet);
    };
    
    service.getSortedTags = function(locations) {
    
        var pseudoSet = {};
        
        for (var i = 0; i < locations.length; i++) {
            for (var j = 0; j < locations[i].tags.length; j++) {
                pseudoSet[locations[i].tags[j]] = "";
            }
        }
        
        return pseudoSetToSortedArray(pseudoSet);
    }
    
    function pseudoSetToSortedArray(pseudoSet) {
    
        var array = [];
        
        for (var entry in pseudoSet) {
            array.push(entry);
        }
        
        array.sort();
        return array;
    }
    
    return {
        enhanceLocations: function(locations) {
            return service.enhanceLocations(locations);
        },
        getSortedDistricts: function(locations) {
            return service.getSortedDistricts(locations);
        },
        getSortedTags: function(locations) {
            return service.getSortedTags(locations);
        }
    };
});
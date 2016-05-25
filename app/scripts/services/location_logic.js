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
        
        location.otSun = getCleanOpeningTimeString(location.otSun);
        location.otMon = getCleanOpeningTimeString(location.otMon);
        location.otTue = getCleanOpeningTimeString(location.otTue);
        location.otWed = getCleanOpeningTimeString(location.otWed);
        location.otThu = getCleanOpeningTimeString(location.otThu);
        location.otFri = getCleanOpeningTimeString(location.otFri);
        location.otSat = getCleanOpeningTimeString(location.otSat);
        
        if (location.comment) {
            location.commentWithoutFormatting = removeFormatting(location.comment);
        }

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
    
    function getCleanOpeningTimeString(otString) {
    
        // TODO: Correct this stuff in data source or JSON generator and remove the logic here:
        if (otString === "ab 10") {
            return "10-0";
        } else if (otString === "12 : 23") {
            return "12-23";
        } else if (otString === "12 - 15:30, 17:30 - 23") {
            return "12-23";
        }
    
        return otString.trim().endsWith("-") ? otString + "0" : otString;
    }
    
    function OpeningTimes(otString) {
        
        this.otString = otString;
        
        if (otString && otString.trim() !== "") {
        
            var date = { year: 2000, month: 1, day: 1 }; // Arbitrary
            var otParts = otString.split("-");
            
            var beginTime = UtilService.getTime(otParts[0].trim());
            this.begin = UtilService.newDate(date, beginTime);
            
            var endTime = UtilService.getTime(otParts[1].trim());
            this.end = UtilService.newDate(date, endTime);
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
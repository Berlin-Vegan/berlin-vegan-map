"use strict";

app.factory('LocationLogicService', function(OpeningTimesService, UtilService) {

    var friendlyDayStrings = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    var service = {};
    
    service.enhanceLocations = function(locations) {
        for (var i = 0; i < locations.length; i++) {
            enhanceLocation(locations[i]);
        }
    };
    
    function enhanceLocation(location) {
    
        location.tags = getCleanAndSortedTags(location.tags);
        
        if (location.comment) {
            location.commentWithoutFormatting = removeFormatting(location.comment);
        }
        
        if (location.reviewURL && location.reviewURL.length > 0) {
            // Possibly not necessary in production
            location.reviewURL = "http://www.berlin-vegan.de/essen-und-trinken/kritiken/" + location.reviewURL;
        }

        location.openingTimes = [
            new OpeningTime(0, location.otSun), 
            new OpeningTime(1, location.otMon), 
            new OpeningTime(2, location.otTue), 
            new OpeningTime(3, location.otWed), 
            new OpeningTime(4, location.otThu), 
            new OpeningTime(5, location.otFri), 
            new OpeningTime(6, location.otSat)
        ];
        
        location.getOpeningTimeTodayFriendly = function() {
        
            var otIntervalFriendlyToday = this.openingTimes[new Date().getDay()].interval.friendly;
            
            if (otIntervalFriendlyToday === "Geschlossen") {
                return "Heute geschlossen";
            } else {
                return "Heute geöffnet: " + otIntervalFriendlyToday;
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
        
        location.getVeganCategoryFriendly = function(verbose) {
        
            var veganDeclaration = (verbose ? ", vegan deklariert" : "");
            
            switch(this.vegan) {
                case 5:
                    return (verbose ? "100% " : "") + "vegan";
                case 4:
                    return "vegetarisch" + veganDeclaration;
                case 2:
                    return "omnivor" + veganDeclaration;
                default:
                    throw new Error("Unexpected value for vegan: " + this.vegan);
            }
        }
    }
    
    function getCleanAndSortedTags(tags) {
        var newTags = 
            tags.map(function(tag) {
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
    
    function OpeningTime(dayIndex, otString) {
        this.friendlyDay = friendlyDayStrings[dayIndex];
        this.interval = new OpeningTimeInterval(otString);
    }
    
    function OpeningTimeInterval(otString) {
        
        this.otString = otString;
        
        if (otString !== "") {
        
            var date = { year: 2000, month: 1, day: 1 }; // Arbitrary
            var otParts = otString.split("-");
            
            var beginTime = UtilService.getTime(otParts[0]);
            this.begin = UtilService.newDate(date, beginTime);
            
            var endTime = UtilService.getTime(otParts[1] ? otParts[1] : "0");
            this.end = UtilService.newDate(date, endTime);
        }
        
        if (otString === "") {
            this.friendly = "Geschlossen";
        } else if (otString.endsWith("-")) {
            this.friendly =  "Ab " + otString.replace("-", "") + " Uhr (Open End)";
        } else {
            var extraLongHyphen = "–"; // Your editor may display this as a regular hyphen.
            this.friendly = otString.replace("-", extraLongHyphen) + " Uhr";
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
    
    service.getSortedVeganCategories = function(locations) {
        return ["vegan", "vegetarisch", "omnivor"];
    }
    
    service.getFriendlyDayStrings = function() {
        return friendlyDayStrings;
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
        },
        getSortedVeganCategories: function() {
            return service.getSortedVeganCategories();
        },
        getFriendlyDayStrings: function() {
            return service.getFriendlyDayStrings();
        }
    };
});
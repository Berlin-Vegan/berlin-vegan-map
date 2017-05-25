"use strict";

app.factory('LocationLogicService', function(OpeningTimesService, UtilService, I18nService) {

    var veganCategories = [];
    veganCategories[5] = "vegan";
    veganCategories[4] = "vegetarian";
    veganCategories[2] = "omnivorous";
    var i18n = I18nService.getI18n();
    var service = {};
    
    service.enhanceLocations = function(locations) {
        for (var i = 0; i < locations.length; i++) {
            enhanceLocation(locations[i]);
        }
    };
    
    function enhanceLocation(location) {
    
        location.tags = location.tags.sort();
        
        if (location.comment) {
            location.commentWithoutFormatting = removeFormatting(location.comment);
        }

        if (location.commentEnglish) {
            location.commentEnglishWithoutFormatting = removeFormatting(location.commentEnglish);
        }
        
        if (location.reviewURL) {
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

        location.getOpenComment = function(language) {
            return language === "en" ? 
                "Please see location website for opening time details!" :  this.openComment;
        };
        
        location.getOpeningTimesCompressed = function() {
        
            var compressedOts = [];
            
            for (var day = 1; day <= 7; day++) {
            
                var ot = this.openingTimes[day === 7 ? 0 : day];
                
                if (day > 1) {
                
                    var lastGroup = compressedOts[compressedOts.length - 1];
                    
                    if (lastGroup[0].interval.friendly === ot.interval.friendly) {
                        lastGroup.push(ot);
                        continue;
                    }
                }
                
                var group = [];
                group.push(ot);
                compressedOts.push(group);
            }
            
            return compressedOts;
        }
        
        location.getDistanceToPositionInKm = function(position) {
        
            return UtilService.getDistanceFromLatLonInKm(
                position.lat(), 
                position.lng(), 
                parseFloat(this.latCoord), 
                parseFloat(this.longCoord)
            )
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
        return locationComment.replace(/&shy;/g, "").replace(/<br\/>/g, " ");
    }
    
    function OpeningTime(dayIndex, otString) {
        this.dayIndex = dayIndex;
        this.friendlyDay = i18n.enums.weekday[dayIndex + ""];
        this.friendlyDayShort = I18nService.abbreviateWeekDay(this.friendlyDay);
        this.interval = new OpeningTimeInterval(otString);
    }
    
    function OpeningTimeInterval(otString) {
        
        this.otString = otString;
        
        if (otString !== "") {
        
            var date = { year: 2000, month: 1, day: 1 }; // Arbitrary
            var otParts = otString.split(" - ");
            
            var beginTime = UtilService.getTime(otParts[0]);
            this.begin = UtilService.newDate(date, beginTime);
            
            var endTime = UtilService.getTime(otParts[1]);
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
    
    service.getSortedTags = function(locations) {
    
        // var pseudoSet = {};
        // 
        // for (var i = 0; i < locations.length; i++) {
        //     for (var j = 0; j < locations[i].tags.length; j++) {
        //         pseudoSet[locations[i].tags[j]] = "";
        //     }
        // }
        // 
        // return pseudoSetToSortedArray(pseudoSet);
        
        // Since we know that these are fixed, we can optimize performance by using a shortcut.
        // It would probably be better to have this list generated into JSON. TODO
        return ["Cafe", "Eiscafe", "Imbiss", "Restaurant"];
    }
    
    function pseudoSetToSortedArray(pseudoSet) {
    
        var array = [];
        
        for (var entry in pseudoSet) {
            array.push(entry);
        }
        
        array.sort();
        return array;
    }
    
    service.getSortedVeganCategories = function() {
        return veganCategories.filter(function(it) { return !!it; } ).reverse();
    }
    
    return {
        enhanceLocations: function(locations) {
            return service.enhanceLocations(locations);
        },
        getSortedTags: function(locations) {
            return service.getSortedTags(locations);
        },
        getSortedVeganCategories: function() {
            return service.getSortedVeganCategories();
        },
    };
});
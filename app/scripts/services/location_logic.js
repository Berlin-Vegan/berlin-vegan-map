"use strict";

app.factory('LocationLogicService', function(OpeningTimesService, I18nService) {

    var veganCategories = [];
    veganCategories[5] = "vegan";
    veganCategories[4] = "vegetarian";
    veganCategories[2] = "omnivorous";
    var i18n = I18nService.getI18n();
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
        
            var otIntervalToday = this.openingTimes[new Date().getDay()].interval;
            
            if (otIntervalToday.isOpen) {
                return i18n.openingTimes.isOpenToday + ": " + otIntervalToday.friendly;
            } else {
                return i18n.openingTimes.isClosedToday;
            }
        }
        
        location.isOpen = function(weekDay, timeAsDate) {
            return OpeningTimesService.isOpen(
                this.openingTimes.map(function(it) { return it.interval }), 
                weekDay, 
                timeAsDate
            );
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
    
    function OpeningTime(dayIndex, otString) {
        this.dayIndex = dayIndex;
        this.friendlyDay = i18n.enums.weekday[dayIndex + ""];
        this.friendlyDayShort = I18nService.abbreviateWeekDay(this.friendlyDay);
        this.interval = createOpeningTimeInterval(otString);
    }
    
    function createOpeningTimeInterval(otString) {
        var isOpen = !!otString;
        var begin;
        var end;
        var friendly;

        if (isOpen) {
            var otParts = otString.split(" - ");
            
            var beginTime = jsCommon.dateUtil.parseTime(otParts[0]);
            begin = new Date(0);
            begin.setHours(beginTime.hours, beginTime.minutes);
            
            var endTime = jsCommon.dateUtil.parseTime(otParts[1]);
            end = new Date(0);
            end.setHours(endTime.hours, endTime.minutes);

            friendly = I18nService.formatTimeInterval(begin, end);
        } else {
            friendly = i18n.openingTimes.isClosed;
        }

        return new OpeningTimeInterval(begin, end, friendly);
    }

    function OpeningTimeInterval(beginTimeAsDate, endTimeAsDate, friendlyString) {
        this.begin = beginTimeAsDate;
        this.end = endTimeAsDate;
        this.friendly = friendlyString;
        this.isOpen = function() { return !!beginTimeAsDate };
    }
    
    service.getSortedTags = function() {
        return ["Cafe", "Eiscafe", "Imbiss", "Restaurant"];
    }
    
    service.getSortedVeganCategories = function() {
        return onlyDefined(veganCategories).reverse();

        // Build process seems to have a problem with an array's filter funtion,
        // so we use this workaround: (TODO: Refactor)
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
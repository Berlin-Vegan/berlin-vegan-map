"use strict";

app.factory('OpeningTimesService', function(I18nService) {

    var veganCategories = [];
    veganCategories[5] = "vegan";
    veganCategories[4] = "vegetarian";
    veganCategories[2] = "omnivorous";
    var i18n = I18nService.getI18n();
    var jsCommon = new JsCommon();
    var service = {};
    
    service.getOpeningTimes = function(location) {
        return [
            new OpeningTime(0, location.otSun), 
            new OpeningTime(1, location.otMon), 
            new OpeningTime(2, location.otTue), 
            new OpeningTime(3, location.otWed), 
            new OpeningTime(4, location.otThu), 
            new OpeningTime(5, location.otFri), 
            new OpeningTime(6, location.otSat)
        ];
    };

    service.getOpenComment= function(location) {
        return I18nService.getLanguage() === "en" ? 
            "Please see location website for opening time details!"
            :
            location.openComment;
    };

    service.getOpeningTimeTodayFriendly = function(openingTimes) {
        var otIntervalToday = openingTimes[new Date().getDay()].interval;
        return otIntervalToday.isOpen ? 
            i18n.openingTimes.isOpenToday + ": " + otIntervalToday.friendly
            :
            i18n.openingTimes.isClosedToday;
    };

    service.getOpeningTimesCompressed = function(openingTimes) {
        var compressedOts = [];
        
        for (var day = 1; day <= 7; day++) {
        
            var ot = openingTimes[day === 7 ? 0 : day];
            
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
    };
    
    service.isOpen = function(openingTimes, weekDay, timeAsDate) {
        return jsCommon.openingTimesUtil.isOpen(
            openingTimes.map(function(it) { return it.interval.timeInterval }), 
            weekDay, 
            timeAsDate
        );
    };

    function OpeningTime(dayIndex, otString) {
        this.dayIndex = dayIndex;
        this.friendlyDay = i18n.enums.weekday[dayIndex + ""];
        this.friendlyDayShort = I18nService.abbreviateWeekDay(this.friendlyDay);
        this.interval = parseOpeningTimeInterval(otString);
    }
    
    function parseOpeningTimeInterval(otString) {
        var timeInterval;
        var friendly;

        if (!!otString) {
            timeInterval = parseTimeInterval(otString);
            friendly = I18nService.formatTimeInterval(timeInterval.begin, timeInterval.end); // TODO
        } else {
            timeInterval = null;
            friendly = i18n.openingTimes.isClosed;
        }

        return new OpeningTimeInterval(timeInterval, friendly);
    }

    function OpeningTimeInterval(timeInterval, friendlyString) {
        this.timeInterval = timeInterval;
        this.friendly = friendlyString;
        this.isOpen = function() { return !!timeInterval };
    }

    function parseTimeInterval(intervalString) {
        var parts = intervalString.split(" - ");
        var begin = parseTimeAsDate(parts[0])
        var end = parseTimeAsDate(parts[1])
        return new TimeInterval(begin, end);

        function parseTimeAsDate(timeString) {
            var time = jsCommon.dateUtil.parseTime(timeString);
            var date = new Date(0);
            date.setHours(time.hours, time.minutes);
            return date;
        }
    }

    function TimeInterval(beginTimeAsDate, endTimeAsDate) {
        this.begin = beginTimeAsDate;
        this.end = endTimeAsDate;
    }
    
    return {
        getOpeningTimes: function(location) {
            return service.getOpeningTimes(location);
        },
        getOpenComment: function(location) {
            return service.getOpenComment(location);
        },
        getOpeningTimeTodayFriendly: function(openingTimes) {
            return service.getOpeningTimeTodayFriendly(openingTimes);
        },
        getOpeningTimesCompressed: function(openingTimes) {
            return service.getOpeningTimesCompressed(openingTimes);
        },
        isOpen: function(openingTimes, weekDay, timeAsDate) {
            return service.isOpen(openingTimes, weekDay, timeAsDate);
        },
    };
});
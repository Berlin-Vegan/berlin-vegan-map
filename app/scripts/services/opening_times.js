"use strict";

app.factory('OpeningTimesService', function() {

    var service = {};
    var millisecondsOfADay = 24 * 60 * 60 * 1000;
    
    service.isOpen = function(openingTimes, dayOfWeek, time) {
    
        if (!openingTimes[dayOfWeek].interval.begin || !openingTimes[dayOfWeek].interval.end) {
            return false;
        }
        
        if (!time) {
            return true;
        }
        
        var date = new Date(0);
        var dayBegin = combine(date, openingTimes[dayOfWeek].interval.begin);
        var dayEnd = combine(date, openingTimes[dayOfWeek].interval.end);
        var dayTime = combine(date, time);
    
        if (dayBegin.getTime() === dayEnd.getTime()) {
            // Special case: Always open
            return true;
        }
        
        if (dayBegin > dayEnd) {
            // The day has special opening times, so adjust the end time.
            var nextDate = new Date(0);
            nextDate.setTime(nextDate.getTime() + millisecondsOfADay);
            dayEnd = combine(nextDate, openingTimes[dayOfWeek].interval.end);
        }
        
        if (dayBegin <= dayTime && dayTime < dayEnd) {
            return true;
        }
        
        // Seems to be closed so far, but maybe it is open due to 
        // special opening times on the previous day.

        var previousDayOfWeek = (dayOfWeek == 0 ? 6 : dayOfWeek - 1);
        var previousDate = new Date(0);
        previousDate.setTime(previousDate.getTime() - millisecondsOfADay);
        
        if (!openingTimes[previousDayOfWeek].interval.begin || !openingTimes[previousDayOfWeek].interval.end) {
            return false;
        }
        
        var previousDayBegin = combine(previousDate, openingTimes[previousDayOfWeek].interval.begin);
        var previousDayEnd = combine(previousDate, openingTimes[previousDayOfWeek].interval.end);
        
        if (previousDayBegin > previousDayEnd) {
        
            // Previous day indeed has special opening times, so adjust the end time.
            var previousDayEnd = combine(date, openingTimes[previousDayOfWeek].interval.end);
            
            return dayTime < previousDayEnd;
        }
        
        return false;
    };
    
    function combine(date, time) {
    
        var combined = new Date();
        
        combined.setFullYear(date.getFullYear());
        combined.setMonth(date.getMonth()); 
        combined.setDate(date.getDate());
        combined.setHours(time.getHours());
        combined.setMinutes(time.getMinutes());
        combined.setSeconds(time.getSeconds());
        combined.setMilliseconds(time.getMilliseconds());
        
        return combined;
    }
    
    return {
        isOpen: function(openingTimes, dayOfWeek, time) {
            return service.isOpen(openingTimes, dayOfWeek, time);
        }
    };
});
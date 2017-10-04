"use strict";

app.factory('OpeningTimesService', function() {

    var service = {};
    var getDateAtTime = new JsCommon().dateUtil.getDateAtTime;
    var millisecondsOfADay = 24 * 60 * 60 * 1000;
    
    service.isOpen = function(openingTimeIntervals, dayOfWeek, time) {
    
        if (!openingTimeIntervals[dayOfWeek]) {
            return false;
        }
        
        if (!time) {
            return true;
        }
        
        var date = new Date(0);
        var dayBegin = getDateAtTime(date, openingTimeIntervals[dayOfWeek].begin);
        var dayEnd = getDateAtTime(date, openingTimeIntervals[dayOfWeek].end);
        var dayTime = getDateAtTime(date, time);
    
        if (dayBegin.getTime() === dayEnd.getTime()) {
            // Special case: Always open
            return true;
        }
        
        if (dayBegin > dayEnd) {
            // The day has special opening times, so adjust the end time.
            var nextDate = new Date(0);
            nextDate.setTime(nextDate.getTime() + millisecondsOfADay);
            dayEnd = getDateAtTime(nextDate, openingTimeIntervals[dayOfWeek].end);
        }
        
        if (dayBegin <= dayTime && dayTime < dayEnd) {
            return true;
        }
        
        // Seems to be closed so far, but maybe it is open due to 
        // special opening times on the previous day.

        var previousDayOfWeek = (dayOfWeek == 0 ? 6 : dayOfWeek - 1);
        var previousDate = new Date(0);
        previousDate.setTime(previousDate.getTime() - millisecondsOfADay);
        
        if (!openingTimeIntervals[previousDayOfWeek]) {
            return false;
        }
        
        var previousDayBegin = getDateAtTime(previousDate, openingTimeIntervals[previousDayOfWeek].begin);
        var previousDayEnd = getDateAtTime(previousDate, openingTimeIntervals[previousDayOfWeek].end);
        
        if (previousDayBegin > previousDayEnd) {
        
            // Previous day indeed has special opening times, so adjust the end time.
            var previousDayEnd = getDateAtTime(date, openingTimeIntervals[previousDayOfWeek].end);
            
            return dayTime < previousDayEnd;
        }
        
        return false;
    };

    return {
        isOpen: function(openingTimeIntervals, dayOfWeek, time) {
            return service.isOpen(openingTimeIntervals, dayOfWeek, time);
        }
    };
});
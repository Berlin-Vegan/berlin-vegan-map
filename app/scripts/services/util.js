"use strict";

app.factory('UtilService', function() {

    var service = {};
    
    service.getTime = function(time) {
        
        var parts = time.split(":");
        
        if (parts.length > 2) {
            throw new Error("Not implemented support for time string: " + time);
        }
        
        var hours = parts[0] === "24" ? "0" : parts[0];
        var minutes = parts.length > 1 ? parts[1] : "0";
        
        return {
            hours: parseInt(hours), 
            minutes: parseInt(minutes), 
            seconds: 0, 
            milliseconds: 0
        };
    };
    
    service.newDate = function(date, time) {
        return new Date(date.year, date.month, date.day, time.hours, time.minutes, time.seconds, time.milliseconds);
    };

    // From https://stackoverflow.com/a/15203639
    service.isElementVisible = function(el) {
        var rect     = el.getBoundingClientRect(),
            vWidth   = window.innerWidth || doc.documentElement.clientWidth,
            vHeight  = window.innerHeight || doc.documentElement.clientHeight,
            efp      = function (x, y) { return document.elementFromPoint(x, y) };     

        // Return false if it's not in the viewport
        if (rect.right < 0 || rect.bottom < 0 
                || rect.left > vWidth || rect.top > vHeight)
            return false;

        // Return true if any of its four corners are visible
        return (
            el.contains(efp(rect.left,  rect.top))
        ||  el.contains(efp(rect.right, rect.top))
        ||  el.contains(efp(rect.right, rect.bottom))
        ||  el.contains(efp(rect.left,  rect.bottom))
        );
    }
    
    return {
        getTime: function(time) {
            return service.getTime(time);
        },
        newDate: function(date, time) {
            return service.newDate(date, time);
        },
        isElementVisible: function(el) {
            return service.isElementVisible(el);
        }
    };
});
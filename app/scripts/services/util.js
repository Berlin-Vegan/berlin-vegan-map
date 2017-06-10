"use strict";

app.factory('UtilService', function() {

    var service = {};
    
    // From http://stackoverflow.com/q/18883601/443836
    service.getDistanceFromLatLonInKm = function(lat1, lon1, lat2, lon2) {
    
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        
        return d;
    };
    
    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }
    
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
        getDistanceFromLatLonInKm: function(lat1, lon1, lat2, lon2) {
            return service.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
        },
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
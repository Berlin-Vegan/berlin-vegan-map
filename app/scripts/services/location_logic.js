"use strict";

app.factory('LocationLogicService', function() {

    var service = {};
    
    service.enhanceLocations = function(locations) {
        for (var i = 0; i < locations.length; i++) {
            enhanceLocation(locations[i]);
        }
    };
    
    function enhanceLocation(location) {
    
        location.commentWithoutFormatting = removeFormatting(location.comment);
            
        location.getOpeningTime = function(weekDay) {
        
            var otString;
            
            switch (weekDay) {
                case 0:
                    otString = this.otSun;
                    break;
                case 1:
                    otString = this.otMon;
                    break;
                case 2:
                    otString = this.otTue;
                    break;
                case 3:
                    otString = this.otWed;
                    break;
                case 4:
                    otString = this.otThu;
                    break;
                case 5:
                    otString = this.otFri;
                    break;
                case 6:
                    otString = this.otSat;
                    break;
                default:
                    alert("Illegal week day (expected 0-6): " + weekDay + " (type: " + typeof weekDay + ")");
            }
            
            return new OpeningTimes(otString);
        };
        
        location.getOpeningTimeTodayFriendly = function() {
        
            var otToday = this.getOpeningTime(new Date().getDay()).otString;
            
            if (otToday === "") {
                return "Heute geschlossen";
            } else {
                return "Heute geöffnet: " + otToday + " Uhr";
            }
        }
        
        location.isOpen = function(weekDay, timeAsDate) {
        
            if (timeAsDate) {
                return this.getOpeningTime(weekDay).isOpen(timeAsDate.getHours(), timeAsDate.getMinutes());
            } else {
                return this.getOpeningTime(weekDay).otString !== "";
            }
        }
    }
    
    function removeFormatting(locationComment) {
        return locationComment.replace(/&shy;/g, "").replace(/<br\/>/g, " ");
    }
    
    function OpeningTimes(otString) {
        
        this.otString = otString;
        
        this.isOpen = function(hourOfDay, minuteOfHour) {
        
            if (otString === "") {
                return false;
            } else {
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
                
                var dateAtSpecifiedTime = new Date(year, month, day, hourOfDay, minuteOfHour, 0, 0);
                var dateAtBeginTime = new Date(year, month, day, beginHour, beginMinute, 0, 0);
                var dateAtEndTime = new Date(year, month, day, endHour, endMinute, 0, 0);
                
                return dateAtBeginTime <= dateAtSpecifiedTime && dateAtSpecifiedTime < dateAtEndTime
            }
        }
    }
    
    return {
        enhanceLocations: function(locations) {
            return service.enhanceLocations(locations);
        }
    };
});
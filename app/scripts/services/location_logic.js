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
            
        location.getOpeningTimeToday = function() { 
        
            var currentWeekDay = new Date().getDay();
            var otString;
            
            switch (currentWeekDay) {
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
            }
            
            return otString;
        };
    }
    
    function removeFormatting(locationComment) {
        return locationComment.replace(/&shy;/g, "").replace(/<br\/>/g, " ");
    }
    
    return {
        enhanceLocations: function(locations) {
            return service.enhanceLocations(locations);
        }
    };
});
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
            
        location.getOpeningTime = function(date) { 
        
            var weekDay = date.getDay();
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
            }
            
            return new OpeningTimes(otString);
        };
        
        location.getOpeningTimeTodayFriendly = function() {
        
            var otToday = this.getOpeningTime(new Date()).otString;
            
            if (otToday === "") {
                return "Heute geschlossen";
            } else {
                return "Heute geöffnet: " + otToday + " Uhr";
            }
        }
    }
    
    function removeFormatting(locationComment) {
        return locationComment.replace(/&shy;/g, "").replace(/<br\/>/g, " ");
    }
    
    function OpeningTimes(otString) {
    
        var parts = otString.split("-");
        
        this.otString = otString;
        this.beginString = parts.length > 0 ? parts[0].trim() : "";
        this.endString = parts.length > 0 ? parts[1].trim() : "";
    }
    
    return {
        enhanceLocations: function(locations) {
            return service.enhanceLocations(locations);
        }
    };
});
"use strict";

/**
 * There have been great technical diffculties when trying to define the google.maps.InfoWindow content HTML 
 * with a proper AngularJS template. So, to at least have it in a dedicated file, we use this service.
 */
app.factory("InfoWindowViewService", function(numberFilter) {

    var extraLongHyphen = "–"; // Your editor may display this as a regular hyphen.
    var linkSymbol = "🔗"; // Your editor may not have this.
    
    var service = {};
    
    service.getContent = function(location, currentPosition) {
        return "<h4>" 
            + location.name 
            + (location.website && location.website.length > 0 ? 
                " <a target='_blank' href='" + location.website + "' title='" + location.website + "'>" + linkSymbol + "</a>" 
                : 
                ""
            ) 
            + "</h4>" 
            + "<div class='infoWindowContent'>" 
            + "<p>" + location.tags.join(", ") + " (" + location.getVeganCategoryFriendly(true) + ")</p>"
            + "<p>" + location.street + " " + location.cityCode + " " + location.district + "</p>"
            + (currentPosition ? "<p>Entfernung: " + numberFilter(location.getDistanceToPositionInKm(currentPosition), 1) + " km</p>" : "")
            + "<h5>Öffnungszeiten</h5>"
            + "<p>" + getOpeningTimesInnerHtml(location) + "</p>"
            + (location.openComment ? "<p>" + location.openComment + "</p>" : "")
            + "<p>" + (location.reviewURL && location.reviewURL.length > 0 ? "<a target='_blank' href='" + location.reviewURL + "'>Rezension</a>" : location.comment) + "</p>"
            + "</div>";
    };
    
    function getOpeningTimesInnerHtml(location) {
    
        var html = "";
        var compressedOts = location.getOpeningTimesCompressed();
        
        for (var i = 0; i < compressedOts.length; i++) {
        
            var group = compressedOts[i];
            var firstOt = group[0];
            var lastOt = group[group.length - 1];
            var days;
            var interval;
            
            if (firstOt === lastOt) {
                days = firstOt.friendlyDayShort;
                interval = firstOt.interval.friendly;
            } else {
                days = firstOt.friendlyDayShort + extraLongHyphen + lastOt.friendlyDayShort;
                interval = firstOt.interval.friendly;
            }
            
            var groupContainsToday = group.map(function(ot) { return ot.dayIndex; }).indexOf(new Date().getDay()) >= 0;
            html += "<b>" + days + ":</b> " + (groupContainsToday ? "<b>" + interval + "</b>" : interval);
            
            if (i < compressedOts.length - 1) {
                html += "<br/>";
            }
        }
        
        return html;
    }
    
    return {
        getContent: function(location, currentPosition) {
            return service.getContent(location, currentPosition);
        }
    };
});
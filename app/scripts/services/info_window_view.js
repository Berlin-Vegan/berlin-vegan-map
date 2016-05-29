"use strict";

/**
 * There have been great technical diffculties when trying to define the google.maps.InfoWindow content HTML 
 * with a proper AngularJS template. So, to at least have it in a dedicated file, we use this service.
 */
app.factory("InfoWindowViewService", function(numberFilter) {

    var service = {};
    
    service.getContent = function(location, currentPosition) {
        return "<h4>" + location.name + "</h4>" 
            + "<div class='infoWindowContent'>" 
            + "<p>" + location.tags.join(", ") + " (" + location.getVeganCategoryFriendly(true) + ")</p>"
            + "<p>" + location.street + " " + location.cityCode + " " + location.district 
            + (location.website && location.website.length > 0 ? " (<a target='_blank' href='" + location.website + "' title='" + location.website + "'>Website</a>)" : "") + "</p>"
            + (currentPosition ? "<p>Entfernung: " + numberFilter(location.getDistanceToPositionInKm(currentPosition), 1) + " km</p>" : "")
            + "<h5>Öffnungszeiten</h5>"
            + "<p>" + getOpeningTimesInnerHtml(location) + "</p>"
            + "<p>" + (location.reviewURL && location.reviewURL.length > 0 ? "<a target='_blank' href='" + location.reviewURL + "'>Rezension</a>" : location.comment) + "</p>"
            + "</div>";
    };
    
    function getOpeningTimesInnerHtml(location) {
    
        var html = "";
        var openingTimes = location.openingTimes;
        
        html+= getOpeningTimeInnerHtml(openingTimes[1]) + "<br/>";
        html+= getOpeningTimeInnerHtml(openingTimes[2]) + "<br/>";
        html+= getOpeningTimeInnerHtml(openingTimes[3]) + "<br/>";
        html+= getOpeningTimeInnerHtml(openingTimes[4]) + "<br/>";
        html+= getOpeningTimeInnerHtml(openingTimes[5]) + "<br/>";
        html+= getOpeningTimeInnerHtml(openingTimes[6]) + "<br/>";
        html+= getOpeningTimeInnerHtml(openingTimes[0]);
        
        return html;
    }
    
    function getOpeningTimeInnerHtml(openingTime) {
        return "<b>" + openingTime.friendlyDayShort + ":</b> " + openingTime.interval.friendly;
    }
    
    return {
        getContent: function(location, currentPosition) {
            return service.getContent(location, currentPosition);
        }
    };
});
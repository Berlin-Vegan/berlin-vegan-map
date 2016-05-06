"use strict";

app.filter('location', function(filterFilter) {

    return function(locations, query) {

        var locationPattern = {};

        if (query.textAppliesToAllFields) {
            locationPattern.$ = query.text;
        } else {
            locationPattern.name = query.text;
        }

        if (!query.allDistricts()) {
            locationPattern.district = query.district;
        }

        if (query.completelyVegan) {
            locationPattern.vegan = "5"; // TODO: Check if equivalent to legacy app's "not 2 and not 4".
        }
        
        if (query.organic) {
            locationPattern.organic = "1";
        }
        
        if (query.glutenFree) {
            locationPattern.glutenFree = "1";
        }
        
        if (query.handicappedAccessible) {
            locationPattern.handicappedAccessible = "1";
        }
        
        if (query.handicappedAccessibleWc) {
            locationPattern.handicappedAccessibleWc = "1";
        }
        
        if (query.organic) {
            locationPattern.organic = "1";
        }
        
        if (query.organic) {
            locationPattern.organic = "1";
        }
        
        if (query.dog) {
            locationPattern.dog = "1";
        }

        if (query.wlan) {
            locationPattern.wlan = "1";
        }
        
        if (query.catering) {
            locationPattern.catering = "1";
        }
        
        if (query.delivery) {
            locationPattern.delivery = "1";
        }

        var filterFunction = function(location, index, array) {

            if (!query.allWeekDays()) {
                return location.isOpen(parseInt(query.openAtWeekDay), query.openAtTime);
            } else {
                return true;
            }
        };
        
        var filterFunction2 = function(location, index, array) {

            if (query.distance.enabled) {            
                return getDistanceFromLatLonInKm(
                    query.distance.position.lat(), 
                    query.distance.position.lng(), 
                    parseFloat(location.latCoord), 
                    parseFloat(location.longCoord)
                ) <= query.distance.km;
            } else {
                return true;
            }
        };

        var filteredLocations = filterFilter(locations, locationPattern);
        filteredLocations = filterFilter(filteredLocations, filterFunction); 
        filteredLocations = filterFilter(filteredLocations, filterFunction2); 
        return filteredLocations;
    };
    
    // From http://stackoverflow.com/q/18883601/443836
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    
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
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }
});
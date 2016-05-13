"use strict";

app.filter('location', function(filterFilter) {

    return function(locations, query) {

        var locationPattern = {};

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
                return location.getDistanceToPositionInKm(query.distance.position) <= query.distance.km;
            } else {
                return true;
            }
        };
        
        var filterFunction3 = function(location, index, array) {

            var searchedValues = [location.name];
            
            if (query.textAppliesToAllFields) {
                searchedValues = searchedValues.concat([
                    location.street,
                    location.cityCode,
                    location.district,
                    location.bvg,
                    location.telephone,
                    location.website,
                    location.email,
                    location.commentWithoutFormatting
                ]);
                
                searchedValues = searchedValues.concat(location.tags);
            }
            return searchedValues.some(function(property) { 
                return normalizeText(property).contains(normalizeText(query.text));
            });
        };
        
        var filterFunction4 = function(location, index, array) {

            if (!query.allTags()) {            
                return location.tags.indexOf(query.tag) >= 0;
            } else {
                return true;
            }
        };

        var filteredLocations = filterFilter(locations, locationPattern);
        filteredLocations = filterFilter(filteredLocations, filterFunction);
        filteredLocations = filterFilter(filteredLocations, filterFunction2);
        filteredLocations = filterFilter(filteredLocations, filterFunction3);
        filteredLocations = filterFilter(filteredLocations, filterFunction4);
        return filteredLocations;
    };
    
    function normalizeText(text) {
    
        if (typeof text === "undefined") {
            text = "";
        }
        
        if (!(text === 'string' || text instanceof String)) {
            text+= "";
        }
        
        // So we find café when searching for cafe and vice versa
        text = text.replace("é", "e");
        
        return text.toLowerCase();
    }
});
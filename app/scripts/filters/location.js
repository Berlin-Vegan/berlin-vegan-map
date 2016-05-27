"use strict";

app.filter('location', function(filterFilter) {

    return function(locations, query) {

        var locationPattern = {};

        if (!query.allDistricts()) {
            locationPattern.district = query.district;
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
            
            if (!query.textAppliesToNamesOnly) {
                searchedValues = searchedValues.concat([
                    location.street,
                    location.cityCode,
                    location.district,
                    location.publicTransport,
                    location.telephone,
                    location.website,
                    location.email,
                    location.commentWithoutFormatting
                ]);
                
                searchedValues = searchedValues.concat(location.tags);
            }
            return searchedValues.some(function(property) { 
                return normalizeText(property).includes(normalizeText(query.text));
            });
        };
        
        var filterFunction4 = function(location, index, array) {

            for (var tag in query.tags) {
                if (query.tags.hasOwnProperty(tag) && query.tags[tag]) { // Tag is selected...
                    if (location.tags.indexOf(tag) >= 0) { // ... and location has tag
                        return true;
                    }
                }
            }
            
            return false;
        };
        
        var filterFunction5 = function(location, index, array) {

            for (var veganCategory in query.veganCategories) {
                if (query.veganCategories.hasOwnProperty(veganCategory) && query.veganCategories[veganCategory]) { // Vegan category is selected...
                    if (location.getVeganCategoryFriendly() === veganCategory) { // ... and location belongs to it
                        return true;
                    }
                }
            }
            
            return false;
        };

        var filteredLocations = filterFilter(locations, locationPattern);
        filteredLocations = filterFilter(filteredLocations, filterFunction);
        filteredLocations = filterFilter(filteredLocations, filterFunction2);
        filteredLocations = filterFilter(filteredLocations, filterFunction3);
        filteredLocations = filterFilter(filteredLocations, filterFunction4);
        filteredLocations = filterFilter(filteredLocations, filterFunction5);
        return filteredLocations;
    };
    
    function normalizeText(text) {
    
        if (typeof text === "undefined") {
            text = "";
        }
        
        if (!(text === 'string' || text instanceof String)) {
            text+= "";
        }
        
        // So we find café when searching for cafe and vice versa.
        // Analogous motivation for the other letters.
        text = text.replace(/é/g, "e").replace(/á/g, "a").replace(/à/g, "a").replace(/ñ/g, "n");
        
        return text.toLowerCase();
    }
});
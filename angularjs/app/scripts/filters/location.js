"use strict";

app.filter('location', function(I18nService) {

    return function(locations, query) {

        var filter0 = function(location) {
            return (!query.organic || location.organic === 1)
              && (!query.glutenFree || location.glutenFree === 1)
              && (!query.dog || location.dog === 1)
              && (!query.childChair || location.childChair === 1)
              && (!query.handicappedAccessible || location.handicappedAccessible === 1)
              && (!query.handicappedAccessibleWc || location.handicappedAccessibleWc === 1)
              && (!query.delivery || location.delivery === 1)
              && (!query.catering || location.catering === 1)
              && (!query.wlan || location.wlan === 1);
        }

        var filter1 = function(location) {

            if (query.openNow) {
                var now = new Date(Date.now());
                return location.openingTimes.isOpen(now.getDay(), now);
            } else if (!query.allWeekDays()) {
                return location.openingTimes.isOpen(parseInt(query.openAtWeekDay), query.openAtTime);
            } else {
                return true;
            }
        };

        var filter2 = function(location) {

            if (query.distance.enabled) {
                return location.getDistanceToPositionInKm(query.distance.position) <= query.distance.km;
            } else {
                return true;
            }
        };

        var filter3 = function(location) {

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
                    (I18nService.getLanguage() === "en" ?
                        location.commentEnglishWithoutFormatting
                        :
                        location.commentWithoutFormatting
                    )
                ]);

                searchedValues = searchedValues.concat(location.tags);
            }
            return searchedValues.some(function(property) {
                return normalizeText(property).includes(normalizeText(query.text));
            });
        };

        var filter4 = function(location) {

            for (var tag in query.tags) {
                if (query.tags.hasOwnProperty(tag) && query.tags[tag]) { // Tag is selected...
                    if (location.tags.indexOf(tag) >= 0) { // ... and location has tag
                        return true;
                    }
                }
            }

            return false;
        };

        var filter5 = function(location) {

            for (var veganCategory in query.veganCategories) {
                if (query.veganCategories.hasOwnProperty(veganCategory) && query.veganCategories[veganCategory]) { // Vegan category is selected...
                    if (location.getVeganCategory() === veganCategory) { // ... and location belongs to it
                        return true;
                    }
                }
            }

            return false;
        };

        var filter6 = function(location) {
            return !query.review || location.reviewURL;
        }

        var filteredLocations = [];

        for (var i = 0; i < locations.length; i++) {
            var location = locations[i];
            if (
                filter0(location)
                && filter1(location)
                && filter2(location)
                && filter3(location)
                && filter4(location)
                && filter5(location)
                && filter6(location)
            ) {
                filteredLocations.push(location);
            }
        }

        return filteredLocations;
    };

    function normalizeText(text) {

        if (typeof text === "undefined") {
            text = "";
        }

        if (!(text === 'string' || text instanceof String)) {
            text += "";
        }

        // So we find café when searching for cafe and vice versa.
        // Analogous motivation for the other letters.
        text = text
            .replace(/á|â|à/g, "a")
            .replace(/é|ê/g, "e")
            .replace(/ó|ô/g, "o")
            .replace(/ñ/g, "n");

        return text.toLowerCase();
    }
});

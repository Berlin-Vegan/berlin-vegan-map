"use strict";

app.factory('SearchService', function(I18nService) {

    function isResult(location, query) {

        var filter0 = function() {
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

        var filter1 = function() {

            if (query.openNow) {
                var now = new Date(Date.now());
                return location.openingTimes.isOpen(now.getDay(), now);
            } else if (!query.allWeekDays()) {
                return location.openingTimes.isOpen(parseInt(query.openAtWeekDay), query.openAtTime);
            } else {
                return true;
            }
        };

        var filter2 = function() {

            if (query.distance.enabled) {
                return location.getDistanceToPositionInKm(query.distance.position) <= query.distance.km;
            } else {
                return true;
            }
        };

        var filter3 = function() {

            var searchedValues = [location.name];

            if (!query.textAppliesToNamesOnly) {
                searchedValues = searchedValues.concat([
                    location.street,
                    location.cityCode + "",
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

        var filter4 = function() {

            for (var tag in query.tags) {
                if (query.tags.hasOwnProperty(tag) && query.tags[tag]) { // Tag is selected...
                    if (location.tags.indexOf(tag) >= 0) { // ... and location has tag
                        return true;
                    }
                }
            }

            return false;
        };

        var filter5 = function() {

            for (var veganCategory in query.veganCategories) {
                if (query.veganCategories.hasOwnProperty(veganCategory) && query.veganCategories[veganCategory]) { // Vegan category is selected...
                    if (location.getVeganCategory() === veganCategory) { // ... and location belongs to it
                        return true;
                    }
                }
            }

            return false;
        };

        var filter6 = function() {
            return !query.review || location.reviewURL;
        }

        return !!location
            && filter0()
            && filter1()
            && filter2()
            && filter3()
            && filter4()
            && filter5()
            && filter6();
    };

    function normalizeText(text) {

        if (!text) {
            text = "";
        }

        // So we find café when searching for cafe and vice versa.
        // Analogous motivation for the other letters.
        return text
            .replace(/á|â|à/g, "a")
            .replace(/é|ê/g, "e")
            .replace(/ó|ô/g, "o")
            .replace(/ñ/g, "n")
            .toLowerCase();
    }

    return {
        isResult: function(location, query) {
            return isResult(location, query);
        }
    }
});

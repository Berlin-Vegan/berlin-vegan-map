'use strict';

/**
 * @ngdoc function
 * @name berlinVeganMapApp.controller:MainController
 * @description
 * # MainController
 * Controller of the berlinVeganMapApp
 */
app.controller('MainController', function ($scope, $http, $timeout, LocationCleansingService, LocationLogicService, InfoWindowViewService, filterFilter, locationFilter) {

    var debugMode = false; // TODO: Set something like that depending on build.
    var allDistricts = "Alle Bezirke";
    var allWeekDays = "Alle Wochentage";
    var locationsUrl = debugMode ? "assets/GastroLocations_2016-05-26_formatted.json" : "/app/data/GastroLocations.json";

    $scope.display = { search: "simple" };
    $scope.query = null;
    $scope.locations = null;
    $scope.districts = null;
    $scope.tags = null;
    $scope.friendlyDayStrings = null;
    $scope.veganCategories = null;
    $scope.geolocation = { show: false, supported: navigator.geolocation ? true : false };
    $scope.orderSelection = "Name";

    $http({method: 'GET', url: locationsUrl})
        .success(function(data, status, headers, config) {
            $scope.locations = data;
            LocationCleansingService.cleanLocations($scope.locations);
            LocationLogicService.enhanceLocations($scope.locations);
            initQuery();
            initMap();
            initDistricts();
            initTags();
            initVeganCategories();
            initFriendlyDayStrings();
            updateMarkers();
            updateOrder();
        })
        .error(function(data, status, headers, config) {
        });

    $scope.updateMarkers = updateMarkers;
    $scope.updateGeolocationMarker = updateGeolocationMarker;
    $scope.updateOrder = updateOrder;

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (location){
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(location.latCoord, location.longCoord),
            title: location.name,
            location: location,
            icon: getMarkerImage(location)
        });

        google.maps.event.addListener(marker, 'click', function() {

            var content;

            if ($scope.geolocation.marker) {
                content = InfoWindowViewService.getContent(marker.location, $scope.geolocation.marker.position);
            } else {
                content = InfoWindowViewService.getContent(marker.location);
            }

            infoWindow.setContent(content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
    }
    
    function getMarkerImage(location) {
        var url;
        switch (location.vegan) {
            case 2:
                url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
                break;
            case 4:
                url = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
                break;
            case 5:
                url = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
                break;
            default:
                throw new Error("Unexpected value for location.vegan: " + location.vegan);
        }
        return new google.maps.MarkerImage(
            url,
            new google.maps.Size(50, 50),
            new google.maps.Point(0,0),
            new google.maps.Point(15, 34)
        );
    }

    function initQuery() {

        var tags = LocationLogicService.getSortedTags($scope.locations);
        var tagsMap = {};

        for (var i = 0; i < tags.length; i++) {
            tagsMap[tags[i]] = true;
        }

        var veganCategories = LocationLogicService.getSortedVeganCategories();
        var veganCategoriesMap = {};

        for (var i = 0; i < veganCategories.length; i++) {
            veganCategoriesMap[veganCategories[i]] = true;
        }

        $scope.query = {
            text: "",
            district: allDistricts,
            openAtWeekDay: allWeekDays,
            tags: tagsMap,
            veganCategories: veganCategoriesMap,
            allDistricts: function() { return this.district === allDistricts; },
            allWeekDays: function() { return this.openAtWeekDay === allWeekDays; },
            distance: { enabled: false, position: null, km: 1}
        };
    }

    function initMap() {

        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(52.5200070,13.4049540),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.markers = [];

        for (var i = 0; i < $scope.locations.length; i++){
            createMarker($scope.locations[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };
    }

    function updateMarkers() {

        $scope.filteredMarkers = getFilteredMarkers();

        for (var i = 0; i < $scope.markers.length; i++) {

            var marker = $scope.markers[i];

            if (marker !== $scope.geolocation.marker){
                if ($scope.filteredMarkers.indexOf(marker) >= 0) {
                    marker.setMap($scope.map);
                } else {
                    marker.setMap(null);
                }
            }
        }
    }

    function getFilteredMarkers() {

        var locations =
            filterFilter(
                $scope.markers,
                function(marker, index, array) {
                    return typeof marker.location !== "undefined";
                }
            ).map(function(marker) { return marker.location; });

        var filteredLocations = locationFilter(locations, $scope.query);

        return filterFilter(
            $scope.markers,
            function(marker, index, array) {
                return filteredLocations.indexOf(marker.location) >= 0;
            }
        );
    }

    function initDistricts() {
        $scope.districts = LocationLogicService.getSortedDistricts($scope.locations);
        $scope.districts.unshift(allDistricts);
    }

    function initTags() {
        $scope.tags = LocationLogicService.getSortedTags($scope.locations);
    }

    function initVeganCategories() {
        $scope.veganCategories = LocationLogicService.getSortedVeganCategories();
    }

    function initFriendlyDayStrings() {
        $scope.friendlyDayStrings = LocationLogicService.getFriendlyDayStrings();
    }

    function updateGeolocationMarker() {

        if ($scope.geolocation.show) {

            if (!navigator.geolocation) {
                alert("Unerwartete Bedingung");
            }

            // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=675533
            $timeout(
                function() {
                    if ($scope.geolocation.info === "Ermittle Standort...") {
                        $scope.geolocation.error = "Standortzugriff nicht möglich";
                        $scope.geolocation.info = "";
                    }
                },
                debugMode ? 8000 : 16000
            );

            $scope.geolocation.info = "Ermittle Standort...";
            $scope.geolocation.error = "";

            var options = {
                enableHighAccuracy: true,
                timeout: debugMode ? 5000 : 15000
                //maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    $scope.$apply(function() {
                        var marker = new google.maps.Marker({
                            map: $scope.map,
                            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                            title: "Aktueller Standort",
                            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        });

                        google.maps.event.addListener(marker, 'click', function(){
                            $scope.map.setCenter(marker.getPosition());
                            infoWindow.setContent('<h2>' + marker.title + '</h2>');
                            infoWindow.open($scope.map, marker);
                        });

                        $scope.markers.push(marker);
                        $scope.geolocation.marker = marker;
                        $scope.geolocation.info = "";
                        $scope.geolocation.error = "";
                        $scope.query.distance.position = marker.position;

                        google.maps.event.trigger(marker, 'click');
                    });
                },
                function(positionError) {

                    $scope.$apply(function() {

                        var reason;

                        switch (positionError.code)
                        {
                            case 1://PositionError.PERMISSION_DENIED:
                                reason = "Zugriff verweigert";
                                break;
                            case 2: //PositionError.POSITION_UNAVAILABLE:
                                reason = "Standort nicht verfügbar";
                                break;
                            case 3: //PositionError.TIMEOUT:
                                reason = "Zeitüberschreitung";
                                break;
                        }

                        $scope.geolocation.info = "";
                        $scope.geolocation.error = "Standortzugriff nicht möglich: " + reason;
                    });
                },
                options
            );
        } else {
            $scope.geolocation.info = "";
            $scope.geolocation.error = "";
            $scope.geolocation.marker.setMap(null);
            // TODO: This is a potential memory leak. Better delete the marker.

            if ($scope.query.distance.enabled) {
                $scope.query.distance.enabled = false;
                $scope.updateMarkers();
            }

            $scope.query.distance.position = null;
        }
    }

    function updateOrder() {

        var order;

        switch ($scope.orderSelection) {
            case "Name":
                order = "location.name";
                break;
            case "Entfernung":
                order = function(marker) {
                    if ($scope.geolocation.marker && $scope.geolocation.marker.map) {
                        return marker.location.getDistanceToPositionInKm($scope.geolocation.marker.position);
                    } else {
                        return 1;
                    }
                };
                break;
            default:
                console.log("Unerwarteter Wert für orderSelection: " + $scope.orderSelection); // TODO
        }

        $scope.order = order;
    }
});

'use strict';

/**
 * @ngdoc function
 * @name berlinVeganMapApp.controller:MainController
 * @description
 * # MainController
 * Controller of the berlinVeganMapApp
 */
app.controller('MainController', function (
    $scope, 
    $http, 
    $timeout, 
    $window, 
    ConfigurationService,
    LocationLogicService, 
    InfoWindowViewService, 
    ResourcesService,
    I18nService,
    SearchService
) {
    var jsCommon = new JsCommon();

    $scope.query = null;
    $scope.locations = null;
    $scope.tags = null;
    $scope.veganCategories = null;
    $scope.geolocation = { show: false, supported: navigator.geolocation ? true : false };
    $scope.orderSelection = "name";
    $scope.language = I18nService.getLanguage();;
    $scope.i18n = I18nService.getI18n();
    $scope.setLanguage = function(event, language) {
        event.preventDefault();
        I18nService.setLanguage(language);
    }
    $scope.fullMapView = false;
    $scope.enableFullMapView = function() {
        $scope.fullMapView = true;
        $timeout(function() { google.maps.event.trigger($scope.map, "resize"); });
    }
    $scope.disableFullMapView = function() {
        $scope.fullMapView = false;
    }
    $scope.scrollSearchIntoView = function() {
        if ($scope.fullMapView)
        {
            $scope.disableFullMapView();
        }
        $timeout(function() { $window.document.getElementById("pre-search-div").scrollIntoView(); });
    }
    $scope.formatTags = function(tags) {
        return tags.map(function(it) { return $scope.i18n.enums.tag[it]; }).join(", ");
    }

    // Adapted (but changed) from https://code.angularjs.org/1.5.7/docs/api/ng/filter/orderBy
    $scope.localeSensitiveComparator = function(v1, v2) {
        
        if (v1.type !== 'string' || v2.type !== 'string') {
            if (v1.value < v2.value) {
                return -1;
            } else if (v1.value > v2.value) {
                return 1;
            } else {
                return 0;
            }
        }

        return v1.value.localeCompare(v2.value, global_language);
    };

    $scope.getMarkerImageUrl = getMarkerImageUrl;
    $scope.getColor = ConfigurationService.getColor;

    $http({ method: 'GET', url: ConfigurationService.locationsUrl })
        .success(function(data) {
            $scope.locations = data;
            LocationLogicService.enhanceLocations($scope.locations);
            initQuery();
            initMap();
            initTags();
            initVeganCategories();
            updateMarkers();
            updateOrder();
        })
        .error(function() {
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

            var content = InfoWindowViewService.getContent(
                $scope.i18n, 
                $scope.language, 
                marker.location, 
                $scope.geolocation.marker ? $scope.geolocation.marker.position : undefined);

            infoWindow.setContent(content);
            infoWindow.open($scope.map, marker);

            var locationElement = $window.document.getElementById(marker.location.id);

            if (!jsCommon.domUtil.isElementVisible(locationElement)) {
                locationElement.scrollIntoView();
            }
        });

        $scope.markers.push(marker);
    }
    
    function getMarkerImage(location) {
        return new google.maps.MarkerImage(
            getMarkerImageUrl(location),
            new google.maps.Size(50, 50),
            new google.maps.Point(0,0),
            new google.maps.Point(15, 34)
        );
    }

    function getMarkerImageUrl(location) {
        return ResourcesService.getDotImageUrl(ConfigurationService.getColor(location.getVeganCategory()));
    }

    function initQuery() {

        var tags = LocationLogicService.getSortedTags();
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
            openAtWeekDay: "all",
            tags: tagsMap,
            veganCategories: veganCategoriesMap,
            allWeekDays: function() { return this.openAtWeekDay === "all"; },
            distance: { enabled: false, position: null, km: 1}
        };
    }

    function initMap() {
        var center = ConfigurationService.mapCenter;
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(center.lat, center.lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.markers = [];

        for (var i = 0; i < $scope.locations.length; i++){
            createMarker($scope.locations[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            if (!window.matchMedia("(min-width: 568px)").matches) {
                $scope.enableFullMapView();
            }
            $timeout(function() { google.maps.event.trigger(selectedMarker, 'click'); });
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

    Array.prototype.workaroundFilter = Array.prototype.filter;

    function getFilteredMarkers() {
        return $scope.markers
          .workaroundFilter(function(marker) { return SearchService.isResult(marker.location, $scope.query); });
    }

    function initTags() {
        $scope.tags = LocationLogicService.getSortedTags();
    }

    function initVeganCategories() {
        $scope.veganCategories = LocationLogicService.getSortedVeganCategories();
    }

    function updateGeolocationMarker() {

        if ($scope.geolocation.show) {

            if (!navigator.geolocation) {
                alert("Unerwartete Bedingung");
            }

            // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=675533
            $timeout(
                function() {
                    if ($scope.geolocation.info === $scope.i18n.geolocation.detecting) {
                        $scope.geolocation.error = $scope.i18n.geolocation.theError;
                        $scope.geolocation.info = "";
                    }
                },
                ConfigurationService.geoLocationFirefoxWorkaroundTimeoutMillis
            );

            $scope.geolocation.info = $scope.i18n.geolocation.detecting;
            $scope.geolocation.error = "";

            var options = {
                enableHighAccuracy: true,
                timeout: ConfigurationService.geoLocationTimeoutMillis
                //maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    $scope.$apply(function() {
                        var marker = new google.maps.Marker({
                            map: $scope.map,
                            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                            title: $scope.i18n.geolocation.currentLocation,
                            icon: ResourcesService.getDotImageUrl("blue")
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
                                reason = i18n.geolocation.PERMISSION_DENIED;
                                break;
                            case 2: //PositionError.POSITION_UNAVAILABLE:
                                reason = i18n.geolocation.POSITION_UNAVAILABLE;
                                break;
                            case 3: //PositionError.TIMEOUT:
                                reason = i18n.geolocation.TIMEOUT;
                                break;
                        }

                        $scope.geolocation.info = "";
                        $scope.geolocation.error = i18n.geolocation.theError + ": " + reason;
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
            case "name":
                order = "location.name";
                break;
            case "distance":
                order = function(marker) {
                    if ($scope.geolocation.marker && $scope.geolocation.marker.map) {
                        return marker.location.getDistanceToPositionInKm($scope.geolocation.marker.position);
                    } else {
                        return 1;
                    }
                };
                break;
            default:
                console.log("Unexpected value for orderSelection: " + $scope.orderSelection); // TODO
        }

        $scope.order = order;
    }
});
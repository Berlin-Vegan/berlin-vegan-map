'use strict';

/**
 * @ngdoc function
 * @name berlinVeganMapApp.controller:MainController
 * @description
 * # MainController
 * Controller of the berlinVeganMapApp
 */
app.controller('MainController', function ($scope, $http, $timeout, LocationLogicService, filterFilter, locationFilter) {
  
    var debugMode = false;
    var allDistricts = "Alle Bezirke";
    var allWeekDays = "Alle Wochentage";
    
    $scope.search = { 
        text: "", 
        district: allDistricts, 
        openAtWeekDay: allWeekDays, 
        allDistricts: function() { return this.district === allDistricts; }, 
        allWeekDays: function() { return this.openAtWeekDay === allWeekDays; }
    };
    
    $scope.locations = null;
    $scope.districts = null;
    $scope.geolocation = { show: false, supported: navigator.geolocation ? true : false };
    
    $http({method: 'GET', url: 'assets/Locations.json'})
        .success(function(data, status, headers, config) {
            $scope.locations = data;
            LocationLogicService.enhanceLocations($scope.locations);
            initMap();
            initDistricts();
            updateMarkers();
        })
        .error(function(data, status, headers, config) {
        });

    $scope.updateMarkers = updateMarkers;
    $scope.updateGeolocationMarker = updateGeolocationMarker;
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (location){
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(location.latCoord, location.longCoord),
            title: location.name,
            location: location
        });

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + getContent(marker.location));
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
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

        var filteredLocations = locationFilter(locations, $scope.search);

        return filterFilter(
            $scope.markers, 
            function(marker, index, array) { 
                return filteredLocations.indexOf(marker.location) >= 0;
            }
        );
    }
    
    function initDistricts() {
    
        $scope.districts = [];
        var districtSet = {};
        
        for (var i = 0; i < $scope.locations.length; i++) {
            districtSet[$scope.locations[i].district] = "";
        }
        
        for (var district in districtSet) {
            $scope.districts.push(district);
        }
        
        $scope.districts.sort();
        $scope.districts.unshift(allDistricts);
    }
    
    function getContent(location) {
        return '<div class="infoWindowContent">' + location.comment + '</div>';
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
                            label: "X" // TODO: Another image
                        });
                        
                        google.maps.event.addListener(marker, 'click', function(){
                            infoWindow.setContent('<h2>' + marker.title + '</h2>');
                            infoWindow.open($scope.map, marker);
                        });

                        $scope.markers.push(marker);
                        $scope.geolocation.marker = marker;
                        $scope.geolocation.info = "";
                        $scope.geolocation.error = "";
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
        }
    }
});

'use strict';

/**
 * @ngdoc function
 * @name berlinVeganMapApp.controller:MainController
 * @description
 * # MainController
 * Controller of the berlinVeganMapApp
 */
angular.module('berlinVeganMapApp')
  .controller('MainController', function ($scope, $http, filterFilter) {
  
    $scope.search = {};
    $scope.locations = null;
    
    $http({method: 'GET', url: 'assets/Locations.json'})
      .success(function(data, status, headers, config) {
        $scope.locations=data;
        initMap();
        updateMarkers();
      })
      .error(function(data, status, headers, config) {
      });

    $scope.updateMarkers = updateMarkers;
    
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
      }
    }
    
    function updateMarkers() {
      $scope.filteredMarkers = getFilteredMarkers();
      
      for (var i = 0; i < $scope.markers.length; i++){
        var marker = $scope.markers[i];
        
        if ($scope.filteredMarkers.indexOf(marker) >= 0) {
          marker.setMap($scope.map);
        } else {
          marker.setMap(null);
        }
      }
    }
    
    function getFilteredMarkers() {
    
      var locationPattern = {};
      
      if (typeof $scope.search.text === "undefined") {
          $scope.search.text = "";
      }
      
      if ($scope.search.textAppliesToAllFields) {
        locationPattern.$ = $scope.search.text;
      } else {
        locationPattern.name = $scope.search.text;
      }
      
      if ($scope.search.organic) {
        locationPattern.organic = "1";
      }
      
      if ($scope.search.glutenFree) {
        locationPattern.glutenFree = "1";
      }
      
      if ($scope.search.handicappedAccessible) {
        locationPattern.handicappedAccessible = "1";
      }
      
      if ($scope.search.handicappedAccessibleWc) {
        locationPattern.handicappedAccessibleWc = "1";
      }
      
      if ($scope.search.organic) {
        locationPattern.organic = "1";
      }
      
      if ($scope.search.organic) {
        locationPattern.organic = "1";
      }
      
      if ($scope.search.dog) {
        locationPattern.dog = "1";
      }
      
      if ($scope.search.wlan) {
        locationPattern.wlan = "1";
      }
      
      if ($scope.search.catering) {
        locationPattern.catering = "1";
      }
      
      if ($scope.search.delivery) {
        locationPattern.delivery = "1";
      }
      
      if ($scope.search.seatsOutdoor) {
        locationPattern.seatsOutdoor = "1";
      }
      
      if ($scope.search.seatsIndoor) {
        locationPattern.seatsIndoor = "1";
      }
      
      return filterFilter($scope.markers, { location: locationPattern });
    }
    
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
    
    function getContent(location) {
      return '<div class="infoWindowContent">' + location.comment + '</div>';
    }
  });

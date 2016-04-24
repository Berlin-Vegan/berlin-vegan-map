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
  
    var allDistricts = "Alle Bezirke";
    $scope.search = { text: "", district: allDistricts };
    $scope.locations = null;
    $scope.districts = null;
    
    $http({method: 'GET', url: 'assets/Locations.json'})
      .success(function(data, status, headers, config) {
        $scope.locations=data;
        editLocations();
        initMap();
        initDistricts();
        updateMarkers();
      })
      .error(function(data, status, headers, config) {
      });

    $scope.updateMarkers = updateMarkers;

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
    
    function editLocations() {
      for (var i = 0; i < $scope.locations.length; i++){
        $scope.locations[i].commentWithoutFormatting = removeFormatting($scope.locations[i].comment);
      }
    }
    
    function removeFormatting(locationComment) {
      return locationComment.replace(/&shy;/g, "").replace(/<br\/>/g, " ");
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
 
      if ($scope.search.textAppliesToAllFields) {
        locationPattern.$ = $scope.search.text;
      } else {
        locationPattern.name = $scope.search.text;
      }
      
      if ($scope.search.district !== allDistricts) {
        locationPattern.district = $scope.search.district;
      }
      
      if ($scope.search.completelyVegan) {
        locationPattern.vegan = "5"; // TODO: Check if equivalent to legacy app's "not 2 and not 4".
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
      
      return filterFilter($scope.markers, { location: locationPattern });
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
  });

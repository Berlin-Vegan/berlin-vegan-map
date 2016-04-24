'use strict';

/**
 * @ngdoc function
 * @name berlinVeganMapApp.controller:MainController
 * @description
 * # MainController
 * Controller of the berlinVeganMapApp
 */
angular.module('berlinVeganMapApp')
  .controller('MainController', function ($scope, $http) {
  
    $scope.locations = null;
    
    $http({method: 'GET', url: 'assets/Locations.json'})
      .success(function(data, status, headers, config) {
        $scope.locations=data;
        initMap()
      })
      .error(function(data, status, headers, config) {
      });

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

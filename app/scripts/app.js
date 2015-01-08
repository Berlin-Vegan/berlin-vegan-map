'use strict';

/**
 * @ngdoc overview
 * @name berlinVeganMapApp
 * @description
 * # berlinVeganMapApp
 *
 * Main module of the application.
 */
angular
  .module('berlinVeganMapApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

'use strict';

/**
 * @ngdoc overview
 * @name berlinVeganMapApp
 * @description
 * # berlinVeganMapApp
 *
 * Main module of the application.
 */
var app = angular.module('berlinVeganMapApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

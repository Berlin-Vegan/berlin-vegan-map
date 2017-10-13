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

/*
 * From http://stackoverflow.com/a/18096071/443836
 * TODO: Move to some library
 */
app.filter('cut', function () {
    return function (value, wordwise, max, tail) {
    
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
              //Also remove . and , so its gives a cleaner result.
              if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                  lastspace = lastspace - 1;
              }
              value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});

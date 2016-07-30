/**
 * Created by dor on 22/04/2016.
 */


var app = angular.module('planner', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/demographics', {
            templateUrl: 'pages/demographics.html',
            controller: 'demoCtrl'
        }).when('/instructions', {
            templateUrl: 'pages/Instructions.html',
            controller: 'insCtrl'
        }).when('/exp', {
            templateUrl: 'pages/experiment.html',
            controller: 'expCtrl'
        }).when('/train', {
            templateUrl: 'pages/trainning.html',
            controller: 'trainCtrl'
        }).when('/quiz', {
            templateUrl: 'pages/quiz.html',
            controller: 'quizCtrl'
        }).when('/end', {
            templateUrl: 'pages/end.html',
            controller: 'endCtrl'
        }).when('/consent', {
            templateUrl: 'pages/consent.html',
            controller: 'consentCtrl'
        })
            .when('/calibration', {
                templateUrl: 'pages/calibration.html',
                controller: 'calCtrl'
            }).when('/calibrationResult', {
                templateUrl: 'pages/calibrationResults.html',
                controller: 'calRasCtrl'
            })
            .when('/calibration2', {
                templateUrl: 'pages/calibration2.html',
                controller: 'cal2Ctrl'
            }).when('/calibrationResult2', {
                templateUrl: 'pages/calibrationResults2.html',
                controller: 'cal2RasCtrl'
        }).when('/payments', {
                templateUrl: 'pages/payments.html',
                controller: 'payCtrl'
            })
            .otherwise({
            redirectTo: '/'

        });
    }]);

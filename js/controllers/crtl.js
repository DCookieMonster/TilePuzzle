/**
 * Created by dor on 22/04/2016.
 */


app.controller("demoCtrl", ["$scope", "$rootScope",
    function ($scope, $rootScope) {
        $rootScope.user = {
            'age': 0,
            'gender': "",
            'education': ""
        };
        $rootScope.numberOftimeInQuiz = 1;

        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };
        //$rootScope.userInfo=$scope.user;
        $scope.ok = function () {
            $scope.changeRoute('#/instructions');
        }

    }]);

app.controller("endCtrl", ["$scope", "$rootScope", "$http",
    function ($scope, $rootScope, $http) {
        $scope.randString = function (x) {

            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < x; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;

        };


        $scope.init = function () {
            $rootScope.user["userId"] = $scope.randString(10);

            $http({
                method: 'POST',
                //url: 'http://localhost:5000/json',
                //url: 'http://q2a.ise.bgu.ac.il:5000/json',
                url: 'http://datasciencelab.ise.bgu.ac.il:5000/json',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($rootScope.user)
            }).then(function(response) {
                console.log("posted successfully");
                $scope.userCode = $rootScope.user["userId"];


            }, function(response) {
                console.error["error in posting"];
                console.error[response];
                $scope.userCode = "There was an error with the communication, please write this at the comment section" +
                    "on the HIT page" +
                    ".\nError: "+response.status;


            })
        };
        $scope.init();




    }]);

app.controller("insCtrl", ["$scope", "$rootScope",
    function ($scope, $rootScope) {
        var start = new Date();
        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };

        //$scope.userInfo=$rootScope.userInfo;
        $scope.continue = function () {
            $rootScope.user["DurationInstruction"] =( new Date - start)/1000;
            $rootScope.user["NumberOfTimeInQuiz"] = $rootScope.numberOftimeInQuiz
            $scope.changeRoute('#/quiz');
        }
    }]);

app.controller("consentCtrl", ["$scope", "$rootScope",
    function ($scope, $rootScope) {
        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };

        //$scope.userInfo=$rootScope.userInfo;
        $scope.continue = function () {
            $scope.changeRoute('#/demographics');
        }
    }]);

app.controller("quizCtrl", ["$scope", "$rootScope",
    function ($scope, $rootScope) {
        var start = new Date();
        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };
        $('html, body').scrollTop(0);//For scrolling to top
        $scope.q1 = "";
        $scope.q2 = "";
        $scope.q3 = "";
        $scope.q4 = "";
        //$scope.userInfo=$rootScope.userInfo;
        $scope.continue = function () {
            if ($scope.q1 == "ans1" && $scope.q2 == "ans4" && $scope.q3 == "ans3" && $scope.q4 == "ans1") {
                $rootScope.user["DurationQuiz"] = (new Date - start)/1000;
                $rootScope.user["numberOftimesInQuiz"] = $rootScope.numberOftimeInQuiz;
                $scope.changeRoute('#/calibration');
            }
            else {
                alert("You Failed The Quiz, Read The Instruction And Try Again");
                $rootScope.numberOftimeInQuiz += 1;
                $scope.changeRoute('#/instructions');

            }


        }
    }]);



app.controller("calRasCtrl", ["$scope", "$rootScope", '$timeout',
    function ($scope, $rootScope, $timeout) {

        //$scope.userInfo=$rootScope.userInfo;
        $scope.calibration = {
            up:    $rootScope.user['calibrationUp'],
            down: $rootScope.user['calibrationDown'],
            right:   $rootScope.user['calibrationRight'],
            left: $rootScope.user['calibrationLeft']
        };

        $scope.estimated_cost = $rootScope.user['calibrationCost'];

        var start=new Date();
        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };

        $scope.continue = function () {
            $rootScope.user['calibrationResultDuration']=(new Date-start)/1000;


            $scope.changeRoute('#/calibration2');



        }
    }]);




app.controller("cal2RasCtrl", ["$scope", "$rootScope", '$timeout',
    function ($scope, $rootScope, $timeout) {

        //$scope.userInfo=$rootScope.userInfo;
        $scope.calibration = {
            up:    $rootScope.user['calibration2Up'],
            down: $rootScope.user['calibration2Down'],
            right:   $rootScope.user['calibration2Right'],
            left: $rootScope.user['calibration2Left']
        };

        $scope.estimated_cost = $rootScope.user['calibration2Cost'];

        var start=new Date();
        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };

        $scope.continue = function () {
            $rootScope.user['calibrationResult2Duration']=(new Date-start)/1000;


            $scope.changeRoute('#/payments');



        }
    }]);


app.controller("payCtrl", ["$scope", "$rootScope", '$timeout',
    function ($scope, $rootScope, $timeout) {


        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };

        $scope.continue = function () {


            $scope.changeRoute('#/exp');


        }
    }]);
/**
 * Created by dor on 20/06/2016.
 */


app.controller("expCtrl", ["$scope", "$rootScope", '$timeout',
    function ($scope, $rootScope, $timeout) {


        var cellDisplacementLarge = "77.5px";
        var cellDisplacementSmall = "69px";


        $scope.moveTile = function (x) {
            // Gets the position of the current element
            var pos = $(x).attr('data-pos');
            var posRow = parseInt(pos.split(',')[0]);
            var posCol = parseInt(pos.split(',')[1]);
            // Move Up
            var emptytilePosRowOld = $scope.emptytilePosRow;
            var emptytilePosColold = $scope.emptytilePosCol;
            if (posRow + 1 == $scope.emptytilePosRow && posCol == $scope.emptytilePosCol) {
                $(x).animate({
                    'top': "+=" + $scope.cellDisplacement //moves up
                });

                $($scope.empty).animate({
                    'top': "-=" + $scope.cellDisplacement //moves down
                });

                $scope.emptytilePosRow -= 1;
                $(x).attr('data-pos', (posRow + 1) + "," + posCol);
                $scope.userMoves.push({move: "U", cell: x});
                $scope.userMovesLog.push("U");

                $scope.score += 1;

            }

            // Move Down
            if (posRow - 1 == $scope.emptytilePosRow && posCol == $scope.emptytilePosCol) {
                $(x).animate({
                    'top': "-=" + $scope.cellDisplacement //moves down
                });

                $($scope.empty).animate({
                    'top': "+=" + $scope.cellDisplacement //moves up
                });

                $scope.emptytilePosRow += 1;
                $(x).attr('data-pos', (posRow - 1) + "," + posCol);
                $scope.userMoves.push({move: "D", cell: x});
                $scope.userMovesLog.push("D");

                $scope.score += 1;

            }

            // Move Left
            if (posRow == $scope.emptytilePosRow && posCol + 1 == $scope.emptytilePosCol) {
                $(x).animate({
                    'right': "-=" + $scope.cellDisplacement //moves right
                });

                $($scope.empty).animate({
                    'right': "+=" + $scope.cellDisplacement //moves left
                });

                $scope.emptytilePosCol -= 1;
                $(x).attr('data-pos', posRow + "," + (posCol + 1));
                $scope.userMoves.push({move: "L", cell: x});
                $scope.userMovesLog.push("L");

                $scope.score += 1;

            }

            // Move Right
            if (posRow == $scope.emptytilePosRow && posCol - 1 == $scope.emptytilePosCol) {
                $(x).animate({
                    'right': "+=" + $scope.cellDisplacement //moves left
                });

                $($scope.empty).animate({
                    'right': "-=" + $scope.cellDisplacement //moves right
                });

                $scope.emptytilePosCol += 1;
                $(x).attr('data-pos', posRow + "," + (posCol - 1));

                $scope.userMoves.push({move: "R", cell: x});
                $scope.userMovesLog.push("R");

                $scope.score += 1;

            }

            // Update empty position
            $($scope.empty).attr('data-pos', $scope.emptytilePosRow + "," + $scope.emptytilePosCol);
            if (emptytilePosColold != $scope.emptytilePosCol || emptytilePosRowOld != $scope.emptytilePosRow) {
                if ($scope.checkIfWin()) {
                    alert("win");
                    if ($scope.activeState[index] == "startPic") {
                        $rootScope.user['startWon'] = true;
                    }
                    if ($scope.activeState[index] == "middlePic") {
                        $rootScope.user['middleWon'] = true;
                    }
                    if ($scope.activeState[index] == "endPic") {
                        $rootScope.user['endWon'] = true;
                    }

                }
            }

        };

        $scope.undo = function () {
            if ($scope.userMoves.length == 0) {
                return;
            }
            $scope.score -= 1;
            var move = $scope.userMoves.pop();
            $scope.userMovesLog.pop();

            var x = move.cell;

            // Gets the position of the current element
            var pos = $(x).attr('data-pos');
            var posRow = parseInt(pos.split(',')[0]);
            var posCol = parseInt(pos.split(',')[1]);
            // Move Up
            var emptytilePosRowOld = $scope.emptytilePosRow;
            var emptytilePosColold = $scope.emptytilePosCol;

            if (move.move == "R") {
                $(x).animate({
                    'right': "-=" + $scope.cellDisplacement //moves right
                });

                $($scope.empty).animate({
                    'right': "+=" + $scope.cellDisplacement //moves left
                });

                $scope.emptytilePosCol -= 1;
                $(x).attr('data-pos', posRow + "," + (posCol + 1));
            }

            if (move.move == "L") {
                $(x).animate({
                    'right': "+=" + $scope.cellDisplacement //moves left
                });

                $($scope.empty).animate({
                    'right': "-=" + $scope.cellDisplacement //moves right
                });

                $scope.emptytilePosCol += 1;
                $(x).attr('data-pos', posRow + "," + (posCol - 1));

            }

            if (move.move == "U") {
                $(x).animate({
                    'top': "-=" + $scope.cellDisplacement //moves down
                });

                $($scope.empty).animate({
                    'top': "+=" + $scope.cellDisplacement //moves up
                });

                $scope.emptytilePosRow += 1;
                $(x).attr('data-pos', (posRow - 1) + "," + posCol);
            }
            if (move.move == "D") {
                $(x).animate({
                    'top': "+=" + $scope.cellDisplacement //moves up
                });

                $($scope.empty).animate({
                    'top': "-=" + $scope.cellDisplacement //moves down
                });

                $scope.emptytilePosRow -= 1;
                $(x).attr('data-pos', (posRow + 1) + "," + posCol);

            }
            // Update empty position
            $($scope.empty).attr('data-pos', $scope.emptytilePosRow + "," + $scope.emptytilePosCol);
            if (emptytilePosColold != $scope.emptytilePosCol || emptytilePosRowOld != $scope.emptytilePosRow) {
                if ($scope.checkIfWin()) {
                    alert("You won!");
                }
            }
        };

        $scope.reset = function () {
            while ($scope.userMoves.length > 0) {
                $scope.undo();
            }
        };
        $scope.checkIfWin = function () {
            var cells = $(".gameCell");
            for (var key in cells) {
                if (key == "length") {
                    break;
                }
                var pos = $(cells[key]).attr('data-pos');
                var posRow = parseInt(pos.split(',')[0]);
                var posCol = parseInt(pos.split(',')[1]);
                var expectedValue = posRow * 3 + posCol + 1;
                if ($(".cell")[key].childNodes.length > 0) {
                    var actualValue = parseInt($(".cell")[key].childNodes[0].innerText);
                }
                else {
                    var actualValue = 9;
                }
                if (expectedValue != actualValue) {
                    return false;
                }

            }
            return true;

        };

        $scope.init_state = function () {
            if ($scope.activeState[$scope.index] == "middlePic") {
                $scope.emptytilePosRow = 2;
                $scope.emptytilePosCol = 0;
                $scope.cellDisplacement = "77.5px";
                $scope.empty = "#emptyMiddle";

                $(".cellMiddle").click(function () {
                    //Some code
                    $scope.moveTile(this);
                });
            }
            else if ($scope.activeState[$scope.index] == "endPic") {
                $scope.emptytilePosRow = 1;
                $scope.emptytilePosCol = 2;
                $scope.cellDisplacement = "69px";
                $scope.empty = "#emptyEnd";

                $(".cellEnd").click(function () {
                    //Some code
                    $scope.moveTile(this);
                });
            } else {
                $scope.emptytilePosRow = 3;
                $scope.emptytilePosCol = 1;
                $scope.cellDisplacement = "77.5px";
                $scope.empty = "#emptyStart";

                $(".cellStart").click(function () {
                    //Some code
                    $scope.moveTile(this);
                });
            }
        };


        $scope.states = [
            ['startPic', 'middlePic', 'endPic'],
            ['middlePic', 'startPic', 'endPic'],
            ['middlePic', 'endPic', 'startPic'],
            ['startPic', 'endPic', 'middlePic'],
            ['endPic', 'startPic', 'middlePic'],
            ['endPic', 'middlePic', 'startPic']
        ];

        $scope.init = function () {
            $scope.cost = 0;
            $scope.score = 0;
            $scope.counter = 300;
            $scope.endCost = 0;
            $scope.middleCost = 0;
            $scope.startCost = 0;
            $rootScope.user['startWon'] = false;
            $rootScope.user['middleWon'] = false;
            $rootScope.user['endWon'] = false;

            var i = Math.floor(Math.random() * 6);
            console.log("the index is:" + i);
            if (i < 0 || i > 6) {
                i = 5;
            }
            $scope.activeState = $scope.states[i];
            $scope.index = 0;
            $(".pic").hide();
            $("." + $scope.activeState[$scope.index]).show();
            $scope.init_state();

            $scope.countdown();
        };

        $scope.userMovesLog = [];
        $scope.userMoves = [];
        $scope.cost = 0;
        $scope.score = 0;

        $scope.countdown = function () {
            stopped = $timeout(function () {
                //console.log($scope.counter);
                if ($scope.counter === 0) {
                    //TODO: Alert
                    alert("Time is Up");
                    $timeout.cancel(stopped);
                    $scope.continue();
                }
                $scope.counter--;
                $scope.countdown();
            }, 1000);
        };

        $scope.init();


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

        $scope.insertDuration = function (start, end, index) {
            //alert($scope.activeState[index])
            if ($scope.activeState[index] == "startPic") {
                $rootScope.user['startDuration'] = (end - start) / 1000;
            }
            if ($scope.activeState[index] == "middlePic") {
                $rootScope.user['middleDuration'] = (end - start) / 1000;
            }
            if ($scope.activeState[index] == "endPic") {
                $rootScope.user['endDuration'] = (end - start) / 1000;
            }

        };

        $scope.continue = function () {
            if ($scope.index >= $scope.activeState.length - 1) {
                // move to end of expeirment
                $timeout.cancel(stopped);
                $scope.insertDuration(start, new Date, $scope.index);

                $rootScope.user['startCost'] = $scope.startCost;

                $rootScope.user['middleCost'] = $scope.middleCost;

                $rootScope.user['endCost'] = $scope.endCost;

                $scope.changeRoute('#/end');

            }
            else {
                $timeout.cancel(stopped);

                if ($scope.activeState[$scope.index] == "middlePic") {

                    $rootScope.user['userMovesMiddle'] = $scope.userMovesLog;
                    $rootScope.user['userCalcCostMiddle'] = $scope.score;
                    $(".cellMiddle").off("click");

                    $scope.userMovesLog = [];
                    $scope.userMoves = [];
                }
                else if ($scope.activeState[$scope.index] == "endPic") {

                    $rootScope.user['userMovesEnd'] = $scope.userMovesLog;
                    $rootScope.user['userCalcCostEnd'] = $scope.score;
                    $scope.userMoves = [];
                    $scope.userMovesLog = [];

                    $(".cellEnd").off("click");

                } else {

                    $rootScope.user['userMovesStart'] = $scope.userMovesLog;
                    $rootScope.user['userCalcCostStart'] = $scope.score;
                    $scope.userMoves = [];
                    $scope.userMovesLog = [];

                    $(".cellStart").off("click");

                }
                $scope.index += 1;
                $(".pic").hide();

                $("." + $scope.activeState[$scope.index]).show();
                $scope.init_state();
                $scope.score = 0;

                $scope.insertDuration(start, new Date, $scope.index - 1);
                start = new Date();
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                $scope.counter = 300;

                $scope.countdown();


            }
        }
    }]);

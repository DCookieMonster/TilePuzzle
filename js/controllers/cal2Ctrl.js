/**
 * Created by dor on 20/06/2016.
 */

app.controller("cal2Ctrl", ["$scope", "$rootScope", '$timeout',
    function ($scope, $rootScope, $timeout) {

        var emptytilePosRow = 2;
        var emptytilePosCol = 2;
        var cellDisplacement = "77.5px";


        $scope.moveTile=function(x)
        {
            // Gets the position of the current element
            var pos = $(x).attr('data-pos');
            var posRow = parseInt(pos.split(',')[0]);
            var posCol = parseInt(pos.split(',')[1]);
            // Move Up
            var emptytilePosRowOld=emptytilePosRow;
            var emptytilePosColold=emptytilePosCol;
            if (posRow + 1 == emptytilePosRow && posCol == emptytilePosCol)
            {
                $(x).animate({
                    'top' : "+=" + cellDisplacement //moves up
                });

                $('#empty').animate({
                    'top' : "-=" + cellDisplacement //moves down
                });

                emptytilePosRow-=1;
                $(x).attr('data-pos',(posRow+1) + "," + posCol);
                $scope.userMoves.push({move:"U",cell:x});
                $scope.userMovesLog.push("U");

                $scope.score+=1;

            }

            // Move Down
            if (posRow - 1 == emptytilePosRow && posCol == emptytilePosCol)
            {
                $(x).animate({
                    'top' : "-=" + cellDisplacement //moves down
                });

                $('#empty').animate({
                    'top' : "+=" + cellDisplacement //moves up
                });

                emptytilePosRow+=1;
                $(x).attr('data-pos',(posRow-1) + "," + posCol);
                $scope.userMoves.push({move:"D",cell:x});
                $scope.userMovesLog.push("D");

                $scope.score+=1;

            }

            // Move Left
            if (posRow == emptytilePosRow && posCol + 1 == emptytilePosCol)
            {
                $(x).animate({
                    'right' : "-=" + cellDisplacement //moves right
                });

                $('#empty').animate({
                    'right' : "+=" + cellDisplacement //moves left
                });

                emptytilePosCol -= 1;
                $(x).attr('data-pos',posRow + "," + (posCol+1));
                $scope.userMoves.push({move:"L",cell:x});
                $scope.userMovesLog.push("L");

                $scope.score+=1;

            }

            // Move Right
            if (posRow == emptytilePosRow && posCol - 1 == emptytilePosCol)
            {
                $(x).animate({
                    'right' : "+=" + cellDisplacement //moves left
                });

                $('#empty').animate({
                    'right' : "-=" + cellDisplacement //moves right
                });

                emptytilePosCol += 1;
                $(x).attr('data-pos',posRow + "," + (posCol-1));

                $scope.userMoves.push({move:"R",cell:x});
                $scope.userMovesLog.push("R");
                $scope.score+=1;

            }

            // Update empty position
            $('#empty').attr('data-pos',emptytilePosRow + "," + emptytilePosCol);
            if (emptytilePosColold!=emptytilePosCol || emptytilePosRowOld!=emptytilePosRow){
                if($scope.checkIfWin()){
                    alert("win");
                }
            }

        };

        $scope.undo=function(){
            if ($scope.userMoves.length==0){
                return;
            }
            $scope.score-=1;
            var move=$scope.userMoves.pop();
            $scope.userMovesLog.pop();
            var x=move.cell;

            // Gets the position of the current element
            var pos = $(x).attr('data-pos');
            var posRow = parseInt(pos.split(',')[0]);
            var posCol = parseInt(pos.split(',')[1]);
            // Move Up
            var emptytilePosRowOld=emptytilePosRow;
            var emptytilePosColold=emptytilePosCol;

            if (move.move=="R"){
                $(x).animate({
                    'right' : "-=" + cellDisplacement //moves right
                });

                $('#empty').animate({
                    'right' : "+=" + cellDisplacement //moves left
                });

                emptytilePosCol -= 1;
                $(x).attr('data-pos',posRow + "," + (posCol+1));
            }

            if (move.move=="L"){
                $(x).animate({
                    'right' : "+=" + cellDisplacement //moves left
                });

                $('#empty').animate({
                    'right' : "-=" + cellDisplacement //moves right
                });

                emptytilePosCol += 1;
                $(x).attr('data-pos',posRow + "," + (posCol-1));

            }

            if (move.move=="U"){
                $(x).animate({
                    'top' : "-=" + cellDisplacement //moves down
                });

                $('#empty').animate({
                    'top' : "+=" + cellDisplacement //moves up
                });

                emptytilePosRow+=1;
                $(x).attr('data-pos',(posRow-1) + "," + posCol);
            }
            if (move.move=="D"){
                $(x).animate({
                    'top' : "+=" + cellDisplacement //moves up
                });

                $('#empty').animate({
                    'top' : "-=" + cellDisplacement //moves down
                });

                emptytilePosRow-=1;
                $(x).attr('data-pos',(posRow+1) + "," + posCol);

            }
            // Update empty position
            $('#empty').attr('data-pos',emptytilePosRow + "," + emptytilePosCol);
            if (emptytilePosColold!=emptytilePosCol || emptytilePosRowOld!=emptytilePosRow){
                if($scope.checkIfWin()){
                    alert("win");
                }
            }
        };

        $scope.reset=function() {
            while ($scope.userMoves.length>0){
                $scope.undo();
            }
        };
        $scope.checkIfWin=function(){
            var cells=$(".gameCell");
            for (var key in cells){
                if(key=="length"){
                    break;
                }
                var pos = $(cells[key]).attr('data-pos');
                var posRow = parseInt(pos.split(',')[0]);
                var posCol = parseInt(pos.split(',')[1]);
                var expectedValue=posRow*3+posCol+1;
                if ($(".cell")[key].childNodes.length>0) {
                    var actualValue = parseInt($(".cell")[key].childNodes[0].innerText);
                }
                else {
                    var actualValue=9;
                }
                if (expectedValue!=actualValue)
                {
                    return false;
                }

            }
            return true;

        };

        $scope.init = function(){
            $scope.cost = 0;
            $scope.score=0;
            $scope.counter = 300;

            $(".cell").click(function(){
                //Some code
                $scope.moveTile(this);
            });
            $scope.countdown();

        };


        $scope.userMoves = [];
        $scope.userMovesLog = [];
        $scope.cost = 0;
        $scope.score=0;

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

        $scope.continue = function () {
            // move to end of expeirment
            $timeout.cancel(stopped);

            $rootScope.user['calibration2Cost'] = $scope.cost;
            $rootScope.user['calibration2CalcCost'] = $scope.score;
            $rootScope.user['calibration2Win'] = $scope.win;
            $rootScope.user['calibration2Moves'] = $scope.userMovesLog;

            $rootScope.user['calibration2Duration'] = (new Date() - start) / 1000;
            $(".cell").off("click");

            $scope.changeRoute('#/calibrationResult2');


        }
    }]);
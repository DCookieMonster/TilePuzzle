/**
 * Created by dor on 20/06/2016.
 */

app.controller("cal2Ctrl", ["$scope", "$rootScope", '$timeout',
    function ($scope, $rootScope, $timeout) {


        var g = document.getElementById('goalCal2');
        var gctx = g.getContext('2d');
        var goalHeightTileSize = g.offsetHeight / 4;
        var goalWidthTileSize = g.offsetWidth / 3;
        var goal_tiles = [['white', 0 * goalWidthTileSize, 0 * goalHeightTileSize], ['white', 1 * goalWidthTileSize, 0 * goalHeightTileSize], ['white', 2 * goalWidthTileSize, 0 * goalHeightTileSize], ['blue', 2 * goalWidthTileSize, 2 * goalHeightTileSize], ['red', 2 * goalWidthTileSize, 1 * goalHeightTileSize], ['red', 2 * goalWidthTileSize, 3 * goalHeightTileSize], ['blue', 0 * goalWidthTileSize, 2 * goalHeightTileSize], ['blue', 0 * goalWidthTileSize, 2 * goalHeightTileSize], ['red', 0 * goalWidthTileSize, 1 * goalHeightTileSize], ['blue', 1 * goalWidthTileSize, 1 * goalHeightTileSize], ['red', 0 * goalWidthTileSize, 3 * goalHeightTileSize], ['blue', 1 * goalWidthTileSize, 3 * goalHeightTileSize], ['red', 1 * goalWidthTileSize, 2 * goalHeightTileSize]];
        var canvas = document.getElementById('boardCal2');
        var ctx = canvas.getContext('2d');
        var heightTileSize = canvas.offsetHeight / 4;
        var widthTileSize = canvas.offsetWidth / 3;
        var tiles = [['white', 0 * widthTileSize, 0 * heightTileSize],
            ['white', 1 * widthTileSize, 0 * heightTileSize], ['white', 2 * widthTileSize, 0 * heightTileSize],
            ['white', 0 * widthTileSize, 1 * heightTileSize], ['white', 1 * widthTileSize, 1 * heightTileSize], ['white', 2 * widthTileSize, 1 * heightTileSize],
            ['white', 0 * widthTileSize, 2 * heightTileSize], ['white', 1 * widthTileSize, 2 * heightTileSize], ['white', 2 * widthTileSize, 2 * heightTileSize],
            ['white', 0 * widthTileSize, 3 * heightTileSize], ['white', 1 * widthTileSize, 3 * heightTileSize], ['white', 2 * widthTileSize, 3 * heightTileSize]];
        var robot = [{x: 1 * widthTileSize, y: 2 * heightTileSize, color: 0}, {
            x: 0 * widthTileSize,
            y: 0 * heightTileSize,
            color: 1
        }];
        var colors = ["blue", "red"];
        var result_tiles = [['white', 0 * widthTileSize, 0 * heightTileSize], ['white', 1 * widthTileSize, 0 * heightTileSize], ['white', 2 * widthTileSize, 0 * heightTileSize], ['blue', 2 * widthTileSize, 2 * heightTileSize], ['red', 2 * widthTileSize, 1 * heightTileSize], ['red', 2 * widthTileSize, 3 * heightTileSize], ['blue', 0 * widthTileSize, 2 * heightTileSize], ['blue', 0 * widthTileSize, 2 * heightTileSize], ['red', 0 * widthTileSize, 1 * heightTileSize], ['blue', 1 * widthTileSize, 1 * heightTileSize], ['red', 0 * widthTileSize, 3 * heightTileSize], ['blue', 1 * widthTileSize, 3 * heightTileSize], ['red', 1 * widthTileSize, 2 * heightTileSize]];
        var GridSize = "3X4"

        //$scope.userInfo=$rootScope.userInfo;
        $scope.calibration = {
            up: 0,
            down: 0,
            right: 0,
            left: 0,
            colorUp: 0,
            colorDown: 0
        };

        $scope.counter = 300;


        $scope.userMoves = [];

        var offset = 0;

        $scope.win = false;

        $scope.initGoal = function () {
            //var g = document.getElementById("goal");
            //var gctx = g.getContext("2d");
            //var tileSize2 = g.offsetHeight / 3;
            //var goal_tiles = [["blue", 0, 0], ["red", 0, tileSize2], ["blue", 0, 2 * tileSize2],
            //    ["red", tileSize2, 0], ["blue", tileSize2, tileSize2], ["red", tileSize2, 2 * tileSize2],
            //    ["blue", 2 * tileSize2, 0], ["red", 2 * tileSize2, tileSize2], ["blue", 2 * tileSize2, 2 * tileSize2]
            //];
            for (var i = 0; i < goal_tiles.length; i++) {
                gctx.beginPath();
                gctx.fillStyle = goal_tiles[i][0];
                gctx.rect(goal_tiles[i][1] + 1, goal_tiles[i][2] + 1, goalWidthTileSize - 2, goalHeightTileSize - 1);
                gctx.stroke();
                gctx.fill();
            }

        };

        $scope.score = 0;


        var activeRobot = 0;
// Handle keyboard controls
        var keysDown = {};
//


        var states = [{
            robot: jQuery.extend(true, [], robot),
            tiles: jQuery.extend(true, [], tiles),
            activeRobot: activeRobot,
            score: $scope.score,
            movement: jQuery.extend({}, $scope.calibration)

        }];

        $scope.draw_tiles = function () {

            for (var i = 0; i < tiles.length; i++) {
                ctx.beginPath();
                ctx.fillStyle = tiles[i][0];
                ctx.rect(tiles[i][1], tiles[i][2], widthTileSize, heightTileSize);
                ctx.stroke();
                ctx.fill();
            }

        };
        $scope.moveEventcal2 = function (e) {
            //console.log(e.keyCode)
            keysDown[e.keyCode] = true;
            $scope.update(widthTileSize, heightTileSize);
            $scope.render();
            // space and arrow keys
            if ([32, 37, 38, 39, 40, 83, 87, 67, 88].indexOf(e.keyCode) > -1) {
                console.log(e.keyCode)
                delete keysDown[e.keyCode];

                e.preventDefault();
            }
        };

        window.addEventListener("keydown", $scope.moveEventcal2, false);


// Reset the game when the player catches a monster
        $scope.undo = function () {
            if (states.length < 2) {
                return
            }
            states.pop();
            var state = states[states.length - 1];

            robot = jQuery.extend(true, [], state.robot);
            activeRobot = state.activeRobot;
            tiles = jQuery.extend(true, [], state.tiles);
            $scope.score = state.score;
            $scope.win = false;
            $scope.calibration = jQuery.extend({}, state.movement);

            $scope.render();

        };

        var states = [{
            robot: jQuery.extend(true, [], robot),
            tiles: jQuery.extend(true, [], tiles),
            activeRobot: activeRobot,
            score: $scope.score,
            movement: jQuery.extend({}, $scope.calibration)

        }];

        $scope.reset = function () {
            while (states.length > 1) {
                states.pop();
            }
            var state = states[states.length - 1];
            $scope.win = false;

            robot = jQuery.extend(true, [], state.robot);
            activeRobot = state.activeRobot;
            tiles = jQuery.extend(true, [], state.tiles);
            $scope.score = state.score;
            $scope.calibration = jQuery.extend({}, state.movement);

            $scope.render();

        };


        $scope.checkIfFree = function (x, y) {
            for (var i = 0; i < robot.length; i++) {
                if (parseInt(robot[i].x) == parseInt(x) && parseInt(robot[i].y) == parseInt(y)) {
                    return true;
                }

            }
            for (var i = 0; i < tiles.length; i++) {
                if (parseInt(tiles[i][1]) == parseInt(x) && parseInt(tiles[i][2]) == parseInt(y) && tiles[i][0] != "white") {
                    return true;
                }

            }
            return false;
        };

//Update game objects
        $scope.update = function (width_mod, height_mod) {
            if (38 in keysDown) { // Player holding up
                if (robot[activeRobot].y - height_mod < 0) {
                    return;
                }
                if ($scope.checkIfFree(robot[activeRobot].x, robot[activeRobot].y - height_mod)) {
                    return;
                }
                robot[activeRobot].y -= height_mod;
                $scope.score += 1;
                $scope.userMoves.push("Up")
                $scope.calibration.up += 1;

            }
            if (40 in keysDown) { // Player holding down
                if (robot[activeRobot].y + height_mod >= canvas.offsetHeight) {
                    return;
                }
                if ($scope.checkIfFree(robot[activeRobot].x, robot[activeRobot].y + height_mod)) {
                    return;
                }
                robot[activeRobot].y += height_mod;
                $scope.score += 1;
                $scope.userMoves.push("Down")
                $scope.calibration.down += 1;



            }
            if (37 in keysDown) { // Player holding left
                if (robot[activeRobot].x - width_mod < 0 + offset) {
                    return;
                }
                if ($scope.checkIfFree(robot[activeRobot].x - width_mod, robot[activeRobot].y)) {
                    return;
                }
                robot[activeRobot].x -= width_mod;
                $scope.score += 1;
                $scope.userMoves.push("Left")
                $scope.calibration.left += 1;


            }
            if (39 in keysDown) { // Player holding right
                if (robot[activeRobot].x + width_mod >= canvas.offsetWidth + offset) {
                    return;
                }
                if ($scope.checkIfFree(robot[activeRobot].x + width_mod, robot[activeRobot].y)) {
                    return;
                }
                robot[activeRobot].x += width_mod;
                $scope.score += 1;
                $scope.userMoves.push("Right")
                $scope.calibration.right += 1;



            }
            if (83 in keysDown) {
                console.log("s")


                for (var i = 0; i < tiles.length; i++) {
                    if (parseInt(robot[activeRobot].x) == parseInt(tiles[i][1]) && (parseInt(robot[activeRobot].y + height_mod) == parseInt(tiles[i][2]) || parseInt(robot[activeRobot].y + height_mod) == parseInt(tiles[i][2]) + 1 || parseInt(robot[activeRobot].y + height_mod) == parseInt(tiles[i][2]) - 1)) {
                        //if ($scope.checkIfFree(robot[activeRobot].x, robot[activeRobot].y + height_mod)) {
                        //    return;
                        //}
                        tiles[i][0] = colors[robot[activeRobot].color];
                        $scope.score += 1;
                        $scope.userMoves.push("Color Down");
                        $scope.calibration.colorDown += 1;

                        if (checkGoal()) {
                            //TODO:win
                            alert("you win");
                            $scope.win = true;
                        }
                    }
                }


            }
            if (87 in keysDown) {
                console.log("w")
                for (var i = 0; i < tiles.length; i++) {
                    if (parseInt(robot[activeRobot].x) == parseInt(tiles[i][1]) && (parseInt(robot[activeRobot].y) - parseInt(height_mod) == parseInt(tiles[i][2]) || parseInt(robot[activeRobot].y) - parseInt(height_mod) == parseInt(tiles[i][2]) + 1 || parseInt(robot[activeRobot].y) - parseInt(height_mod) == parseInt(tiles[i][2]) - 1)) {
                        //if ($scope.checkIfFree(robot[activeRobot].x, robot[activeRobot].y - height_mod)) {
                        //    return;
                        //}
                        tiles[i][0] = colors[robot[activeRobot].color];
                        $scope.score += 1;
                        $scope.userMoves.push("Color Up");
                        $scope.calibration.colorUp += 1;
                        if (checkGoal()) {
                            //TODO:win
                            alert("you win");
                            $scope.win = true;


                        }

                    }
                }


            }
            //if (67 in keysDown) {
            //    console.log("c");
            //    $scope.score += 5;
            //    $scope.userMoves.push("Change Color");
            //
            //    robot[activeRobot].color = (robot[activeRobot].color + 1) % colors.length;
            //    $("#color_span").text(colors[robot[activeRobot].color]);
            //}
            if (88 in keysDown) {
                console.log("x");
                $scope.score += 0;
                $scope.userMoves.push("Change Robot");

                activeRobot = (activeRobot + 1) % robot.length;
                $("#robot_span").text(activeRobot);
                $("#color_span").text(colors[robot[activeRobot].color]);


            }
            states.push({
                robot: jQuery.extend(true, [], robot),
                tiles: jQuery.extend(true, [], tiles),
                activeRobot: activeRobot,
                score: $scope.score,
                movement: jQuery.extend({}, $scope.calibration)
            });
            // Are they touching?
            //if (
            //    hero.x <= (monster.x + 32)
            //    && monster.x <= (hero.x + 32)
            //    && hero.y <= (monster.y + 32)
            //    && monster.y <= (hero.y + 32)
            //) {
            //    ++monstersCaught;
            //    reset();
            //}
        };

        function checkGoal() {
            for (var i = 0; i < tiles.length; i++) {
                for (var j = 0; j < result_tiles.length; j++) {
                    if (tiles[i][1] == result_tiles[j][1] && tiles[i][2] == result_tiles[j][2]) {
                        if (tiles[i][0] != result_tiles[j][0]) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }


// Draw everything
        $scope.render = function () {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            $scope.draw_tiles();

            if (heroReady) {
                for (var i = 0; i < robot.length; i++) {
                    if (i == activeRobot) {
                        ctx.drawImage(activeRobotimg, robot[i].x, robot[i].y, widthTileSize, heightTileSize);

                    }
                    else {
                        ctx.drawImage(heroImage, robot[i].x, robot[i].y, widthTileSize, heightTileSize);

                    }
                    ctx.beginPath();
                    ctx.fillStyle = colors[robot[i].color];
                    ctx.rect(robot[i].x + widthTileSize / 2 - 15, robot[i].y + 3 * heightTileSize / 4 - 10, 25, 25);
                    ctx.stroke();
                    ctx.fill();


                }
            }


            $("#color_span").text(colors[robot[activeRobot].color]);
            $("#score_span").text($scope.score);
            $("#robot_span").text(activeRobot);
        };

        var activeRobotimg = new Image();
        activeRobotimg.src = "img/robot3.png";

        var heroReady = false;
        var heroImage = new Image();
        heroImage.src = "img/robot2.png";


// The main game loop
        $scope.main = function () {
            //var now = Date.now();
            //var delta = now - then;
// Background image

            heroImage.onload = function () {
                heroReady = true;
                $scope.render();

            };
        };


// Let's play this game!
//var then = Date.now();
//draw_tiles();
        $("#color_span").text(colors[robot[activeRobot].color]);
        $("#robot_span").text(activeRobot);

        $scope.main();
        $scope.initGoal();


        $scope.init = function () {
            //tiles = [['white', 0 * widthTileSize, 0 * heightTileSize], ['white', 1 * widthTileSize, 0 * heightTileSize],
            //    ['white', 2 * widthTileSize, 0 * heightTileSize], ['white', 0 * widthTileSize, 1 * heightTileSize],
            //    ['white', 1 * widthTileSize, 1 * heightTileSize], ['white', 2 * widthTileSize, 1 * heightTileSize],
            //    ['blue', 0 * widthTileSize, 2 * heightTileSize], ['red', 1 * widthTileSize, 2 * heightTileSize],
            //    ['blue', 2 * widthTileSize, 2 * heightTileSize], ['red', 0 * widthTileSize, 3 * heightTileSize],
            //    ['blue', 1 * widthTileSize, 3 * heightTileSize], ['red', 2 * widthTileSize, 3 * heightTileSize]];
            //robot = [{x: 1 * widthTileSize, y: 0 * heightTileSize, color: 0}, {
            //    x: 1 * widthTileSize,
            //    y: 1 * heightTileSize,
            //    color: 1
            //}];
            tiles = [['white', 0 * widthTileSize, 0 * heightTileSize], ['white', 1 * widthTileSize, 0 * heightTileSize],
                ['white', 2 * widthTileSize, 0 * heightTileSize], ['white', 0 * widthTileSize, 1 * heightTileSize],
                ['white', 1 * widthTileSize, 1 * heightTileSize], ['red', 2 * widthTileSize, 1 * heightTileSize],
                ['white', 0 * widthTileSize, 2 * heightTileSize], ['white', 1 * widthTileSize, 2 * heightTileSize],
                ['blue', 2 * widthTileSize, 2 * heightTileSize], ['red', 0 * widthTileSize, 3 * heightTileSize],
                ['blue', 1 * widthTileSize, 3 * heightTileSize], ['red', 2 * widthTileSize, 3 * heightTileSize]];
            robot = [{x: 1 * widthTileSize, y: 1 * heightTileSize, color: 0}, {
                x: 0 * widthTileSize,
                y: 0 * heightTileSize,
                color: 1
            }];
            states = [{
                robot: jQuery.extend(true, [], robot),
                tiles: jQuery.extend(true, [], tiles),
                activeRobot: activeRobot,
                score: $scope.score,
                movement: jQuery.extend({}, $scope.calibration)

            }];
            $scope.countdown();
        };


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
            window.removeEventListener("keydown", $scope.moveEventcal2, false);

            $rootScope.user['calibration2Up'] = $scope.calibration.up;
            $rootScope.user['calibration2Down'] = $scope.calibration.down;
            $rootScope.user['calibration2Left'] = $scope.calibration.left;
            $rootScope.user['calibration2Right'] = $scope.calibration.right;
            $rootScope.user['calibration2Score'] = $scope.calibration.right + $scope.calibration.left + $scope.calibration.up + $scope.calibration.down;
            $rootScope.user['calibration2Score'] = $scope.calibration.right + $scope.calibration.left + $scope.calibration.up + $scope.calibration.down;
            $rootScope.user['calibration2Cost'] = $scope.cost;
            $rootScope.user['calibration2CalcCost'] = $scope.score;
            $rootScope.user['calibration2Win'] = $scope.win;
            $rootScope.user['calibration2Moves'] = $scope.userMoves;

            $rootScope.user['calibration2Duration'] = (new Date() - start) / 1000;

            $scope.changeRoute('#/calibrationResult2');


        }
    }]);
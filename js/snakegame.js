// SW is snake width
var SW = 5;
var snackX;
var snackY;
// Setup player1 variables
var snakeLengthOne = 10;
var scoreOne;
var curXOne;
var curYOne;
var xArrOne = [];
var yArrOne = [];
var inpOne = "r";
var curDirOne = "r";
// Setup player2 variables
var snakeLengthTwo = 10;
var scoreTwo;
var curXTwo;
var curYTwo;
var xArrTwo = [];
var yArrTwo = [];
var inpTwo = "r";
var curDirTwo = "r";
var speed = 100;

$(document).ready(function(){
  var timer;

  $('#slider-number-range').slider({
    value: 50,
    max: 100,
    min: 0,
    step: 25,
    slide: function(event, ui) {
      if (ui.value > 70) {
        $("#speed-limit").text("Fast");
      } else if (ui.value < 30) {
        $("#speed-limit").text("Slow");
      } else {
        $("#speed-limit").text("Normal");
      }
      speed = 150 - ui.value;
    }
  });

  $(document).keydown(function(e){
    if (curDirOne == "l" || curDirOne == "r") {
      if (e.keyCode==38) {
        inpOne = "u";
      } else if (e.keyCode==40) {
        inpOne = "d";
      }
    } else if (curDirOne == "u" || curDirOne == "d") {
      if (e.keyCode==37) {
        inpOne = "l";
      } else if (e.keyCode==39) {
        inpOne = "r";
      }
    }
  });

  $(document).keydown(function(e){
    if (curDirTwo == "l" || curDirTwo == "r") {
      if (e.keyCode==87) {
        inpTwo = "u";
      } else if (e.keyCode==83) {
        inpTwo = "d";
      }
    } else if (curDirTwo == "u" || curDirTwo == "d") {
      if (e.keyCode==65) {
        inpTwo = "l";
      } else if (e.keyCode==68) {
        inpTwo = "r";
      }
    }
  });

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var w=$('#canvas').width();
  var h=$('#canvas').height();

  function createSnack(player) {
    snackX = Math.floor(((w/SW)-1)*Math.random())*SW;
    snackY = Math.floor(((h/SW)-1)*Math.random())*SW;
    for(var i = 0; i < snakeLengthOne;i++) {
      if((snackX == xArrOne[i] && snackY == yArrOne[i])) {
        createSnack(1);
      }
    }
    if (player == 2) {
      for(var x = 0; x < snakeLengthTwo;x++) {
        if((snackX == xArrTwo[i] && snackY == yArrTwo[i])) {
        createSnack(2);
        }
      }
    }
    ctx.fillStyle = "green";
    ctx.fillRect(snackX, snackY,SW,SW);
  }


  function initSnake(player,snakeLength,xArr,yArr,curX,curY) {
    if (player == 1) {
      for (var i = 0; i < snakeLength; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(i*5,0,SW,SW);
        xArr.unshift(i*5);
        yArr.unshift(0);
      }
      window[curX] = (snakeLength - 1) * 5;
      window[curY] = 0;
    } else if (player == 2) {
      for (var i = 0; i < snakeLength; i++) {
        ctx.fillStyle = "blue";
        ctx.fillRect(i*5,w-5,SW,SW);
        xArr.unshift(i*5);
        yArr.unshift(w-5);
      }
      window[curX] = (snakeLength - 1) * 5;
      window[curY] = w - 5;
    }
    // $("h5").text("Score: "+ scoreOne);
  }

  function onePlay () {
    var gameOn = true;
    for(var x = 1; x<snakeLengthOne;x++) {
      if (curXOne == xArrOne[x] && curYOne == yArrOne[x]) {
        gameOn = false;
      }
    }

    if(curXOne <= w - SW && curYOne <= h - SW && curXOne >= 0 && curYOne >= 0 && gameOn) {
      if (curXOne == snackX && curYOne == snackY) {
        snakeLengthOne++;
        scoreOne++;
        xArrOne.push(1);
        yArrOne.push(1);
        moveSnake(1,snakeLengthOne,inpOne,"curXOne","curYOne","curDirOne",xArrOne,yArrOne);
        $("h5").text("Score: "+ scoreOne);
        createSnack(snakeLengthOne);
      }
      else {
        moveSnake(1,snakeLengthOne,inpOne,"curXOne","curYOne","curDirOne",xArrOne,yArrOne);
      }
    } else {
      clearInterval(timer);
      ctx.font = "30px Arial";
      ctx.strokeText("GAME OVER",10,100);
      $("#onePlayer-button").prop('disabled', false);
      $("#twoPlayer-button").prop('disabled', false);
    }
  }

  function twoPlay () {
    var gameOn = true;
    var pOne = true;
    var pTwo = true;
    for(var x = 1; x<snakeLengthOne;x++) {
      if (curXOne == xArrOne[x] && curYOne == yArrOne[x]) {
        gameOn = false;
        pOne = false;
      } else if (curXTwo == xArrOne[x] && curYTwo == yArrOne[x]) {
        gameOn = false;
        pTwo = false;
      }
    } 
    for(var y = 1; y<snakeLengthTwo;y++) {
      if (curXTwo == xArrTwo[y] && curYTwo == yArrTwo[y]) {
        gameOn = false;
        pTwo = false;
      } else if (curXOne == xArrTwo[y] && curYOne == yArrTwo[y]) {
        gameOn = false;
        pOne = false;
      } 
    }
    if ((curXOne > w - SW || curYOne > h - SW || curXOne < 0 || curYOne < 0) && (curXTwo > w - SW || curYTwo > h - SW || curXTwo < 0 || curYTwo < 0)) {
      gameOn = false;
      pOne = false;
      pTwo = false;
    } else if (curXOne > w - SW || curYOne > h - SW || curXOne < 0 || curYOne < 0) {
      gameOn = false;
      pOne = false;
    } else if (curXTwo > w - SW || curYTwo > h - SW || curXTwo < 0 || curYTwo < 0) {
      gameOn = false;
      pTwo = false;
    }

    if(gameOn) {
      if (curXOne == snackX && curYOne == snackY) {
        snakeLengthOne++;
        scoreOne++;
        xArrOne.push(1);
        yArrOne.push(1);
        moveSnake(1,snakeLengthOne,inpOne,"curXOne","curYOne","curDirOne",xArrOne,yArrOne);
        moveSnake(2,snakeLengthTwo,inpTwo,"curXTwo","curYTwo","curDirTwo",xArrTwo,yArrTwo);
        $("h5").text("P1 Score: "+ scoreOne + "P2 Score: "+ scoreTwo);
        createSnack(2);
      } else if (curXTwo == snackX && curYTwo == snackY) {
        snakeLengthTwo++;
        scoreTwo++;
        xArrTwo.push(1);
        yArrTwo.push(1);
        moveSnake(1,snakeLengthOne,inpOne,"curXOne","curYOne","curDirOne",xArrOne,yArrOne);
        moveSnake(2,snakeLengthTwo,inpTwo,"curXTwo","curYTwo","curDirTwo",xArrTwo,yArrTwo);
        $("h5").text("P1 Score: "+ scoreOne + "P2 Score: "+ scoreTwo);
        createSnack(2);
      }
      else {
        moveSnake(1,snakeLengthOne,inpOne,"curXOne","curYOne","curDirOne",xArrOne,yArrOne);
        moveSnake(2,snakeLengthTwo,inpTwo,"curXTwo","curYTwo","curDirTwo",xArrTwo,yArrTwo);
      }
    } else {
      clearInterval(timer);
      $("#start-button").prop('disabled', false);
      if (!pOne && !pTwo) {
        ctx.font = "30px Arial";
        ctx.strokeText("DRAW",70,100);
      } else if (!pOne) {
        ctx.font = "30px Arial";
        ctx.strokeText("Player 2 Wins",8,100);
      } else if (!pTwo) {
        ctx.font = "30px Arial";
        ctx.strokeText("Player 1 Wins",8,100);
      }
      $("#onePlayer-button").prop('disabled', false);
      $("#twoPlayer-button").prop('disabled', false);
    }
  }

  function moveSnake(player,snakeLength,inp,curX,curY,curDir,xArr,yArr) {
    ctx.clearRect(xArr[snakeLength-1], yArr[snakeLength-1], SW, SW);
    if (inp == "l") {
      window[curX] -= SW;
      window[curDir] = "l";
    } else if (inp == "u") {
      window[curY] -= SW;
      window[curDir] = "u";
    } else if (inp == "r") {
      window[curX] += SW;
      window[curDir] = "r";
    } else if (inp == "d") {
      window[curY] += SW;
      window[curDir] = "d";
    }
    xArr.unshift(window[curX]);
    yArr.unshift(window[curY]);
    xArr.pop();
    yArr.pop();
    createSnake(player,snakeLength,xArr,yArr);
  }

  function createSnake(player,snakeLength,xArr,yArr) {
    for (var i = 0; i < snakeLength; i++) {
      if (player == 1) {
        ctx.fillStyle = "black";
      } else if (player == 2) {
        ctx.fillStyle = "blue";
      }
      ctx.fillRect(xArr[i],yArr[i],SW,SW);
    }
  }

  function move () {
    
  }

  $(document).on('click','#onePlayer-button', function() {
    inpOne = "r";
    curDirOne = "r";
    scoreOne = 0;
    snakeLengthOne = 10;
    xArrOne = [];
    yArrOne = [];
    curXOne = 0;
    curYOne = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $("h5").text("P1 Score: "+ scoreOne);
    initSnake(1,snakeLengthOne,xArrOne,yArrOne,"curXOne","curYOne");
    createSnack(1);
    $("#onePlayer-button").prop('disabled', true);
    $("#twoPlayer-button").prop('disabled', true);
    timer = setInterval(onePlay, speed);
  });

  $(document).on('click','#twoPlayer-button', function() {
    // reset player 1 var
    inpOne = "r";
    curDirOne = "r";
    scoreOne = 0;
    snakeLengthOne = 10;
    xArrOne = [];
    yArrOne = [];
    curXOne = 0;
    curYOne = 0;
    // reset player 2 var
    snakeLengthTwo = 10;
    scoreTwo = 0;
    curXTwo = 0;
    curYTwo = 0;
    xArrTwo = [];
    yArrTwo = [];
    inpTwo = "r";
    curDirTwo = "r";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $("h5").text("P1 Score: "+ scoreOne + "P2 Score: "+ scoreTwo);
    initSnake(1,snakeLengthOne,xArrOne,yArrOne,"curXOne","curYOne");
    initSnake(2,snakeLengthTwo,xArrTwo,yArrTwo,"curXTwo","curYTwo");
    createSnack(2);
    $("#onePlayer-button").prop('disabled', true);
    $("#twoPlayer-button").prop('disabled', true);
    timer = setInterval(twoPlay, speed);
  });

});

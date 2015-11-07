// Global variables
var SW = 15;
var snackX;
var snackY;
var speed = 100;
var highScore = 0;
var gameChoice = 1;
var image = new Image();
image.src = 'images/opengraph.png';
var coinS = new Audio();
coinS.src = "sounds/smw_coin.wav";
// player1 variables
var snakeLengthOne = 10;
var scoreOne;
var curXOne;
var curYOne;
var xArrOne = [];
var yArrOne = [];
var inpOne = "";
var curDirOne = "";
// player2 variables
var snakeLengthTwo = 10;
var scoreTwo;
var curXTwo;
var curYTwo;
var xArrTwo = [];
var yArrTwo = [];
var inpTwo = "";
var curDirTwo = "";


$(document).ready(function(){
  var timer;

  $('#slider-number-range').slider({
    value: 50,
    max: 100,
    min: 0,
    step: 25,
    slide: function(event, ui) {
      if (ui.value == 100) {
        $("#speed-limit").text("CRAZY FAST!");
      } else if (ui.value == 0) {
        $("#speed-limit").text("Very Slow");
      } else if (ui.value > 70) {
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

  $(document).keyup(function(e){
    if (gameChoice == 3) {
      if (e.keyCode == 13) {
        startGame();
      }
    } else if (gameChoice == 1 || gameChoice == 2) {
      if (gameChoice == 1) {
        if (e.keyCode == 40) {
          ctx.clearRect(0, 170, 170, 70);
          ctx.beginPath();
          ctx.moveTo(160,220);
          ctx.lineTo(170,230);
          ctx.lineTo(160,240);
          ctx.fill();
          gameChoice = 2;
        } else if (e.keyCode == 13) {
          gameChoice = 0;
          onePlayer();
        }
      } else if (gameChoice == 2) {
        if (e.keyCode == 38) {
          ctx.clearRect(0, 170, 170, 70);
          ctx.beginPath();
          ctx.moveTo(160,170);
          ctx.lineTo(170,180);
          ctx.lineTo(160,190);
          ctx.fill();
          ctx.font = "26px Arial";
          gameChoice = 1;
        } else if (e.keyCode==13) {
          gameChoice = 0;
          return twoPlayer();
        }
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
    if (xArrOne.indexOf(snackX) != -1 && yArrOne.indexOf(snackY) != -1) {
      if (player == 1) {
        createSnack(1);
      } else if (xArrTwo.indexOf(snackX) != -1 && yArrTwo.indexOf(snackY) != -1) {
        createSnack(2);
      }
    }
    ctx.drawImage(image,snackX, snackY, SW, SW);
  }


  function initSnake(player,snakeLength,xArr,yArr,curX,curY) {
    if (player == 1) {
      for (var i = 0; i < snakeLength; i++) {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "blue";
        ctx.fillRect(i*SW+1,1,SW-2,SW-2);
        ctx.strokeRect(i*SW+1,1,SW-2,SW-2);
        xArr.unshift(i*SW);
        yArr.unshift(0);
      }
      window[curX] = (snakeLength - 1) * SW;
      window[curY] = 0;
    } else if (player == 2) {
      for (var i = 0; i < snakeLength; i++) {
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "white";
        ctx.fillRect(i*SW+1,w-SW+1,SW-2,SW-2);
        ctx.strokeRect(i*SW+1,w-SW+1,SW-2,SW-2);
        xArr.unshift(i*SW);
        yArr.unshift(w-SW);
      }
      window[curX] = (snakeLength - 1) * SW;
      window[curY] = w - SW;
    }
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
        coinS.play();
        snakeLengthOne++;
        scoreOne+= 100;
        xArrOne.push(1);
        yArrOne.push(1);
        $(".Score").text("Score: "+ scoreOne);
        if (scoreOne > highScore) {
          highScore = scoreOne;
          $(".high-Score").text("High-Score: " + highScore);
        }
        createSnack(1);
      }
      moveSnake(1,snakeLengthOne,inpOne,"curXOne","curYOne","curDirOne",xArrOne,yArrOne);
    } else {
      clearInterval(timer);
      ctx.strokeStyle = "white";
      ctx.font = "70px Arial";
      ctx.strokeText("GAME OVER",10,240);
      ctx.font = "12px Arial";
      ctx.fillText("(Press ENTER play again!)",150,280);
      gameChoice = 3;
    }
  }

  function twoPlay () {
    var pOne = true;
    var pTwo = true;
    for(var x = 1; x<snakeLengthOne;x++) {
      if (curXOne == xArrOne[x] && curYOne == yArrOne[x]) {
        pOne = false;
      } else if (curXTwo == xArrOne[x] && curYTwo == yArrOne[x]) {
        pTwo = false;
      }
    } 
    for(var y = 1; y<snakeLengthTwo;y++) {
      if (curXTwo == xArrTwo[y] && curYTwo == yArrTwo[y]) {
        pTwo = false;
      } else if (curXOne == xArrTwo[y] && curYOne == yArrTwo[y]) {
        pOne = false;
      } 
    }
    if ((curXOne > w - SW || curYOne > h - SW || curXOne < 0 || curYOne < 0) && (curXTwo > w - SW || curYTwo > h - SW || curXTwo < 0 || curYTwo < 0)) {
      pOne = false;
      pTwo = false;
    } else if (curXOne > w - SW || curYOne > h - SW || curXOne < 0 || curYOne < 0) {
      pOne = false;
    } else if (curXTwo > w - SW || curYTwo > h - SW || curXTwo < 0 || curYTwo < 0) {
      pTwo = false;
    }

    if(pOne && pTwo) {
      if (curXOne == snackX && curYOne == snackY) {
        coinS.play();
        snakeLengthOne++;
        scoreOne+= 100;
        xArrOne.push(w);
        yArrOne.push(h);
        if (scoreOne > highScore) {
          highScore = scoreOne;
          $(".high-Score").text("High-Score: " + highScore);
        }
        $(".Score").text("P1 Score: "+ scoreOne + " P2 Score: "+ scoreTwo);
        createSnack(2);
      } else if (curXTwo == snackX && curYTwo == snackY) {
        coinS.play();
        snakeLengthTwo++;
        scoreTwo+= 100;
        xArrTwo.push(w);
        yArrTwo.push(h);
        if (scoreTwo > highScore) {
          highScore = scoreTwo;
          $(".high-Score").text("High-Score: " + highScore);
        }
        $(".Score").text("P1 Score: "+ scoreOne + " P2 Score: "+ scoreTwo);
        createSnack(2);
      }
      moveSnake(1,snakeLengthOne,inpOne,"curXOne","curYOne","curDirOne",xArrOne,yArrOne);
      moveSnake(2,snakeLengthTwo,inpTwo,"curXTwo","curYTwo","curDirTwo",xArrTwo,yArrTwo);
    } else {
      clearInterval(timer);
      gameChoice = 3;
      $("#start-button").prop('disabled', false);
      if (!pOne && !pTwo) {
        ctx.font = "100px Arial";
        ctx.strokeText("DRAW",75,240);
      } else if (!pOne) {
        ctx.font = "70px Arial";
        ctx.strokeText("Player 2 Wins",8,240);
      } else if (!pTwo) {
        ctx.font = "70px Arial";
        ctx.strokeText("Player 1 Wins",8,240);
      }
      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.fillText("(Press ENTER play again!)",150,280);
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
        ctx.fillStyle = "white";
        ctx.strokeStyle = "blue";
      } else if (player == 2) {
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "white";
      }
      ctx.fillRect(xArr[i]+1,yArr[i]+1,SW-2,SW-2);
      ctx.strokeRect(xArr[i]+1,yArr[i]+1,SW-2,SW-2);
    }
  }

  function startGame() {
    gameChoice = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(160,170);
    ctx.lineTo(170,180);
    ctx.lineTo(160,190);
    ctx.fill();
    ctx.font = "60px sans-Serif";
    ctx.fillText("LITTLE SNAKE",14,100);
    ctx.font = "26px Arial";
    ctx.fillText("1 Player",190,190);
    ctx.fillText("2 Players",190,240);
    ctx.font = "12px Arial";
    ctx.fillText("(Press Enter to START)",160,300);
  }

  function onePlayer() {
    inpOne = "r";
    curDirOne = "r";
    scoreOne = 0;
    snakeLengthOne = 10;
    xArrOne = [];
    yArrOne = [];
    curXOne = 0;
    curYOne = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $(".Score").text("Score: "+ scoreOne);
    initSnake(1,snakeLengthOne,xArrOne,yArrOne,"curXOne","curYOne");
    createSnack(1);
    timer = setInterval(onePlay, speed);
  }

  function twoPlayer() {
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
    $(".Score").text("P1 Score: "+ scoreOne + " P2 Score: "+ scoreTwo);
    initSnake(1,snakeLengthOne,xArrOne,yArrOne,"curXOne","curYOne");
    initSnake(2,snakeLengthTwo,xArrTwo,yArrTwo,"curXTwo","curYTwo");
    createSnack(2);
    timer = setInterval(twoPlay, speed);
  }

  startGame();
});

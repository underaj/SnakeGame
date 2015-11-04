  

var SW = 5;
var snakeLengthOne = 10;
var scoreOne;
var curXOne;
var curYOne;
var snackX;
var snackY;
var xArrOne = [];
var yArrOne = [];
var inpOne = "r";
var curDirOne = "r";
var speed = 100;

$(document).ready(function(){
  var timer;

  $('#slider-number-range').slider({
    value: 50,
    max: 100,
    min: 0,
    step: 20,
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
    if (curDirOne == "l") {
      if (e.keyCode==38) {
        inpOne = "u";
      } else if (e.keyCode==40) {
        inpOne = "d";
      }
    } else if (curDirOne == "u") {
      if (e.keyCode==37) {
        inpOne = "l";
      } else if (e.keyCode==39) {
        inpOne = "r";
      }
    } else if (curDirOne == "r") {
      if (e.keyCode==38) {
        inpOne = "u";
      } else if (e.keyCode==40) {
        inpOne = "d";
      }
    } else if (curDirOne == "d") {
      if (e.keyCode==37) {
        inpOne = "l";
      } else if (e.keyCode==39) {
        inpOne = "r";
      }
    }
});

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var w=$('#canvas').width();
  var h=$('#canvas').height();

  function createSnack(snakeLength) {
    snackX = Math.floor(((w/SW)-1)*Math.random())*SW;
    snackY = Math.floor(((h/SW)-1)*Math.random())*SW;
    var match = false;
    for(var i = 0; i < snakeLength;i++) {
      if((snackX == xArrOne[i] && snackY == yArrOne[i])) {
        match = true;
      }
    }
    if (match == true) {
      createSnack();
    } else {
      ctx.fillStyle = "green";
      ctx.fillRect(snackX, snackY,SW,SW);
    }
  }

  function initSnake(snakeLength,xArr,yArr,curX) {
    for (var i = 0; i < snakeLength; i++) {
      ctx.fillStyle = "black";
      ctx.fillRect(i*5,0,SW,SW);
      xArr.unshift(i*5);
      yArr.unshift(0);
    }
    window[curX] = (snakeLength - 1) * 5;
    $("h5").text("Score: "+ scoreOne);
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
        moveSnake(snakeLengthOne,inpOne,"curXOne","curYOne","curDirOne",xArrOne,yArrOne);
        $("h5").text("Score: "+ scoreOne);
        createSnack(snakeLengthOne);
      }
      else {
        moveSnake(snakeLengthOne,inpOne,"curXOne","curYOne","curDirOne",xArrOne,yArrOne);
      }
    } else {
      clearInterval(timer);
      ctx.font = "30px Arial";
      ctx.strokeText("GAME OVER",10,100);
      $("#start-button").prop('disabled', false);
    }
  }

  function moveSnake(snakeLength,inp,curX,curY,curDir,xArr,yArr) {
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
    createSnake(snakeLength,xArr,yArr);
  }

  function createSnake(snakeLength,xArr,yArr) {
    for (var i = 0; i < snakeLength; i++) {
      ctx.fillStyle = "black";
      ctx.fillRect(xArr[i],yArr[i],SW,SW);
    }
  }

  function move () {
    
  }

  $(document).on('click','#start-button', function() {
    inpOne = "r";
    curDirOne = "r";
    scoreOne = 0;
    snakeLengthOne = 10;
    xArrOne = [];
    yArrOne = [];
    curXOne = 0;
    curYOne = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initSnake(snakeLengthOne,xArrOne,yArrOne,"curXOne");
    createSnack(snakeLengthOne);
    $("#start-button").prop('disabled', true);
    
    timer = setInterval(onePlay, speed);
  });

});


var buttons = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userPattern = [];

var gameStarted = false;
var level = 0;

//Game Starts
$(document).keypress(function() {
  if (gameStarted === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

$(document).click(function() {
  if (gameStarted === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});


//Computer show a sequence
function nextSequence() {
  userPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  // buttons Array Selector
  var randomColor = Math.floor((Math.random() * 4)); //0-3
  var buttonChoosen = buttons[randomColor];

  //Add buttonChoosen to the gamePattern
  gamePattern.push(buttonChoosen);

  //Animate the buttonChoosen
  $("#" + buttonChoosen).fadeOut(100, "linear").fadeIn(100, "linear");

  //Play Sound of the buttonChoosen
  playSound(buttonChoosen);
  console.log("buttonChoosen: " + buttonChoosen);
}


// User answers
$(".btn").click(function() {
  userButtonChosen = $(this).attr("id");
  userPattern.push(userButtonChosen);
  playSound(userButtonChosen);
  animateButton(userButtonChosen);
  checkAnswer(userPattern.length-1);
  console.log("userButtonChosen: " + userButtonChosen);
});

//Button Sound
function playSound(name) {
  var sound = new Audio("sounds/" + name +".mp3");
  sound.play();
}
//Button Animation
function animateButton(currentButton) {
  $("#" + currentButton).addClass("pressed");
  setTimeout(function() {
    $("#" + currentButton).removeClass("pressed");
  }, 100);
}

//Check user's answer
function checkAnswer(currentLevel) {
  //If the Computer's sequence is the same sequence of the user
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    //Make sure that the user finished
    console.log("Success");
    if (userPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  }else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    } , 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      gameOver();
    }, 1000);
    console.log("Loose");
  }

}

function gameOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

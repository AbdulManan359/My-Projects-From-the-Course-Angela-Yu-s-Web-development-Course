let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = "Level "
let n = 0;
function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn().fadeOut().fadeIn();
    playSound(randomChosenColor);
    let Level = level + n;
    $("h1").text(Level);
    n++;
}

$(".btn").on("click", function (event) {
    let userChosenColor = event.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    console.log("GamePattern is: " + gamePattern);
    console.log("User Clicked Pattern is: " + userClickedPattern);
})

function playSound(name) {
    let sound2 = new Audio("./sounds/" + name + ".mp3");
    sound2.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
let started = false;

$(document).on("keydown", function () {
    if (!started) {
        Level = level + n;
        $("h1").text(Level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("Success");

    } else {
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over! Press Any Key to start Again.");
        startOver();
    }

    if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}


function startOver() {
    n = 0;
    gamePattern = [];
    started = false;
}
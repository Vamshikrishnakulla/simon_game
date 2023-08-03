var gamePattern = [];
var userClickedPattern = [];
let randomChoosenColor;
let level;
let index;
const buttonColors = ["red", "green", "blue", "yellow"];

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    console.log(gamePattern);
    let element = $("#" + randomChoosenColor);
    element.animate({ opacity: '0.1' }, 100);
    element.animate({ opacity: '1.0' }, 100);
    playSound(randomChoosenColor);

}

function playSound(name) {
    var audioNext = new Audio("sounds/" + name + ".mp3");
    audioNext.play();
}

function checkGame(index) {
    let i = index - 1;

    if (gamePattern[i] == userClickedPattern[i]) {

        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            console.log("next level" + level + 1);
            setTimeout(nextSequence, 1000);
        }
    }
    else {

        console.log("wrong");
        gamePattern = [];
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any key to restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        level = undefined;

    }

}

function animatePress(color) {
    $("." + color).addClass('pressed');
    setTimeout(function () {
        $("." + color).removeClass('pressed');
    }, 100);
}

$(document).keydown(function () {
    if (level == undefined) {
        level = 0;
        nextSequence();
    }
});


$(".btn").click(function () {
    let userChoosedColor = this.id;
    index = userClickedPattern.push(userChoosedColor);
    console.log(userClickedPattern);
    checkGame(index);
    animatePress(userChoosedColor);
    playSound(userChoosedColor);
});


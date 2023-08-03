var userClickedPattern = [];
var gamePattern = [];
let level;
let index;
colorButtons = ["red","green","yellow","blue"];
let heading = document.querySelector("#level-title");

//mobile responsive text.
if(window.innerWidth <= 850){
    heading.textContent = "Start to play 🚩"
}

//adding click effects and playing sounds on button clicks using eventListener.
btns = document.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () { 
        let element = this;
        let color = element.getAttribute("id");
        {
          index = userClickedPattern.push(color);
          console.log(userClickedPattern);
          checkAnswer(index);
        }
        playSound(color);
        animate(element);
    });
}

//function to match the displayed color sequence.
function checkAnswer(index){
    let position = index -1;
    if(gamePattern[position] === userClickedPattern[position]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(nextSequence, 1000);
            console.log("level " + level);
        }
    }
    else{
        level = undefined;
        gamePattern = [];
        playSound("wrong");
        heading.textContent = "Game Over, press any key to restart.";
        document.body.classList.add("game-over");
        setTimeout(function(){
            document.body.classList.remove("game-over");
        },200);
        if(window.innerWidth <= 850){
            document.querySelector("#start-button").style.display = "inline-block";
            heading.textContent = "Game Over, press start to restart.";
        }
    }
}
//adding click effects to button clicks.
function animate(button){
    button.classList.add("pressed");
        setTimeout(function () {
            button.classList.remove("pressed")
        }, 100);
}

//listening to the button clicks on screen size below 850px.
document.querySelector("#start-button").addEventListener("click", initialCall);

//listening keyboard keys.
document.addEventListener("keydown", initialCall);

//initial call function to start the game.
function initialCall(){
    if(level === undefined){
        level = 0;
        document.querySelector("#start-button").style.display = "none";
        nextSequence();
      }
}

//showing random colors to remember the sequence.
function nextSequence(){
    level += 1;
    userClickedPattern = [];
    heading.textContent = "level " + level;
    let randomNumber = Math.floor(Math.random()*4);
    let choosenColor = colorButtons[randomNumber];
    gamePattern.push(choosenColor);
    console.log(gamePattern);
    playSound(choosenColor);
    let element = document.querySelector("#"+choosenColor);
    animate(element);
}

//playing related color sounds.
function playSound(audios){
    let audio = new Audio("sounds/" + audios + ".mp3");
    audio.play();
}

var gamePattern = [];
var userPattern = [];
var level = 0;

var gameStartedFlag = 1;
var clickflag = 0;
document.querySelector("html").addEventListener("keydown", function(evt){
    if((evt.key === "s" || evt.key === "S") && gameStartedFlag === 1){
        nextSequence();
        gameStartedFlag = 0;
    }
});

document.querySelector("#level-title").addEventListener("click", function(){
    if(gameStartedFlag === 1){
        nextSequence();
        gameStartedFlag = 0;
    }
});

var colorArr = ["red", "blue", "green", "yellow"];
function nextSequence(){
    clickflag = 0;
    level += 1;
    $("#level-title").text("Level "+level);
    var randomNum = parseInt(Math.random()*4);
    var randomColor = colorArr[randomNum];
    gamePattern.push(randomColor);
    var index = 0;
    gamePattern.forEach(el => {
        index+=1;
        setTimeout(() => {
            $("#"+el).fadeOut(100).fadeIn(150);
            var music = new Audio("sounds/"+el+".mp3");
            music.play();
        }, 600*index);
        setTimeout(() => {
            clickflag = 1;
        }, 200 + gamePattern.length*600);
        userPlay();
    });
}

function userClickResponse(){
    if(clickflag === 1){
        userColor = this.id;
        userPattern.push(userColor);
        setTimeout(() => {
            $("#"+userColor).toggleClass("pressed");
        }, 200);
        $("#"+userColor).toggleClass("pressed");
        var music = new Audio("sounds/"+userColor+".mp3");
        music.play();
        verifyAnswer();
    }
}

function verifyAnswer(){
    if(userPattern[userPattern.length -1] !== gamePattern[userPattern.length - 1]){
        var gameOverMusic = new Audio("sounds/wrong.mp3");
        gameOverMusic.play();
        setTimeout(() => {
            $("body").toggleClass("game-over");
        }, 400);
        $("body").toggleClass("game-over");
        document.getElementById("level-title").textContent = "🥺 Game Over Press S Key to Start";
        userPattern = [];
        gamePattern = [];
        level = 0;
        gameStartedFlag = 1;
    }
    else if(userPattern.length === gamePattern.length){
        userPattern = [];
        setTimeout(nextSequence, 500);
    }
}

function userPlay(){
    colorArr.forEach(el => {
        document.querySelector("#"+el).addEventListener("click", userClickResponse);
    });
}





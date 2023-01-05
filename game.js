var gamePattern = [];
var userClickedPattern = [];
var levelCount = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];

if(!started){
    $(document).keypress(function() {
        if(!started){
            $("#level-title").text("Level " + levelCount);
            nextSequence();
            started = true;
        }
    });
}

$(".btn").click(function() {
    var userChooseColor = $(this).attr("id");
    userClickedPattern.push(userChooseColor);
    playSound(userChooseColor);
    playAnimation(userChooseColor); 
    
    checkAnswer(userClickedPattern.length-1 );
});

function checkAnswer(levelCount) {
    if(gamePattern[levelCount] === userClickedPattern[levelCount]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        } 
    } else {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },1000);
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    levelCount ++;
    $("h1").text("Level " + levelCount);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function playAnimation(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    $("h1").text("Game Over, Press 'A' To restart");
    $(document).keypress(function() {
        levelCount = 0;
        gamePattern = []
        userClickedPattern = []
        $("#level-title").text("Level " + levelCount);
        setTimeout(function() {
            nextSequence();
        },500);
        started = true;
    });
}

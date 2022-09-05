var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern =[];
var i=0;
var started = false;

$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + i);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})
function nextSequence() {
    userClickedPattern=[];
    i++;
    $("#level-title").text("Level "+ i);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
    


};
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100)
}
function checkAnswer(currenLevel){
    if(gamePattern[currenLevel]===userClickedPattern[currenLevel]){
        if(currenLevel===gamePattern.length-1){
            
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    gamePattern=[];
    started=false;
    i=0;
}



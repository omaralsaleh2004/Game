var buttonColours =["red","yellow","green","blue"];

var gamePattern = [];

var userClickedPattern = [];

var level=0;

var started =false;

$(document).keypress(function(){
 
    if(!started){
     $("#level-title").text("Level " + level);
     nextSequence();
     started=true;
    }
});

function Start () {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
       }
       $(".startBtn").text("Start");
}
$(".btn").click(function() {
   var userChosenColour = $(this).attr("id");

   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   
   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
   $("."+currentColor).removeClass("pressed");
  },200);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
     if(gamePattern.length === userClickedPattern.length){

         setTimeout(function(){
          nextSequence();
         },1000);
     }
    }
    else{
            
        playSound("wrong");
      $("body").addClass("game-over");

      setTimeout(function(){
       $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart or Restert button");
       startOver();
      $(".startBtn").text("Restart");
    }
} 

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}




function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
   
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);    
    playSound(randomChosenColour);
    
}


function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}

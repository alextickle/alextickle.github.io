// bind all cells to event handlers
$(document).ready(function(){
  $(".cells").click(function(){
    if (!gameOver){
      check($(this).attr("id"));
    };
  });
  $(".cells").hover(function(){
    $(this).addClass("hover");
  }, function(){
    $(this).removeClass("hover");
  });
});

// declare two arrays with three random numbers each to hold the locations
// of the three bombs and three treasures

var bombLocation= [Math.floor(Math.random()*25), Math.floor(Math.random()*25), Math.floor(Math.random()*25)];
var treasureLocation= [Math.floor(Math.random()*25), Math.floor(Math.random()*25), Math.floor(Math.random()*25)];
var counter = 25;
var treasureCounter = 0;
var gameOver = false;
var effects = ["explosion.mp3", "applause.mp3"];

// checks to see if all elements in an array are different and randomizes them if they aren't. Recursively calls itself until each element is unique
function checkSelf(locations){
  if (locations[0] === locations[1] || locations[1] === locations[2] || locations[0] === locations[2]){
    for (var i = 0; i < 3; i++){
      locations[i] = Math.floor(Math.random()*25);
    }
    checkSelf(locations);
  }
}

// checks to see if the bomb and treasure arrays share any elements
function compareLocations(bomb, treasure){
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (bomb[i] === treasure[j]){
        treasure[j] = Math.floor(Math.random()*25);
        compareLocations(bomb, treasure);
      }
    }
  }
}

console.log(bombLocation, treasureLocation);

function isBomb(id){
  for (var i = 0; i < 3; i++){
    if (id == bombLocation[i]){
      return true;
    }
  }
  return false;
}

function isTreasure(id){
  for (var i = 0; i < 3; i++){
    if (id == treasureLocation[i]){
      return true;
    }
  }
  return false;
}

function check(id){
  if (isTreasure(id)){
    $("#" + id).text("$");
    $("#" + id).removeClass("cells");
    $("#" + id).addClass("treasure");
    treasureCounter++;
    if (treasureCounter === 1){
      $("#chat").text("You found a treasure!");
    }
    if (treasureCounter === 2){
      $("#chat").text("One more treasure to go!");
    }
    if (treasureCounter === 3){
      play(1);
      $("#chat").text("You win!");
      gameOver = true;
      $(".cells").text("-");
      $(".cells").removeClass("cells");
      $("#12").html("<a href='treasureHunt.html'><input type='button' value='Play Again'/></a>");
    }
  }
  else if(isBomb(id)){
    play(0);
    $("#" + id).text("B");
    $("#" + id).removeClass("cells");
    $("#" + id).addClass("bomb");
    $("#chat").text("You Lose!");
    gameOver = true;
    $(".cells").text("-");
    $(".cells").removeClass("cells");
    $("#12").html("<a href='treasureHunt.html'><input type='button' value='Play Again'/></a>");
  }
  else {
    $("#" + id).text("X");
    $("#" + id).addClass("empty");
    $("#" + id).removeClass("cells");
    counter -= 1;
    $("#counter").text(counter);
  }
}

// for sound effects
function play(num){
	var audio = document.getElementById("audio");
	$("#musicPlayer").attr("src", "../media/effects/" + effects[num]);
	audio.load();
	audio.play();
}

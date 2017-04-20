$(document).ready(function(){
	$("button").click(function(){
		if (!gameOver){
			playerChoice = $(this).attr("id");
			$("#r").removeClass("unselected");
			$("#p").removeClass("unselected");
			$("#s").removeClass("unselected");
			$("#" + selections[playerChoice]).addClass("playerSelected");
			$("#" + selections[computerChoice]).addClass("computerSelected");
			compare(images[playerChoice], images[computerChoice]);
		}
		$("#playAgain").html("<a href='rockPaperScissors.html'><input type='button' value='Play Again'/></a>");
	});
});

var playerChoice;
var gameOver = false;
var images = ["rock", "paper", "scissors"]
var selections = ['r', 'p', 's'];
var computerChoice = Math.floor(Math.random() * 3);

var compare = function(choice1, choice2){
    if (choice1 === choice2){
        $("#summary").text("It's a tie! Computer also picked " + choice1 + ".");
				gameOver = true;
    }

    else if (choice1 === "rock"){
        if (choice2 === "scissors"){
            $("#summary").text("You win! Rock beats Scissors.");
        }
        else {
            $("#summary").text("You lose! Paper beats rock.");
        }
				gameOver = true;
    }

    else if (choice1 === "paper"){
        if (choice2 === "rock"){
            $("#summary").text("You win! Paper beats rock.");
        }
        else {
            $("#summary").text("You lose! Scissors beats paper.");
        }
				gameOver = true;
    }

    else {
				if (choice2 === "paper"){
				    $("#summary").text("You win! Scissors beats paper.");
				}
				else {
			      $("#summary").text("You lose! Rock beats scissors.");
				}
				gameOver = true;
		}
};

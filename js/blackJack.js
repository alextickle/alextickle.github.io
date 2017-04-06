$(document).ready(function(){
  $("#start").click(function(){
    $("#start").attr("class", "inactive");
    playGame();
  })
  $("#hit").click(function(){
    playerHand[playerHand.length] = drawCard();
    displayHand(playerHand);
    if (getHandValue(playerHand) < 21){
      $("#dealerComment").text("Hit or stay?");
    }
    else {
      $("#hit").attr("class", "inactive");
      $("#stay").attr("class", "inactive");
      endOfGame();
    }
  });
  $("#stay").click(function(){
    $("#hit").attr("class", "inactive");
    $("#stay").attr("class", "inactive");
    dealerPlay();
    endOfGame();
  });
});

var printL = function(){
  console.log("lllll");
}

var Cards = [];

// Card object constructor
function Card(name, value, filename){
	this.name = name;
	this.value = value;
  this.filename = filename;
}

// Clubs
Cards[0] = new Card("Ace of Clubs", 1, "ace_of_clubs.png");
Cards[1] = new Card("Two of Clubs", 2, "2_of_clubs.png");
Cards[2] = new Card("Three of Clubs", 3, "3_of_clubs.png");
Cards[3] = new Card("Four of Clubs", 4, "4_of_clubs.png");
Cards[4] = new Card("Five of Clubs", 5, "5_of_clubs.png");
Cards[5] = new Card("Six of Clubs", 6, "6_of_clubs.png");
Cards[6] = new Card("Seven of Clubs", 7, "7_of_clubs.png");
Cards[7] = new Card("Eight of Clubs", 8, "8_of_clubs.png");
Cards[8] = new Card("Nine of Clubs", 9, "9_of_clubs.png");
Cards[9] = new Card("Ten of Clubs", 10, "10_of_clubs.png");
Cards[10] = new Card("Jack of Clubs", 10, "jack_of_clubs.png");
Cards[11] = new Card("Queen of Clubs", 10, "queen_of_clubs.png");
Cards[12] = new Card("King of Clubs", 10, "king_of_clubs.png");

// Spades
Cards[13] = new Card("Ace of Spades", 1, "ace_of_spades.png");
Cards[14] = new Card("Two of Spades", 2, "2_of_spades.png");
Cards[15] = new Card("Three of Spades", 3, "3_of_spades.png");
Cards[16] = new Card("Four of Spades", 4, "4_of_spades.png");
Cards[17] = new Card("Five of Spades", 5, "5_of_spades.png");
Cards[18] = new Card("Six of Spades", 6, "6_of_spades.png");
Cards[19] = new Card("Seven of Spades", 7, "7_of_spades.png");
Cards[20] = new Card("Eight of Spades", 8, "8_of_spades.png");
Cards[21] = new Card("Nine of Spades", 9, "9_of_spades.png");
Cards[22] = new Card("Ten of Spades", 10, "10_of_spades.png");
Cards[23] = new Card("Jack of Spades", 10, "jack_of_spades.png");
Cards[24] = new Card("Queen of Spades", 10, "queen_of_spades.png");
Cards[25] = new Card("King of Spades", 10, "king_of_spades.png");

// Hearts
Cards[26] = new Card("Ace of Hearts", 1, "ace_of_hearts.png");
Cards[27] = new Card("Two of Hearts", 2, "2_of_hearts.png");
Cards[28] = new Card("Three of Hearts", 3, "3_of_hearts.png");
Cards[29] = new Card("Four of Hearts", 4, "4_of_hearts.png");
Cards[30] = new Card("Five of Hearts", 5, "5_of_hearts.png");
Cards[31] = new Card("Six of Hearts", 6, "6_of_hearts.png");
Cards[32] = new Card("Seven of Hearts", 7, "7_of_hearts.png");
Cards[33] = new Card("Eight of Hearts", 8, "8_of_hearts.png");
Cards[34] = new Card("Nine of Hearts", 9, "9_of_hearts.png");
Cards[35] = new Card("Ten of Hearts", 10, "10_of_hearts.png");
Cards[36] = new Card("Jack of Hearts", 10, "jack_of_hearts.png");
Cards[37] = new Card("Queen of Hearts", 10, "queen_of_hearts.png");
Cards[38] = new Card("King of Hearts", 10, "king_of_hearts.png");

// Diamonds
Cards[39] = new Card("Ace of Diamonds", 1, "ace_of_diamonds.png");
Cards[40] = new Card("Two of Diamonds", 2, "2_of_diamonds.png");
Cards[41] = new Card("Three of Diamonds", 3, "3_of_diamonds.png");
Cards[42] = new Card("Four of Diamonds", 4, "4_of_diamonds.png");
Cards[43] = new Card("Five of Diamonds", 5, "5_of_diamonds.png");
Cards[44] = new Card("Six of Diamonds", 6, "6_of_diamonds.png");
Cards[45] = new Card("Seven of Diamonds", 7, "7_of_diamonds.png");
Cards[46] = new Card("Eight of Diamonds", 8, "8_of_diamonds.png");
Cards[47] = new Card("Nine of Diamonds", 9, "9_of_diamonds.png");
Cards[48] = new Card("Ten of Diamonds", 10, "10_of_diamonds.png");
Cards[49] = new Card("Jack of Diamonds", 10, "jack_of_diamonds.png");
Cards[50] = new Card("Queen of Diamonds", 10, "queen_of_diamonds.png");
Cards[51] = new Card("King of Diamonds", 10, "king_of_diamonds.png");

// instantiate two hand arrays
var playerHand = [];
var dealerHand = [];

// returns a random Card Object
var drawCard = function(){
	return Cards[Math.floor(Math.random() * 52)];
};

// returns the value of a given hand
var getHandValue = function(hand){
	var handValue = 0;
	for (var j = 0; j < hand.length; j++){
		if (hand[j].value === 1 && handValue < 11){
			handValue += 11;
		}
		else {
			handValue += hand[j].value;
		}
	}

	if (handValue > 21){
		handValue = 0;
		for (var k = 0; k < hand.length; k++){
			handValue += hand[k].value;
		}
	}
	return handValue;
};

// displays the name of each card in a hand and the hand's total value
var displayHand = function(hand){
  if (hand === playerHand){
    for (var i = 0; i < hand.length; i++){
  		$("#p" + i).attr("src", "../media/cards/" + hand[i].filename);
  	}
  }
  else {
    for (var i = 0; i < hand.length; i++){
  		$("#d" + i).attr("src", "../media/cards/" + hand[i].filename);
  	}
  }
};

// return true if a hand busts (exceeds 21)
var bust = function(handValue){
	if (handValue > 21){
		return true;
	}
	else {
		return false;
	}
};

var dealerPlay = function(){
  $("#dealerComment").text("Dealer shows his second card...");
  dealerHand[dealerHand.length] = drawCard();
  displayHand(dealerHand);
  while (getHandValue(dealerHand) < getHandValue(playerHand)){
    $("#dealerComment").text("Dealer draws...");
    dealerHand[dealerHand.length] = drawCard();
    displayHand(dealerHand);
  }
};

var endOfGame = function(){
  // end of game messages
	if (getHandValue(playerHand === 21)){
		$("#dealerComment").text("Player wins!");
	}
	else if (bust(getHandValue(playerHand))){
		$("#dealerComment").text("Dealer wins!");
	}
	else if (bust(getHandValue(dealerHand))){
		$("#dealerComment").text("Player wins!");
	}
	else if (getHandValue(playerHand) >= getHandValue(dealerHand)){
		$("#dealerComment").text("Player wins!");
	}
	else {
		$("#dealerComment").text("Dealer wins!");
	}
  $("#replay").attr("class", "active");
};

var playGame = function(){
  // begin game by drawing two cards per player
  playerHand[playerHand.length] = drawCard();
  playerHand[playerHand.length] = drawCard();
  dealerHand[dealerHand.length] = drawCard();
  displayHand(playerHand);
  displayHand(dealerHand);
  $("#d1").attr("src", "../media/cards/card-back.jpg");

  // if player did not get 21 on initial deal then ask to hit or stay
  if (getHandValue(playerHand) < 21){
  	$("#hit").attr("class", "active");
    $("#stay").attr("class", "active");
    $("#dealerComment").text("Hit or stay?");
  }
  else {
    endOfGame();
  }
}

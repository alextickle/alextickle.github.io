var today = new Date();
var hourNow = today.getHours();
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var dateMessage = "Today is " + days[today.getDay()] + ", " + months[today.getMonth()] + ' ' + today.getDate();
var greeting;
var colors = ["blue", "red", "green", "yellow"];
var pics = ["comoe.JPG", "slug.jpeg", "beard.JPG", "disney.jpg", "paco.JPG"]
var songs = ["Avant Gardener.mp3", "Terry Riley - A Rainbow in Curved Air.mp3",
			"Talking Heads - Moon Rocks.mp3", "Lake Street Dive - Rich Girl (Live at Pickathon 2013).mp3"];
var colorIndex = 0;
var picIndex = 0;

function greeting(){
	if (hourNow > 18){
		greeting = 'Good evening!';
	}

	else if (hourNow > 12){
		greeting = 'Good afternoon!';
	}

	else if (hourNow > 0){
		greeting = 'Good morning!';
	}

	else {
		greeting = 'Welcome!';
	}
	$("#welcome").text(greeting);
}


$(document).ready(function(){
	$("#date").text(dateMessage);
	$("#headerColor").click(function(){
		changeHeaderColor();
	});
	greeting();
	$("#previous").click(function(){
		previousPic();
	});
	$("#next").click(function(){
		nextPic();
	});
	$("#but1").click(function(){
		play(0);
	});
	$("#but2").click(function(){
		play(1);
	});
	$("#but3").click(function(){
		play(2);
	});
	$("#but4").click(function(){
		play(3);
	});
});


function changeHeaderColor(){
	if (colorIndex == colors.length - 1){
		colorIndex = 0;
	}
	else {
		colorIndex += 1;
	}
	$("#welcome").attr("style", "color: " + colors[colorIndex]);
}

function nextPic(){
	if (picIndex == pics.length - 1){
		picIndex = 0;
	}
	else {
		picIndex += 1;
	}
	$("#picOfMe").attr("src", "media/" + pics[picIndex]);
}

function previousPic(){
	if (picIndex == 0){
		picIndex = pics.length - 1;
	}
	else {
		picIndex -= 1;
	}
	$("#picOfMe").attr("src", "media/" + pics[picIndex]);
}

function play(num){
	var audio = document.getElementById("audio");
	$("#musicPlayer").attr("src", "media/music/" + songs[num]);
	audio.load();
	audio.play();
}

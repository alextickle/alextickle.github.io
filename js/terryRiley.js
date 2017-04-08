$(document).ready(function(){
  $("#persianHeader").mouseover(function(){
    $("#terryHeader").css("background-color", "purple");
  });
  $("#rainbowHeader").mouseover(function(){
    $("#terryHeader").css("background-color", "blue");
  });
  $("#inCHeader").mouseover(function(){
    $("#terryHeader").css("background-color", "green");
  });
  $("#rainbow").click(function(){
    $("#albumCover").attr("src", "../media/" + albumCovers[2]);
    $("#musicPlayer").attr("src", "../media/music/" + songs[1]);
    document.getElementById("musicPlayer").load();
  	document.getElementById("musicPlayer").play();
  });
  $("#inC").click(function(){
    $("#albumCover").attr("src", "../media/" + albumCovers[1]);
    $("#musicPlayer").attr("src", "../media/music/" + songs[0]);
    document.getElementById("musicPlayer").load();
  	document.getElementById("musicPlayer").play();
  });
  $("#persian").click(function(){
    $("#albumCover").attr("src", "../media/" + albumCovers[0]);
    $("#musicPlayer").attr("src", "../media/music/" + songs[2]);
    document.getElementById("musicPlayer").load();
  	document.getElementById("musicPlayer").play();
  });
});

var albumCovers = ["persian_surgery.jpg", "inC.jpg", "rainbow.jpeg"];
var songs = ["Terry Riley - In C.mp3", "Terry Riley - A Rainbow in Curved Air.mp3",
			"Terry Riley - Persian Surgery Dervishes.mp3"];

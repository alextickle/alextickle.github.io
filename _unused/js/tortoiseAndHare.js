$(document).ready(function(){
  timerId = setInterval(function(){moveBoth()}, 1000);
});

var random;
var timerId;
var tortoisePos = 0;
var harePos = 0;

var moveBoth = function(){
  moveTortoise();
  moveHare();
  console.log($("#hareImage").offset().left);
  console.log($("#tortoiseImage").offset().left);
  console.log('---------');
}

var pastFinish = function(pos){
  if (pos > 115){
    return true;
  }
  else {
    return false;
  }
}

var behindStart = function(pos){
  if (pos < 0){
    return true;
  }
  else {
    return false;
  }
}

var moveTortoise = function(){
  random = Math.floor(Math.random() * 10);
  if (random <= 5){
    if (pastFinish(tortoisePos + 3)){
      $("#tortoiseImage").animate({left: "+=" + (115 - tortoisePos) + "%"});
      tortoisePos = 115;
    }
    else {
      $("#tortoiseImage").animate({left: "+=3%"});
      tortoisePos +=3;
    }
  }
  else if (random <= 7){
    if (behindStart(tortoisePos - 1)){
      $("#tortoiseImage").animate({left: "-=" + tortoisePos + "%"});
      tortoisePos = 0;
    }
    else {
      $("#tortoiseImage").animate({left: "-=1%"});
      tortoisePos -= 1;
    }
  }
  else{
    if (pastFinish(tortoisePos + 1)){
      $("#tortoiseImage").animate({left: "+=" + (115 - tortoisePos) + "%"});
      tortoisePos = 115;
    }
    else {
      $("#tortoiseImage").animate({left: "+=2%"});
      tortoisePos += 2;
    }
  }
  if (tortoisePos >= 115){
    clearInterval(timerId);
  }
};

var moveHare = function(){
  random = Math.floor(Math.random() * 10);
  switch (random){
    case 1:
      if (pastFinish(harePos + 9)){
        $("#hareImage").animate({left: "+=" +  (115 - harePos) + "%"});
        harePos = 115;
      }
      else {
        $("#hareImage").animate({left: "+=9%"});
        harePos += 9;
      }
      break;
    case 2:
      if (pastFinish(harePos + 9)){
        $("#hareImage").animate({left: "+=" + (115 - harePos) + "%"});
        harePos = 115;
      }
      else {
        $("#hareImage").animate({left: "+=9%"});
        harePos += 9;
      }
      break;
    case 3:
      if (pastFinish(harePos + 9)){
        $("#hareImage").animate({left: "+=" + (115 - harePos) + "%"});
        harePos = 115;
      }
      else {
        $("#hareImage").animate({left: "+=9%"});
        harePos += 9;
      }
      break;
    case 4:
      if (pastFinish(harePos + 9)){
        $("#hareImage").animate({left: "+=" + (115 - harePos) + "%"});
        harePos = 115;
      }
      else {
        $("#hareImage").animate({left: "+=9"});
        harePos += 9;
      }
      break;
    case 5:
      if (behindStart(harePos - 12)){
        $("#hareImage").animate({left: "-=" + harePos + "%"});
        harePos = 0;
      }
      else {
        $("#hareImage").animate({left: "-=12%"});
        harePos -= 12;
      }
      break;
    case 6:
      if (pastFinish(harePos + 1)){
        $("#hareImage").animate({left: "+=" + (115 - harePos) + "%"});
        harePos = 115;
      }
      else {
        $("#hareImage").animate({left: "+=1%"});
        harePos += 1;
      }
      break;
    case 7:
      if (pastFinish(harePos + 1)){
        $("#hareImage").animate({left: "+=" + (115 - harePos) + "%"});
        harePos = 115;
      }
      else {
        $("#hareImage").animate({left: "+=1%"});
        harePos += 1;
      }
      break;
    case 8:
      if (pastFinish(harePos + 1)){
        $("#hareImage").animate({left: "+=" + (115 - harePos) + "%"});
        harePos = 115;
      }
      else {
        $("#hareImage").animate({left: "+=1%"});
        harePos += 1;
      }
      break;
    case 9:
      if (behindStart(harePos - 2)){
        $("#hareImage").animate({left: "-=" + harePos + "%"});
        harePos = 0;
      }
      else {
        $("#hareImage").animate({left: "-=2"});
        harePos -= 2;
      }
      break;
    case 10:
      if (behindStart(harePos - 2)){
        $("#hareImage").animate({left: "-=" + harePos + "%"});
        harePos = 0;
      }
      else {
        $("#hareImage").animate({left: "-=2"});
        harePos -= 2;
      }
      break;
  }
  if (harePos >= 115){
    clearInterval(timerId);
  }
};

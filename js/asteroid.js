var points = 0;
var pointCountTimer;
var laserCharge = 0;

function initGrid(){
  var grid = document.getElementById("grid")
  var currentRow;
  var currentCell;
  for (var i = 0; i < 20; i++) {
    currentRow = grid.insertRow(i);
    for (var j = 0; j < 20; j++) {
      currentCell= currentRow.insertCell(j)
      currentCell.id = i + "-" + j;
    }
  }
}

function initLaserChargeBar(){
  var laserChargeBar = document.getElementById("laserChargeBar")
  var currentRow;
  var currentCell;
  for (var i = 0; i < 15; i++) {
    currentRow = laserChargeBar.insertRow(0);
    currentCell = currentRow.insertCell(0);
    currentCell.id = "l" + i;
  }
}

var state = {
  grid: [],
  manPos: 10,
  asteroidTimer: "",
  level: 1,
  render: function(){
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        if (this.grid[i][j] == "a"){
          document.getElementById(i + "-" + j).setAttribute("class", "asteroid");
        }
        else if (this.grid[i][j] == "m"){
          document.getElementById(i + "-" + j).setAttribute("class", "man");
        }
        else if (this.grid[i][j] == "l"){
          document.getElementById(i + "-" + j).setAttribute("class", "laser");
        }
        else {
          document.getElementById(i + "-" + j).setAttribute("class", "blank");
        }
      }
    }

    // points
    document.getElementById("points").innerHTML = points;
    var newLevel = Math.floor(points / 5000) + 1;
    if (newLevel != state.level){
      state.level++;
      console.log("level change: " + state.level);
      clearTimeout(state.asteroidTimer);
      startAsteroids();
    }
    // laser charge
    for (var i = 0; i < 15; i++) {
      if (i <= laserCharge){
        document.getElementById("l" + i).setAttribute("class", "laser");
      }
      else {
        document.getElementById("l" + i).setAttribute("class", "blank");
      }
    }
    if (laserCharge == 14){
      document.getElementById("laserChargeText").innerHTML = "CHARGED";
      document.getElementById("laserChargeText").setAttribute("class", "charged");
    }

  },
  gravity: function(){
    for (var i = 19; i >= 0; i--) {
      for (var j = 0; j < 20; j++) {
        if (this.grid[i][j] == "a"){
          if (i == 19 && this.grid[i][j] != "m"){
            this.grid[i][j] = "";
          }
          else {
            this.grid[i][j] = "";
            this.grid[i + 1][j] = "a";
          }
        }
      }
    }
    if (!manAlive()){
      clearTimeout(state.asteroidTimer);
      clearTimeout(pointCountTimer);
      $(document).unbind("keydown");
    }
  },
  currentLaser: {
      column: this.manPos,
      row: 18,
      timer: ""
  }
}

function manAlive(){
  var alive = false;
  for (var i = 19; i >= 0; i--) {
    for (var j = 0; j < 20; j++) {
      if (state.grid[i][j] == "m"){
        alive = true;
      }
    }
  }
  return alive;
}

function generateAsteroid(){
  var initialPosition = Math.floor(Math.random() * 20);
  state.gravity();
  state.grid[0][initialPosition] = "a";
  state.render();
}

function moveRight(){
  if (state.manPos == 19){
    if (state.grid[19][0] != "a"){
      state.grid[19][0] = "m";
    }
    state.grid[19][19] = "";
    state.manPos = 0;
  }
  else {
    if (state.grid[19][state.manPos + 1] != "a"){
      state.grid[19][state.manPos + 1] = "m";
    }
    state.grid[19][state.manPos] = "";
    state.manPos += 1;
  }
  state.render();
}

function moveLeft(){
  if (state.manPos == 0){
    if (state.grid[19][19] != "a"){
      state.grid[19][19] = "m";
    }
    state.grid[19][0] = "";
    state.manPos = 19;
  }
  else {
    if (state.grid[19][state.manPos - 1] != "a"){
      state.grid[19][state.manPos - 1] = "m";
    }
    state.grid[19][state.manPos] = "";
    state.manPos -= 1;
  }
  state.render();
}

function startAsteroids(){
  state.asteroidTimer = setInterval(generateAsteroid, 500 * (Math.pow(.75, state.level)));
}

function fireLaser(){
  var laserTimer = setInterval(laserAdvances, 50)
  state.currentLaser.timer = laserTimer;
  state.currentLaser.column = state.manPos;
}

function laserAdvances(){
  if (state.currentLaser.row > 0){
    state.grid[state.currentLaser.row - 1][state.currentLaser.column] = "l";
    state.currentLaser.row -= 1;
  }
  else {
    clearTimeout(state.currentLaser.timer);
    for (var row = 0; row < 19; row++){
      state.grid[row][state.currentLaser.column] = "";
      state.render();
      state.currentLaser.row = 18;
    }
    document.getElementById("laserChargeText").innerHTML = "Laser charging...";
    $("#laserChargeText").removeClass("charged");
  }
  state.render();
}

function populateGrid(){
  var array = [];
  var currentRow;
  for (var i = 0; i < 20; i++){
    currentRow = [];
    array.push(currentRow);
    for (var j = 0; j < 20; j++){
      currentRow.push("");
    }
  }
  state.grid = array;
  state.grid[19][10] = "m";
}

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        moveLeft();
        break;

        case 38: // up
        if (laserCharge == 14){
          fireLaser();
          laserCharge = 0;
          document.getElementById("laserChargeText").innerHTML = "ZAP!"
        }
        break;

        case 39: // right
        moveRight()
        break;

        default: return;
    }
    e.preventDefault();
});

function incrementPoints(){
  points += 100 * (1 + state.level * .25);
  if (laserCharge < 14){
    laserCharge += 1;
  }
}

function startPointCount(){
  pointCountTimer = setInterval(incrementPoints, 1000);
}

$(document).ready(function(){
  initGrid();
  initLaserChargeBar();
  startPointCount();
  populateGrid();
  startAsteroids();
});

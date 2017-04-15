$(document).ready(function(){
  // call to initGrids starts program
  initGrids();
  shipToPlace.updateHighlightOnclicks();
});


var targetShips = [];
var myShips = [];

// holds all shot locations that the computer has taken. Computer checks against this list when considering a shot
var computerShots = [];

var audio = document.getElementById("audio");

function initGrids(){
  var targetGrid = document.getElementById("grid")
  var myGrid = document.getElementById("myGrid")
  var targetCurrentRow;
  var targetCurrentCell;
  var myCurrentRow;
  var myCurrentCell;
  for (var i = 0; i < 10; i++) {
    targetCurrentRow = targetGrid.insertRow(i);
    myCurrentRow = myGrid.insertRow(i);
    for (var j = 0; j < 10; j++) {
      targetCurrentCell = targetCurrentRow.insertCell(j)
      targetCurrentCell.setAttribute("id", i+"-"+j)
      myCurrentCell = myCurrentRow.insertCell(j)
      myCurrentCell.setAttribute("id", i+"_"+j);
    }
  }
}

function populateGridArray(value){
  var array = [];
  var currentRow;
  for (var i = 0; i < 10; i++){
    currentRow = [];
    array.push(currentRow);
    for (var j = 0; j < 10; j++){
      currentRow.push(value);
    }
  }
  return array;
};

function createShips(shipArray, board){
  var randomRow;
  var randomColumn;
  var shipNames = ["Patrol Boat", "Submarine", "Destroyer", "Battleship", "Aircraft Carrier"];
  var shipLengths = [2, 3, 3, 4, 5];
  var shipLocations = [];
  var testCase;
  for (var k = 0; k < shipLengths.length; k++){
    randomRow = Math.floor(Math.random() * 10);
    randomColumn = Math.floor(Math.random() * 10);
    testCase = isPlacementValid([randomRow, randomColumn], shipLengths[k], shipArray);
    while (!testCase.valid){
      randomRow = Math.floor(Math.random() * 10);
      randomColumn = Math.floor(Math.random() * 10);
      testCase = isPlacementValid([randomRow, randomColumn], shipLengths[k], shipArray);
    }

    if (testCase.direction == "north"){
      for (var i = 0; i < shipLengths[k]; i++){
        shipLocations.push([randomRow - i, randomColumn]);
      }
    }
    else if (testCase.direction == "south"){
      for (var i = 0; i < shipLengths[k]; i++){
        shipLocations.push([randomRow + i, randomColumn]);
      }
    }
    else if (testCase.direction == "west"){
      for (var i = 0; i < shipLengths[k]; i++){
        shipLocations.push([randomRow, randomColumn - i]);
      }
    }
    else {
      for (var i = 0; i < shipLengths[k]; i++){
        shipLocations.push([randomRow, randomColumn + i]);
      }
    }
    shipArray.push(createShip(shipLocations, shipLengths[k]));
    shipLocations = [];
  }
  shipArray.forEach(function(ship, i){
    ship.cellsOccupied.forEach(function(location){
      board.gridState[location[0]][location[1]] = "s";
      if (board == myGrid){
        document.getElementById(location[0] + "_" + location[1]).setAttribute("class", "ship");
      }
    });
    ship.name = shipNames[i];
  });
}

function disableOnClicks(){
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      document.getElementById(i + "-" + j).removeAttribute("onclick");
    }
  }
}

function enableOnClicks(){
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      document.getElementById(i + "-" + j).setAttribute("onclick", "handleClick([" + i + "," + j + "])");
    }
  }
}

function createShip(shipLocation, shipLength){
  return {
    length: shipLength,
    cellsOccupied: shipLocation,
    name: "",
    health: shipLength,
    // 'contains' returns true if aLocation is within the cellsOccupied array
    contains: function(aLocation){
      for (var i = 0; i < this.cellsOccupied.length; i++){
        if (this.cellsOccupied[i][0] == aLocation[0] && this.cellsOccupied[i][1] == aLocation[1]){
          return true;
        }
      }
      return false;
    }
  }
}

function isPlacementValid(anArray, shipLength, shipArray){
  var isNorthValid = true;
  var isEastValid = true;
  var isSouthValid = true;
  var isWestValid = true;
  var validDirections = [];
  var row = anArray[0];
  var column = anArray[1];
  var length = shipLength;
  var locationsToCheck = [];

  // check north direction
  // if there's not enough room to the north, set isNorthValid to false
  if (row < length - 1){
    isNorthValid = false;
  }
  else {
    // check gameState.gridState to see if we will overlap any ships
    for (var i = 0; i < length; i++){
      locationsToCheck.push([row - i, column])
    }
    shipArray.forEach(function(ship){
      locationsToCheck.forEach(function(location){
        if (ship.contains(location)){
          isNorthValid = false;
        }
      });
    });
  }
  locationsToCheck = [];

  // check east direction
  // if there's not enough room to the east, set isEastValid to false
  if ((column - 1)+ length > 9){
    isEastValid = false;
  }
  else {
    // check gameState.gridState to see if we will overlap any ships
    for (var i = 0; i < length; i++){
      locationsToCheck.push([row, column + i])
    }
    shipArray.forEach(function(ship){
      locationsToCheck.forEach(function(location){
        if (ship.contains(location)){
          isEastValid = false;
        }
      });
    });
  }
  locationsToCheck = [];

  // check south direction
  // if there's not enough room to the east, set isSouthValid to false
  if (row + length > 9){
    isSouthValid = false;
  }
  else {
    // check gameState.gridState to see if we will overlap any ship
    for (var i = 0; i < length; i++){
      locationsToCheck.push([row + i, column])
    }
    shipArray.forEach(function(ship){
      locationsToCheck.forEach(function(location){
        if (ship.contains(location)){
          isSouthValid = false;
        };
      });
    });
  }
  locationsToCheck = [];

  // check west direction
  // if there's not enough room to the west, set isWestValid to false
  if (column < length - 1){
    isWestValid = false;
  }
  else {
    // check gameState.gridState to see if we will overlap any ships
    for (var i = 0; i < length; i++){
      locationsToCheck.push([row, column - i])
    }
    shipArray.forEach(function(ship){
      locationsToCheck.forEach(function(location){
        if (ship.contains(location)){
          isWestValid = false;
        }
      });
    });
  }

  if (isNorthValid){
    validDirections.push("north");
  }
  if (isEastValid){
    validDirections.push("east");
  }
  if (isSouthValid){
    validDirections.push("south");
  }
  if (isWestValid){
    validDirections.push("west");
  }
  return {
    valid: isNorthValid || isEastValid || isSouthValid || isWestValid,
    direction: validDirections[Math.floor(Math.random() * validDirections.length)],
    allValidDirections: validDirections
  }
}

// gameState object manages the state of the top (target) grid
var gameState = {
  gridState: populateGridArray(""),
  hits: 0,
  shipLocations: [],
  render: function(){
    for (var i = 0; i < 10; i++){
      for (var j = 0; j < 10; j++){
        if (this.gridState[i][j] == "h"){
          document.getElementById(i+"-"+j).setAttribute("class", "hit");
        }
        else if (this.gridState[i][j] == "m"){
          document.getElementById(i+"-"+j).setAttribute("class", "miss");
        }
      }
    }
  }
};

// myGrid object manages the state of the bottom (player) grid
var myGrid = {
  gridState: populateGridArray(""),
  searchPriorityIndices: populateGridArray(0),
  indicesAndLocations: [],
  shipLocations: [],
  hits: 0,
  render: function(){
    for (var i = 0; i < 10; i++){
      for (var j = 0; j < 10; j++){
        if (this.gridState[i][j] == "h"){
          document.getElementById(i+"_"+j).setAttribute("class", "hit");
        }
        else if (this.gridState[i][j] == "m"){
          document.getElementById(i+"_"+j).setAttribute("class", "miss");
        }
      }
    }
  },
  listObstacles: function(){
    var arrayToReturn = []
    for (var i = 0; i < 10; i++){
      for (var j = 0; j < 10; j++){
        if (this.gridState[i][j] == "m" || this.gridState[i][j] == "h"){
          arrayToReturn.push([i, j]);
        }
        }
    }
    return arrayToReturn;
  }
}

// checks to see if player has sunk a ship, called whenever player gets a hit
function updateTargetShipHealth(aLocation){
  targetShips.forEach(function(ship){
    if (ship.contains(aLocation)){
      ship.health--;
      if (ship.health < 1){
        document.getElementById("message").innerHTML = "Hit and sunk! You sunk the " + ship.name + "!";
        document.getElementById(ship.name).innerHTML = ship.name + ": Sunk";
        document.getElementById(ship.name).setAttribute("class", "sunk");
      }
    }
  });
}

function removeAllClasses(){
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      $("#" + i + "_" + j).removeAttr("class");
    }
  }
}

// handles all clicks in the target grid
// updates state and DOM accordingly
// calls computerTakesTurn when finished
function handleClick(cellLocation){
  var clickValid = true;
  if (gameState.gridState[cellLocation[0]][cellLocation[1]] == ""){
    gameState.gridState[cellLocation[0]][cellLocation[1]] = "m";
    document.getElementById("message").innerHTML = "Miss!";
  }
  else if (gameState.gridState[cellLocation[0]][cellLocation[1]] == "s"){
    gameState.gridState[cellLocation[0]][cellLocation[1]] = "h";
    document.getElementById("message").innerHTML = "Hit!";
    updateTargetShipHealth([cellLocation[0], cellLocation[1]]);
    gameState.hits++;
  	audio.play();
  }
  else if (gameState.gridState[cellLocation[0]][cellLocation[1]] == "h"){
    document.getElementById("message").innerHTML = "You already shot here!";
    clickValid = false;
  }
  else {
    document.getElementById("message").innerHTML = "You already shot here!";
    clickValid = false;
  }
  gameState.render();
  if (gameState.hits > 16){
    disableOnClicks();
    document.getElementById("message").innerHTML = "You win!"
  }
  if (clickValid && gameState.hits < 17){
    setTimeout(computerTakesTurn, 1000);
  }
}

function resetMyGridState(){
  for (var i = 0; i < 10; i++){
    for (var j = 0; j < 10; j++){
      myGrid.gridState[i][j] = "";
    }
  }
}

function randomizePlacement(){
  shipToPlace.disableMouseOvers();
  myShips = [];
  resetMyGridState();
  enableOnClicks();
  removeAllClasses();
  createShips(targetShips, gameState);
  createShips(myShips, myGrid);
  document.getElementById("playGame").removeAttribute("onclick");
  document.getElementById("playGame").setAttribute("class", "hidden");
  document.getElementById("rotate").removeAttribute("onclick");
  document.getElementById("rotate").setAttribute("class", "hidden");
  document.getElementById("random").removeAttribute("onclick");
  document.getElementById("random").setAttribute("class", "hidden");
  document.getElementById("compMessage").removeAttribute("class");
  document.getElementById("compMessage").innerHTML = "Click a blue square in the target grid to fire torpedo.";
}

function playGame(){
  if (shipToPlace.shipsPlaced >=5){
    enableOnClicks();
    createShips(targetShips, gameState);
    document.getElementById("playGame").removeAttribute("onclick");
    document.getElementById("playGame").setAttribute("class", "hidden");
    document.getElementById("rotate").removeAttribute("onclick");
    document.getElementById("rotate").setAttribute("class", "hidden");
    document.getElementById("random").removeAttribute("onclick");
    document.getElementById("random").setAttribute("class", "hidden");
    document.getElementById("compMessage").removeAttribute("class");
    document.getElementById("compMessage").innerHTML = "Click a blue square in the target grid to fire torpedo.";
    shipToPlace.disableMouseOvers();
  }
}

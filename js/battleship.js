var targetShips = [];
var myShips = [];
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
      targetCurrentCell.setAttribute("onclick", "handleClick([" + i + "," + j + "])");
      myCurrentCell = myCurrentRow.insertCell(j)
      myCurrentCell.setAttribute("id", i+"_"+j);
    }
  }
}

function createGridArray(){
  var array = [];
  var currentRow;
  for (var i = 0; i < 10; i++){
    currentRow = [];
    array.push(currentRow);
    for (var j = 0; j < 10; j++){
      currentRow.push("");
    }
  }
  return array;
};

function createShips(shipArray, board){
  var randomRow;
  var randomColumn;
  var shipNames = ["Dingy", "Submarine", "Destroyer", "Battleship", "Aircraft Carrier"];
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

var seeker = {
  targetAcquired: false,
  directionIndex: 0,
  directionOfPursuit: "",
  directionAcquired: false,
  initialHit: [],
  lastHit: [],
  tries: 0,
  rotate: function(){
    if (this.directionIndex == 3){
      this.directionIndex = 0;
    }
    else {
      this.directionIndex++;
    }
  },
}

function isComputerShotValid(aLocation){
  if (aLocation[0] > 9 || aLocation[0] < 0 || aLocation[1] > 9 || aLocation[1] < 0){
    return false;
  }
  else {
    if (myGrid.gridState[aLocation[0]][aLocation[1]] == "m" ||
    myGrid.gridState[aLocation[0]][aLocation[1]] == "h"){
      return false;
    }
    return true;
  }
}

function computerShoots(){
  if (!seeker.targetAcquired){
    var randomRow = Math.floor(Math.random() * 10);
    var randomColumn = Math.floor(Math.random() * 10);
    while (shotAlreadyFired([randomRow, randomColumn])){
      randomRow = Math.floor(Math.random() * 10);
      randomColumn = Math.floor(Math.random() * 10);
    }
    handleComputerShot([randomRow, randomColumn]);
  }
  else {
    if (seeker.directionAcquired){
      if (seeker.tries > 4){
        seeker.tries = 0;
        seeker.directionAcquired = false;
        computerShoots();
      }
      else {
        switch (seeker.directionIndex){
          case 0:
            if (!isComputerShotValid([seeker.lastHit[0] - 1, seeker.lastHit[1]])){
              seeker.directionAcquired = false;
              seeker.rotate();
              seeker.tries++;
              computerShoots();
            }
            handleComputerShot([seeker.lastHit[0] - 1, seeker.lastHit[1]]);
            break;
          case 1:
            if (!isComputerShotValid([seeker.lastHit[0], seeker.lastHit[1] + 1])){
              seeker.directionAcquired = false;
              seeker.rotate();
              seeker.tries++;
              computerShoots();
            }
            handleComputerShot([seeker.lastHit[0], seeker.lastHit[1] + 1]);
            break;
          case 2:
            if (!isComputerShotValid([seeker.lastHit[0] + 1, seeker.lastHit[1]])){
              seeker.directionAcquired = false;
              seeker.rotate();
              seeker.tries++;
              computerShoots();
            }
            handleComputerShot([seeker.lastHit[0] + 1, seeker.lastHit[1]]);
            break;
          case 3:
            if (!isComputerShotValid([seeker.lastHit[0], seeker.lastHit[1] - 1])){
              seeker.directionAcquired = false;
              seeker.rotate();
              seeker.tries++;
              computerShoots();
            }
            handleComputerShot([seeker.lastHit[0], seeker.lastHit[1] - 1]);
            break;
        }
      }
    }
    else {
      if (seeker.tries > 4){
        seeker.tries = 0;
        seeker.targetAcquired = false;
        computerShoots();
      }
      else {
        switch (seeker.directionIndex){
          case 0:
            if (!isComputerShotValid([seeker.lastHit[0] - 1, seeker.lastHit[1]])){
              seeker.rotate();
              seeker.tries++;
              computerShoots();
            }
            handleComputerShot([seeker.lastHit[0] - 1, seeker.lastHit[1]]);
            break;
          case 1:
            if (!isComputerShotValid([seeker.lastHit[0], seeker.lastHit[1] + 1])){
              seeker.rotate();
              seeker.tries++;
              computerShoots();
            }
            handleComputerShot([seeker.lastHit[0], seeker.lastHit[1] + 1]);
            break;
          case 2:
            if (!isComputerShotValid([seeker.lastHit[0] + 1, seeker.lastHit[1]])){
              seeker.rotate();
              seeker.tries++;
              computerShoots();
            }
            handleComputerShot([seeker.lastHit[0] + 1, seeker.lastHit[1]]);
            break;
          case 3:
            if (!isComputerShotValid([seeker.lastHit[0], seeker.lastHit[1] - 1])){
              seeker.rotate();
              seeker.tries++;
              computerShoots();
            }
            handleComputerShot([seeker.lastHit[0], seeker.lastHit[1] - 1]);
            break;
        }
      }
    }
  }
}

function handleComputerShot(cellLocation){
  if (myGrid.gridState[cellLocation[0]][cellLocation[1]] == ""){
    myGrid.gridState[cellLocation[0]][cellLocation[1]] = "m";
    document.getElementById("compMessage").innerHTML = "Computer missed!";
    if (seeker.directionAcquired){
      seeker.lastHit = seeker.initialHit;
      if (seeker.directionIndex < 2){
        seeker.directionIndex += 2;
      }
      else {
        seeker.directionIndex -= 2;
      }
    }
    seeker.directionAcquired = false;
  }
  else if (myGrid.gridState[cellLocation[0]][cellLocation[1]] == "s"){
    myGrid.gridState[cellLocation[0]][cellLocation[1]] = "h";
    document.getElementById("compMessage").innerHTML = "Computer scored a hit!";
    updateMyShipHealth([cellLocation[0], cellLocation[1]]);
    myGrid.hits++;
    if (seeker.targetAcquired){
      seeker.directionAcquired = true;
    }
    else {
      seeker.targetAcquired = true;
      seeker.initialHit = cellLocation;
    }
    seeker.lastHit = cellLocation;
  	audio.play();
  }
  myGrid.render();
  if (myGrid.hits > 16){
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        document.getElementById(i + "-" + j).removeAttribute("onclick");
      }
    }
    document.getElementById("message").innerHTML = "You lose!";
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

//
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
  if (column + length > 9){
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
    direction: validDirections[Math.floor(Math.random() * validDirections.length)]
  }
}

// method no longer in use
// returns an array with 5 ship objects of length 1 (no duplicates allowed)
function createSingleShips(){
  var numbers = []
  var shipNums = []
  var targetShips = []
  var index
  for (var i = 0; i<100; i++){
    numbers.push(i)
  }
  for (var j = 0; j<5; j++){
    index = Math.floor(Math.random() * (100 - j))
    shipNums.push(numbers[index]);
    numbers.splice(index, 1);
  }
  for (var k = 0; k < 5; k++){
    targetShips.push([Math.floor(shipNums[k] / 10), shipNums[k] % 10])
  }
  for (var l = 0; l < 5; l++){
    gameState.gridState[targetShips[l][0]][targetShips[l][1]] = "s";
  }
  return targetShips;
}

// gameState object manages the state of the top (target) grid
var gameState = {
  gridState: createGridArray(),
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
  gridState: createGridArray(),
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

// checks to see if computer has sunk a ship, called whenever computer gets a hit
// also resets the seeker object
function updateMyShipHealth(aLocation){
  myShips.forEach(function(ship){
    if (ship.contains(aLocation)){
      ship.health--;
      if (ship.health < 1){
        document.getElementById("compMessage").innerHTML = "Hit and sunk! Computer sunk my " + ship.name + "!";
        document.getElementById("my" + ship.name).innerHTML = ship.name + ": Sunk";
        document.getElementById("my" + ship.name).setAttribute("class", "sunk");
        seeker.targetAcquired = false;
        seeker.directionAcquired = false;
      }
    }
  });
}

// handles all clicks in the target grid
// updates state and DOM accordingly
// calls computerShoots when finished
function handleClick(cellLocation){
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
    document.getElementById("message").innerHTML = "You already sunk this ship!";
  }
  else {
    document.getElementById("message").innerHTML = "You already shot here!";
  }
  gameState.render();
  if (gameState.hits > 16){
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        document.getElementById(i + "-" + j).removeAttribute("onclick");
      }
    }
    document.getElementById("message").innerHTML = "You win!"
  }
  computerShoots();
}

function shotAlreadyFired(aLocation){
  computerShots.forEach(function(shot){
    if (shot[0] == aLocation[0] && shot[1] == aLocation[1]){
      return true;
    }
  });
  return false;
}

// function not called, used for debugging. Returns an object with
// the number of cells containing ships, and 'valid' is false if that
// number is not 17 (5 + 4 + 3 + 3 + 2)
function isBoardValid(board){
  var count = 0;
  for (var i = 0; i < 10; i++){
    for (var j = 0; j < 10; j++){
      if (board.gridState[i][j] == "s"){
        count++;
      }
    }
  }
  if (count != 17){
    return {
      valid: false,
      shipCellCount: count
    }
  }
  else {
    return {
      valid: true,
      shipCellCount: count
    }
  }
}

initGrids();
createShips(targetShips, gameState);
createShips(myShips, myGrid);

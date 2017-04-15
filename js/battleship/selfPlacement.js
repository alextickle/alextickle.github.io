var shipToPlace = {
  orientation: 0,
  lengths: [2, 3, 3, 4, 5],
  position: [],
  shipsPlaced: 0,
  directionList: ["north", "east", "south", "west"],
  shipNames: ["Dingy", "Submarine", "Destroyer", "Battleship", "Aircraft Carrier"],
  updateHighlightOnclicks: function(){
    if (this.shipsPlaced < 5){
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
          document.getElementById(i + "_" + j).setAttribute("onmouseenter", "highlightCells(" + this.orientation + "," + this.lengths[this.shipsPlaced] + "," + i + ", " + j +")");
          document.getElementById(i + "_" + j).setAttribute("onmouseout", "removeHighlight()");
        }
      }
    }
    else {
      this.disableMouseOvers();
      $("#playGame").attr("class", "redBorder");
    }
  },
  disableMouseOvers: function(){
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        document.getElementById(i + "_" + j).removeAttribute("onmouseenter");
        document.getElementById(i + "_" + j).removeAttribute("onmouseout");
      }
    }
  },
  rotateShip: function(){
    if (this.orientation == 1){
      this.orientation = 0;
    }
    else {
      this.orientation++;
    }
    this.updateHighlightOnclicks();
  }
}

function highlightCells(orientation, length, row, column){
  var listOfCells = "";
  if (isPlacementValid([row, column], length, myShips).valid && isPlacementValid([row, column], length, myShips).allValidDirections.includes(shipToPlace.directionList[orientation])){
    switch (orientation){
      case 0:
        for (var i = 0; i < length - 1; i++){
          listOfCells += "#" + (row - i) + "_" + column + ", ";
        }
        listOfCells += "#" + (row - length + 1) + "_" + column;
        $(listOfCells).attr("class", "validPlacement");
        $(listOfCells).attr("onclick", "placeShip([" + row + ", " + column + "], " + orientation + ", " + length + ")");
        break;
      case 1:
          for (var i = 0; i < length - 1; i++){
            listOfCells += "#" + row + "_" + (column + i) + ", ";
          }
          listOfCells += "#" + row + "_" + (column + length - 1);
          $(listOfCells).attr("class", "validPlacement");
          $(listOfCells).attr("onclick", "placeShip([" + row + ", " + column + "], " + orientation + ", " + length + ")");
        break;
      case 2:
        for (var i = 0; i < length - 1; i++){
          listOfCells += "#" + (row + i) + "_" + column + ", ";
        }
        listOfCells += "#" + (row + length - 1) + "_" + column;
        $(listOfCells).attr("class", "validPlacement");
        $(listOfCells).attr("onclick", "placeShip([" + row + ", " + column + "], " + orientation + ", " + length + ")");
        break;
      case 3:
        for (var i = 0; i < length - 1; i++){
          listOfCells += "#" + row + "_" + (column - i) + ", ";
        }
        listOfCells += "#" + row + "_" + (column - length + 1);
        $(listOfCells).attr("class", "validPlacement");
        $(listOfCells).attr("onclick", "placeShip([" + row + ", " + column + "], " + orientation + ", " + length + ")");
        break;
    }
  }
  else {
    switch (orientation){
      case 0:
        for (var i = 0; i < length; i++){
          if (!myShipsContain([row - i, column])){
            listOfCells += "#" + (row - i) + "_" + column + ", ";
          }
        }
        listOfCells = removeLastComma(listOfCells);
        $(listOfCells).attr("class", "invalidPlacement");
        break;
      case 1:
        for (var i = 0; i < length; i++){
          if (!myShipsContain([row, column + i])){
            listOfCells += "#" + row + "_" + (column + i) + ", ";
          }
        }
        listOfCells = removeLastComma(listOfCells);
        $(listOfCells).attr("class", "invalidPlacement");
        break;
      case 2:
        for (var i = 0; i < length; i++){
          if (!myShipsContain([row + i, column])){
            listOfCells += "#" + (row + i) + "_" + column + ", ";
          }
        }
        listOfCells = removeLastComma(listOfCells);
        $(listOfCells).attr("class", "invalidPlacement");
        break;
      case 3:
        for (var i = 0; i < length; i++){
          if (!myShipsContain([row, column - i])){
            listOfCells += "#" + row + "_" + (column - i) + ", ";
          }
        }
        listOfCells = removeLastComma(listOfCells);
        $(listOfCells).attr("class", "invalidPlacement");
        break;
    }
  }
}

function removeLastComma(str){
  var newStr = "";
  for (var i = 0; i < str.length - 2; i++){
    newStr += str[i];
  }
  return newStr;
}

// removes validPlacement, invalidPlacement, and onclick from all grid element
function removeHighlight(){
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      $("#" + i + "_" + j).removeClass("validPlacement");
      $("#" + i + "_" + j).removeClass("invalidPlacement");
      $("#" + i + "_" + j).removeAttr("onclick");
    }
  }
}

function placeShip(aLocation, orientation, length){
  var shipLocations = [];
  switch (orientation){
    case 0:
      for (var i = 0; i < length; i++){
        shipLocations.push([aLocation[0] - i, aLocation[1]]);
      }
      break;
    case 1:
      for (var i = 0; i < length; i++){
        shipLocations.push([aLocation[0], aLocation[1] + i]);
      }
      break;
    case 2:
      for (var i = 0; i < length; i++){
        shipLocations.push([aLocation[0] + i, aLocation[1]]);
      }
      break;
    case 3:
      for (var i = 0; i < length; i++){
        shipLocations.push([aLocation[0], aLocation[1] - i]);
      }
      break;
  }
  myShips.push(createShip(shipLocations, length));
  shipToPlace.shipsPlaced++;
  shipToPlace.updateHighlightOnclicks();
  myShips.forEach(function(ship, i){
    ship.cellsOccupied.forEach(function(location){
      myGrid.gridState[location[0]][location[1]] = "s";
      document.getElementById(location[0] + "_" + location[1]).setAttribute("class", "ship")
    });
    ship.name = shipToPlace.shipNames[i];
  });
}

function myShipsContain(aLocation){
  locationOccupied = false;
  myShips.forEach(function(ship){
    if (ship.contains(aLocation)){
      locationOccupied = true;
    }
  });
  return locationOccupied;
}

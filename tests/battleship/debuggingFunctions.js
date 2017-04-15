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

function turnsTaken(board){
  var count = 0;
  for (var i = 0; i < 10; i++){
    for (var j = 0; j < 10; j++){
      if (board.gridState[i][j] == "m" || board.gridState[i][j] == "h"){
        count++;
      }
    }
  }
  return count;
}

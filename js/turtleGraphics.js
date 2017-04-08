var initializeGrid = function(){
  for (var i = 0; i < 20; i++){
    $("#myTable").append("<tr id='row" + i + "'></tr>");
    for (var j = 0; j < 20; j++){
      $("#row" + i).append("<td id='" + (20 * i + j) + "' class='cell'></td>");
    }
  }
  $("#210").addClass("turtle");
}

var resetGrid = function(){
  for (var i = 0; i <= 399; i++){
    $("#" + i).removeClass("turtle");
    $("#" + i).removeClass("drawn");
  }
  turtle.turtlePos = [10,10];
  $("#210").addClass("turtle");
}

var createTurtle = function(){
  return {
    turtlePos: [10,10],
    penDown: false,
    direction: 0,
  }
}

var processCmdList = function(string){
  $("#instructions").text("Please enter a command (1-6):");
  var args = string.split(" ");
  args.forEach(function(command){
    if (validCommand(parseInt(command))){
      processCommand(parseInt(command));
    }
    else {
      $("#instructions").text("Invalid command: Out of Bounds");
      return;
    }
  });
  pastCommands.push($("#inputBox").val());
  $("#inputBox").val("");

}

var validCommand = function(num){
  if (num === 5){
    switch(turtle.direction){
      case 0:
        return !(turtle.turtlePos[1] > 14);
      case 1:
        return !(turtle.turtlePos[0] > 14);
      case 2:
        return !(turtle.turtlePos[1] < 4);
      case 3:
        return !(turtle.turtlePos[0] < 4);
    }
  }
  else if (num === 6){
    switch(turtle.direction){
      case 0:
        return !(turtle.turtlePos[1] > 18);
      case 1:
        return !(turtle.turtlePos[0] > 18);
      case 2:
        return !(turtle.turtlePos[1] < 1);
      case 3:
        return !(turtle.turtlePos[0] < 1);
    }
  }
  else {
    return true;
  }
}

var processCommand = function(num){
	switch(num){
		case 1:
			turtle.penDown = true;
			break;
		case 2:
			turtle.penDown = false;
			break;
		case 3:
			if (turtle.direction === 0){
			  turtle.direction = 3;
			}
			else {
				turtle.direction -= 1;
			}
			break;
		case 4:
			if (turtle.direction === 3){
				turtle.direction = 0;
			}
			else {
				turtle.direction += 1;
			}
			break;
    case 5:
			switch (turtle.direction){
				case 0:
					if (turtle.penDown){
						for (var i = 0; i <= 4; i++){
              $("#" + ((turtle.turtlePos[1] + i) * 20  + turtle.turtlePos[0])).addClass("drawn");
						}
					}
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).removeClass("turtle");
          turtle.turtlePos = [turtle.turtlePos[0], turtle.turtlePos[1] + 5];
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).addClass("turtle");
					break;
				case 1:
					if (turtle.penDown){
						for (var i = 0; i <= 4; i++){
              $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0] + i)).addClass("drawn");
						}
          }
          turtle.turtlePos = [turtle.turtlePos[0] + 5, turtle.turtlePos[1]];
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).addClass("turtle");
					break;
				case 2:
          if (turtle.penDown){
            for (var i = 0; i <= 4; i++){
              $("#" + ((turtle.turtlePos[1] - i) * 20 + turtle.turtlePos[0])).addClass("drawn");
            }
          }
          turtle.turtlePos = [turtle.turtlePos[0], turtle.turtlePos[1] - 5];
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).addClass("turtle");
				break;
				case 3:
          if (turtle.penDown){
            for (var i = 0; i <= 4; i++){
              $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0] - i)).addClass("drawn");
            }
          }
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).removeClass("turtle");
          turtle.turtlePos = [turtle.turtlePos[0] - 5, turtle.turtlePos[1]];
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).addClass("turtle");
          break;
			}
			break;
    case 6:
      switch (turtle.direction){
        case 0:
          if (turtle.penDown){
            $("#" + ((turtle.turtlePos[1]) * 20  + turtle.turtlePos[0])).addClass("drawn");
          }
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).removeClass("turtle");
          turtle.turtlePos = [turtle.turtlePos[0], turtle.turtlePos[1] + 1];
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).addClass("turtle");
          break;
        case 1:
          if (turtle.penDown){
            $("#" + ((turtle.turtlePos[1]) * 20  + turtle.turtlePos[0])).addClass("drawn");
          }
          turtle.turtlePos = [turtle.turtlePos[0] + 1, turtle.turtlePos[1]];
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).addClass("turtle");
          break;
        case 2:
          if (turtle.penDown){
            $("#" + ((turtle.turtlePos[1]) * 20  + turtle.turtlePos[0])).addClass("drawn");
          }
          turtle.turtlePos = [turtle.turtlePos[0], turtle.turtlePos[1] - 1];
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).addClass("turtle");
        break;
        case 3:
          if (turtle.penDown){
            $("#" + ((turtle.turtlePos[1]) * 20  + turtle.turtlePos[0])).addClass("drawn");
          }
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).removeClass("turtle");
          turtle.turtlePos = [turtle.turtlePos[0] - 1, turtle.turtlePos[1]];
          $("#" + (turtle.turtlePos[1] * 20 + turtle.turtlePos[0])).addClass("turtle");
          break;
      }
      break;
	}
}

var saveCommands = function(){
  savedCommands.push(pastCommands.join(" | "));
  $("#savedCommands").append('<p>' + savedCommands[savedCommands.length - 1] + '</p>');
  pastCommands = [];
}


var turtle = createTurtle();
var savedCommands = [];
var pastCommands = [];

$(document).ready(function(){
  initializeGrid();
  $("#input-btn").click(function(){
      processCmdList($("#inputBox").val());
  });
  $("#reset").click(function(){
    resetGrid();
  });
  $("#save").click(function(){
    saveCommands();
  });
});

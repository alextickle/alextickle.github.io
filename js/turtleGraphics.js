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
  turtle.position = [10,10];
  turtle.direction = 0;
  turtle.penDown = false;
  $("#210").addClass("turtle");
}

var createTurtle = function(){
  return {
    position: [10,10],
    penDown: false,
    direction: 0,
  }
}

var processCmdList = function(string){
  $("#instructions").text("Enter a sequence of commands (1-6), separated by spaces:");
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
        return !(turtle.position[1] > 14);
      case 1:
        return !(turtle.position[0] > 14);
      case 2:
        return !(turtle.position[1] < 4);
      case 3:
        return !(turtle.position[0] < 4);
    }
  }
  else if (num === 6){
    switch(turtle.direction){
      case 0:
        return !(turtle.position[1] > 18);
      case 1:
        return !(turtle.position[0] > 18);
      case 2:
        return !(turtle.position[1] < 1);
      case 3:
        return !(turtle.position[0] < 1);
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
      if (turtle.penDown){
        $("#" + (turtle.position[1] * 20 + turtle.position[0])).addClass("drawn");
      }
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
              $("#" + ((turtle.position[1] + i) * 20  + turtle.position[0])).addClass("drawn");
						}
					}
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("turtle");
          turtle.position = [turtle.position[0], turtle.position[1] + 5];
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("drawn");
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).addClass("turtle");
					break;
				case 1:
					if (turtle.penDown){
						for (var i = 0; i <= 4; i++){
              $("#" + (turtle.position[1] * 20 + turtle.position[0] + i)).addClass("drawn");
						}
          }
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("turtle");
          turtle.position = [turtle.position[0] + 5, turtle.position[1]];
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("drawn");
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).addClass("turtle");
					break;
				case 2:
          if (turtle.penDown){
            for (var i = 0; i <= 4; i++){
              $("#" + ((turtle.position[1] - i) * 20 + turtle.position[0])).addClass("drawn");
            }
          }
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("turtle");
          turtle.position = [turtle.position[0], turtle.position[1] - 5];
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("drawn");
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).addClass("turtle");
				break;
				case 3:
          if (turtle.penDown){
            for (var i = 0; i <= 4; i++){
              $("#" + (turtle.position[1] * 20 + turtle.position[0] - i)).addClass("drawn");
            }
          }
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("turtle");
          turtle.position = [turtle.position[0] - 5, turtle.position[1]];
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("drawn");
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).addClass("turtle");
          break;
			}
			break;
    case 6:
      switch (turtle.direction){
        case 0:
          if (turtle.penDown){
            $("#" + ((turtle.position[1]) * 20  + turtle.position[0])).addClass("drawn");
          }
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("turtle");
          turtle.position = [turtle.position[0], turtle.position[1] + 1];
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("drawn");
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).addClass("turtle");
          break;
        case 1:
          if (turtle.penDown){
            $("#" + ((turtle.position[1]) * 20  + turtle.position[0])).addClass("drawn");
          }
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("turtle");
          turtle.position = [turtle.position[0] + 1, turtle.position[1]];
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("drawn");

          $("#" + (turtle.position[1] * 20 + turtle.position[0])).addClass("turtle");
          break;
        case 2:
          if (turtle.penDown){
            $("#" + ((turtle.position[1]) * 20  + turtle.position[0])).addClass("drawn");
          }
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("turtle");
          turtle.position = [turtle.position[0], turtle.position[1] - 1];
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("drawn");
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).addClass("turtle");
        break;
        case 3:
          if (turtle.penDown){
            $("#" + ((turtle.position[1]) * 20  + turtle.position[0])).addClass("drawn");
          }
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("turtle");
          turtle.position = [turtle.position[0] - 1, turtle.position[1]];
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).removeClass("drawn");
          $("#" + (turtle.position[1] * 20 + turtle.position[0])).addClass("turtle");
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

var showExample = function(){
  resetGrid();
  processCmdList(examples[exampleIndex].command);
  $("#exampleName").text(examples[exampleIndex].name);
  $("#example").text(examples[exampleIndex].command);
  if (exampleIndex === examples.length - 1){
    exampleIndex = 0;
  }
  else {
    exampleIndex++;
  }
}

var clearCommands = function(){
  savedCommands = [];
  pastCommands = [];
  $("#savedCommands").empty();
}


var turtle = createTurtle();
var savedCommands = [];
var pastCommands = [];
var examples = [
  {
    name: "SQUARE",
    command: "4 5 1 3 5 3 5 5 3 5 5 3 5 5 3 5"
  },

  {
    name: "HI",
    command: "3 5 6 6 4 5 3 3 1 5 5 3 3 5 4 5 3 5 3 3 5 5 2 3 5 3 1 5 5"
  }
];
var exampleIndex = 0;

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
  $("#examples").click(function(){
    showExample();
  });
  $("#clear").click(function(){
    clearCommands();
  });
});

$(document).ready(function(){
  test();
});

var createTurtle = function(){
  var array = new Array(20);
  for (var i = 0; i < 20; i++){
    array[i] = [0];
  }
  return {
    turtlePos: [10,10],
    penUp: false,
    floor: array,
    direction: 0,
  }
}

var run = function() {
  var turtle = createTurtle();
	var exit = false;
	var user;
	var tempFloor = new Array(20);
  for (var i = 0; i < 20; i++){
    array[i] = [0];
  }
}

var test = function(){
  $("row:eq(" + 5 + ")").addClass("drawn");
};

// function processCommand(string){
// 		user = parseInt(string);
// 		switch(user){
// 			case 1:
// 				turtle.penUp = true;
// 				break;
// 			case 2:
// 				turtle.penUp = false;
// 				break;
// 			case 3:
// 				if (turtle.direction === 0){
// 				  turtle.direction = 3;
// 				}
// 				else {
// 					turtle.direction -= 1;
// 				}
// 				break;
// 			case 4:
// 				if (turtle.direction === 3){
// 					turtle.direction = 0;
// 				}
// 				else {
// 					turtle.direction += 1;
// 				}
// 				break;
// 				switch (turtle.direction){
// 					case 0:
// 						if (turtle.penUp){
// 							tempFloor = turtle.floor;
// 							for (int i = turtle.turtlePos[0]; i < turtle.turtlePos[0] - 5; i++){
//                 $("row:eq(" + i + ") td:eq(" + turtle.turtlePos[0] + ")").addClass("drawn");
// 							}
// 							tempFloor[t.getTurtlePos()[0] - 4][t.getTurtlePos()[1]] = 2;
// 							t.setFloor(tempFloor);
// 							t.setTurtlePos(t.getTurtlePos()[0] - 4, t.getTurtlePos()[1]);
// 						}
//
// 						else{
// 							tempFloor[t.getTurtlePos()[0] - 4][t.getTurtlePos()[1]] = 2;
// 							t.setFloor(tempFloor);
// 							t.setTurtlePos(t.getTurtlePos()[0] - 4, t.getTurtlePos()[1]);
// 						}
// 						break;
// 					case 1:
// 						if (turtle.penUp){
// 							tempFloor = turtle.floor;
// 							for (int i = t.getTurtlePos()[1]; i < t.getTurtlePos()[1] - 5; i++){
// 								tempFloor[t.getTurtlePos()[0]][i] = 1;
// 							}
// 							tempFloor[t.getTurtlePos()[0]][t.getTurtlePos()[1] - 4] = 2;
// 							t.setFloor(tempFloor);
// 							t.setTurtlePos(t.getTurtlePos()[0], t.getTurtlePos()[1] - 4);
// 						}
//
// 						else{
// 							tempFloor[t.getTurtlePos()[0]][t.getTurtlePos()[1] - 4] = 2;
// 							t.setFloor(tempFloor);
// 							t.setTurtlePos(t.getTurtlePos()[0], t.getTurtlePos()[1] - 4);
// 						}
// 						break;
// 					case 2:
// 						if (turtle.penUp){
// 							tempFloor = t.getFloor();
// 							for (int i = t.getTurtlePos()[0]; i < t.getTurtlePos()[0] + 5; i--){
// 								tempFloor[i][t.getTurtlePos()[1]] = 1;
// 							}
// 							tempFloor[t.getTurtlePos()[0] + 4][t.getTurtlePos()[1]] = 2;
// 							t.setFloor(tempFloor);
// 							t.setTurtlePos(t.getTurtlePos()[0] + 4, t.getTurtlePos()[1]);
// 						}
//
// 						else{
// 							tempFloor[t.getTurtlePos()[0] + 4][t.getTurtlePos()[1]] = 2;
// 							t.setFloor(tempFloor);
// 							t.setTurtlePos(t.getTurtlePos()[0] + 4, t.getTurtlePos()[1]);
// 						}
// 						break;
// 					case 3:
// 						if (turtle.penUp){
// 							tempFloor = t.getFloor();
// 							for (int i = t.getTurtlePos()[1]; i < t.getTurtlePos()[1] + 5; i++){
// 								tempFloor[t.getTurtlePos()[0]][i] = 1;
// 							}
// 							tempFloor[t.getTurtlePos()[0]][t.getTurtlePos()[1] + 4] = 2;
// 							t.setFloor(tempFloor);
// 							t.setTurtlePos(t.getTurtlePos()[0], t.getTurtlePos()[1] + 4);
// 						}
//
// 						else{
// 							tempFloor[t.getTurtlePos()[0]][t.getTurtlePos()[1] + 4] = 2;
// 							t.setFloor(tempFloor);
// 							t.setTurtlePos(t.getTurtlePos()[0], t.getTurtlePos()[1] + 4);
// 						}
// 						break;
// 				}
// 				break;
// 			case 6:
// 				displayArray(t.getFloor());
// 				break;
// 			case 7:
// 				printCommands();
// 				break;
// 			case 9:
// 				exit = true;
// 				break;
// 		}
// }

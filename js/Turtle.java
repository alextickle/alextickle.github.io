import java.util.Scanner;
import java.util.Arrays;

public class Turtle {
	private int[] turtlePos = {10, 10};
	private boolean penUp = false;
	private int[][] floor = new int[20][20];
	private Direction direction = Direction.NORTH;
	
	public enum Direction{
		NORTH(1), EAST(2), SOUTH(3), WEST(4);
		private int value;

		private Direction(int i){
			this.value = i;
		}
		
		public int getValue(){
			return value;
		}
	}
	
	public Turtle(){
		for (int[] i: floor){
			Arrays.fill(i, 0);
		}
	}
	

	public static void main(String[] args) {
		Turtle t = new Turtle();
		Scanner input = new Scanner(System.in);
		boolean exit = false;
		String user;
		int[][] tempFloor = new int[20][20];
		while (!exit){
			
			System.out.println("Please enter a command: ");
			user = input.nextLine();
			
			switch(Integer.parseInt(user)){
				case 1: 
					t.setPenUp(true);
					break;
				case 2:
					t.setPenUp(false);;
					break;
				case 3:
					if (t.getDirection() == 1){
						t.setDirection(4);
					}
					else {
						t.setDirection(t.getDirection() - 1);
					}
					break;
					
				case 4:
					if (t.getDirection() == 4){
						t.setDirection(1);
					}
					else {
						t.setDirection(t.getDirection() + 1);
					}
					break;
				case 5:
					switch (t.getDirection()){
						case 1:
							if (t.penUp){
								tempFloor = t.getFloor();
								for (int i = t.getTurtlePos()[0]; i < t.getTurtlePos()[0] - 5; i++){
									tempFloor[i][t.getTurtlePos()[1]] = 1;
								}
								tempFloor[t.getTurtlePos()[0] - 4][t.getTurtlePos()[1]] = 2;
								t.setFloor(tempFloor);
								t.setTurtlePos(t.getTurtlePos()[0] - 4, t.getTurtlePos()[1]);
							}
							
							else{
								tempFloor[t.getTurtlePos()[0] - 4][t.getTurtlePos()[1]] = 2;
								t.setFloor(tempFloor);
								t.setTurtlePos(t.getTurtlePos()[0] - 4, t.getTurtlePos()[1]);
							}
							break;
						case 2: 
							if (t.penUp){
								tempFloor = t.getFloor();
								for (int i = t.getTurtlePos()[1]; i < t.getTurtlePos()[1] - 5; i++){
									tempFloor[t.getTurtlePos()[0]][i] = 1;
								}
								tempFloor[t.getTurtlePos()[0]][t.getTurtlePos()[1] - 4] = 2;
								t.setFloor(tempFloor);
								t.setTurtlePos(t.getTurtlePos()[0], t.getTurtlePos()[1] - 4);
							}
							
							else{
								tempFloor[t.getTurtlePos()[0]][t.getTurtlePos()[1] - 4] = 2;
								t.setFloor(tempFloor);
								t.setTurtlePos(t.getTurtlePos()[0], t.getTurtlePos()[1] - 4);
							}
							break;
						case 3:
							if (t.penUp){
								tempFloor = t.getFloor();
								for (int i = t.getTurtlePos()[0]; i < t.getTurtlePos()[0] + 5; i--){
									tempFloor[i][t.getTurtlePos()[1]] = 1;
								}
								tempFloor[t.getTurtlePos()[0] + 4][t.getTurtlePos()[1]] = 2;
								t.setFloor(tempFloor);
								t.setTurtlePos(t.getTurtlePos()[0] + 4, t.getTurtlePos()[1]);
							}
							
							else{
								tempFloor[t.getTurtlePos()[0] + 4][t.getTurtlePos()[1]] = 2;
								t.setFloor(tempFloor);
								t.setTurtlePos(t.getTurtlePos()[0] + 4, t.getTurtlePos()[1]);
							}
							break;
						case 4:
							if (t.penUp){
								tempFloor = t.getFloor();
								for (int i = t.getTurtlePos()[1]; i < t.getTurtlePos()[1] + 5; i++){
									tempFloor[t.getTurtlePos()[0]][i] = 1;
								}
								tempFloor[t.getTurtlePos()[0]][t.getTurtlePos()[1] + 4] = 2;
								t.setFloor(tempFloor);
								t.setTurtlePos(t.getTurtlePos()[0], t.getTurtlePos()[1] + 4);
							}
							
							else{
								tempFloor[t.getTurtlePos()[0]][t.getTurtlePos()[1] + 4] = 2;
								t.setFloor(tempFloor);
								t.setTurtlePos(t.getTurtlePos()[0], t.getTurtlePos()[1] + 4);
							}
							break;
					}
					break;
				case 6:
					displayArray(t.getFloor());
					break;
				case 7:
					printCommands();
					break;
				case 9:
					exit = true;
					break;
			}
			
		}
			
	}
	
	public static void displayArray(int[][] twoDimensionalArray){
		for (int row = 0; row < twoDimensionalArray.length; row++){
			for (int col = 0; col <twoDimensionalArray[0].length; col++){
				System.out.print(twoDimensionalArray[row][col] + " ");
			}
			System.out.println();
			
		}
	}
	
	public static void printCommands(){
		System.out.printf("%10s %10s\n", "Command", "Description");
		System.out.printf("%10s %10s\n", "1", "Pen Up");
		System.out.printf("%10s %10s\n", "2", "Pen Down");
		System.out.printf("%10s %10s\n", "3", "Turn Right");
		System.out.printf("%10s %10s\n", "4", "Turn Left");
		System.out.printf("%10s %10s\n", "5", "Advance 5 spaces");
		System.out.printf("%10s %10s\n", "6", "Description");
		System.out.printf("%10s %10s\n", "7", "Print Commands");
		System.out.printf("%10s %10s\n", "9", "End of Data");
		System.out.println();
		
	}
	
	public boolean getPenUp(){
		return penUp;
	}
	
	public void setPenUp(boolean a){
		this.penUp = a;
	}
	
	public int[][] getFloor(){
		return this.floor;
	}
	
	public void setFloor(int [][] twoDimensionalArray){
		this.floor = twoDimensionalArray;
	}
	
	public int[] getTurtlePos(){
		return this.turtlePos;
	}
	
	public void setTurtlePos(int row, int col){
		this.turtlePos[0] = row;
		this.turtlePos[1] = col;
	}
	
	public int getDirection(){
		return this.direction.value;
	}
	
	public void setDirection(int i){
		switch(i){
			case 1:
				this.direction = Direction.NORTH;
				break;
			case 2:
				this.direction = Direction.EAST;
				break;
			case 3:
				this.direction = Direction.SOUTH;
				break;
			case 4:
				this.direction = Direction.WEST;
				break;
		}
		
	}

}


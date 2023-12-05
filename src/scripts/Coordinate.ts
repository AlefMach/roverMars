import List from "./List";
import Rover from "./Rover";
import RegexDefault from "../utils/RegexDefault";

class Coordinate {
  private matrix_init: string[][];
  private list: string[] = [];
  private list_with_only_commands: string[][] = [];
  private plateauWidth: number = 0;
  private plateauHeight: number = 0;
  private x: number = 0;
  private y: number = 0;
  private cardinal_point: "N" | "S" | "E" | "W" = "N";
  private response_rover: string[] = [];

  constructor(matrix: string[][]) {
    this.matrix_init = matrix;
  }

  public get_new_coordinate(): string[] {
    this.matrix_init.forEach((list_string: string[]) => {
      this.list = list_string;
      this.set_rectangle_size();
      this.list_with_only_commands = List.split_list_in_parts(this.list);

      this.list_with_only_commands.forEach((coordinates: string[]) => {
        this.set_x_and_y_axis(coordinates[0]);
        this.move_rover_and_save_new_information(coordinates[1]);
      });
    });

    const normalize_array: string[] = this.response_rover.filter(
      (str) => str.trim() !== ""
    );


    return normalize_array;
  }

  private set_rectangle_size(): void {
    this.list.forEach((e: string) => {
      if (e.match(RegexDefault.regex_two_numbers_int)) {
        const plateauWidth_plateauHeight = e.split(/[\s]+/);
        this.plateauWidth = parseInt(plateauWidth_plateauHeight[0], 10);
        this.plateauHeight = parseInt(plateauWidth_plateauHeight[1], 10);
        this.list.shift();
      }
    });
  }

  private set_x_and_y_axis(value: string): void {
    if (value.match(RegexDefault.regex_two_digits_one_cardinal_point)) {
      const coordinate_x_y_cardinal_point = value.split(/[\s]+/);
      this.x = parseInt(coordinate_x_y_cardinal_point[0], 10);
      this.y = parseInt(coordinate_x_y_cardinal_point[1], 10);
      switch (coordinate_x_y_cardinal_point[2]) {
        case "N":
          this.cardinal_point = "N";
          break;
        case "S":
          this.cardinal_point = "S";
          break;
        case "E":
          this.cardinal_point = "E";
          break;
        case "W":
          this.cardinal_point = "W";
          break;
        default:
          break;
      }
    }
  }

  private move_rover_and_save_new_information(value: string): void {
    try {
      if (value.match(RegexDefault.regex_MRL)) {
        const rover = new Rover(
          this.plateauWidth,
          this.plateauHeight,
          this.x,
          this.y,
          this.cardinal_point
        );

        const movements: string[] = value.split("");
        movements.forEach((movement: string) => {
          switch (movement) {
            case "L":
              rover.turnLeft();
              break;
            case "R":
              rover.turnRight();
              break;
            case "M":
              rover.move();
              break;
            default:
              break;
          }
        });

        const new_coordinate: string = `${
          rover.getPositionX() +
          " " +
          rover.getPositionY() +
          " " +
          rover.getDirection() + 
          "\n"
        }`;

        this.response_rover.push(new_coordinate);
      }
    } catch (e) {
      console.error("Error while processing response, error message: " + e);
      this.response_rover.push("");
    }
  }
}

export default Coordinate;

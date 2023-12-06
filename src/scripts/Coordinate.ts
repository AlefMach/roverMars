import List from "./List";
import Rover from "./Rover";
import RegexDefault from "../utils/RegexDefault";
import { CardinalDirection } from "../enums/CardinalDirection";

/**
 * Class representing coordinates on a plateau.
 *
 * @class Coordinate
 */
class Coordinate {
  private matrixInit: string[][];
  private list: string[] = [];
  private listWithOnlyCommands: string[][] = [];
  private plateauWidth: number = 0;
  private plateauHeight: number = 0;
  private x: number = 0;
  private y: number = 0;
  private cardinalPoint: CardinalDirection = CardinalDirection.North;
  private responseRover: string[] = [];

  /**
   * Constructor for the Coordinate class.
   *
   * @constructor
   * @param {string[][]} matrix - The matrix representing coordinates on the plateau.
   */
  constructor(matrix: string[][]) {
    this.matrixInit = matrix;
  }

  /**
   * Get the new coordinates after processing the matrix.
   *
   * @method
   * @public
   * @return {string[]} - The array of normalized coordinates.
   */
  public getNewCoordinate(): string[] {
    this.matrixInit.forEach((listString: string[]) => {
      this.list = listString;
      this.setRectangleSize();
      this.listWithOnlyCommands = List.splitListInParts(this.list);

      this.listWithOnlyCommands.forEach((coordinates: string[]) => {
        this.setXAndYAxis(coordinates[0]);
        this.moveRoverAndSaveNewInformation(coordinates[1]);
      });
    });

    const normalizedArray: string[] = this.responseRover.filter(
      (str) => str.trim() !== ""
    );

    return normalizedArray;
  }

  /**
   * Set the size of the plateau based on the input list.
   *
   * @method
   * @private
   * @return {void}
   */
  private setRectangleSize(): void {
    this.list.forEach((e: string) => {
      if (e.match(RegexDefault.regexTwoNumbersInt)) {
        const plateauWidthPlateauHeight = e.split(/[\s]+/);
        this.plateauWidth = parseInt(plateauWidthPlateauHeight[0], 10);
        this.plateauHeight = parseInt(plateauWidthPlateauHeight[1], 10);
        this.list.shift();
      }
    });
  }

  /**
   * Set the x, y coordinates, and cardinal direction based on the input value.
   *
   * @method
   * @private
   * @param {string} value - The string containing x, y coordinates, and cardinal direction.
   * @return {void}
   */
  private setXAndYAxis(value: string): void {
    if (value.match(RegexDefault.regexTwoDigitsOneCardinalPoint)) {
      const coordinateXYCardinalPoint = value.split(/[\s]+/);
      this.x = parseInt(coordinateXYCardinalPoint[0], 10);
      this.y = parseInt(coordinateXYCardinalPoint[1], 10);
      this.cardinalPoint = Coordinate.parseCardinalPoint(
        coordinateXYCardinalPoint[2]
      );
    }
  }

  /**
   * Parse the cardinal direction from a string value.
   *
   * @method
   * @static
   * @private
   * @param {string} value - The string representation of cardinal direction.
   * @return {CardinalDirection} - The parsed cardinal direction.
   */
  private static parseCardinalPoint(value: string): CardinalDirection {
    switch (value) {
      case "N":
        return CardinalDirection.North;
      case "S":
        return CardinalDirection.South;
      case "E":
        return CardinalDirection.East;
      case "W":
        return CardinalDirection.West;
      default:
        return CardinalDirection.North;
    }
  }

  /**
   * Move the rover based on the input value and save the new information.
   *
   * @method
   * @private
   * @param {string} value - The string containing rover movements.
   * @return {void}
   */
  private moveRoverAndSaveNewInformation(value: string): void {
    try {
      if (value.match(RegexDefault.regexMRL)) {
        const rover = new Rover(
          this.plateauWidth,
          this.plateauHeight,
          this.x,
          this.y,
          this.cardinalPoint
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

        const newCoordinate: string = `${
          rover.getPositionX() +
          " " +
          rover.getPositionY() +
          " " +
          rover.getDirection() +
          "\n"
        }`;

        this.responseRover.push(newCoordinate);
      }
    } catch (error) {
      console.error("Error while processing response, error message: " + error);
      this.responseRover.push("");
    }
  }
}

export default Coordinate;

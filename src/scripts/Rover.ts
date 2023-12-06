/**
 * Class representing a Rover.
 *
 * @class
 */
class Rover {
  private plateauWidth: number;
  private plateauHeight: number;
  private x: number;
  private y: number;
  private direction: "N" | "S" | "E" | "W";

  /**
   * Constructor for the Rover class.
   *
   * @constructor
   * @param {number} plateauWidth - Width of the plateau.
   * @param {number} plateauHeight - Height of the plateau.
   * @param {number} x - Initial x-coordinate of the Rover.
   * @param {number} y - Initial y-coordinate of the Rover.
   * @param {"N" | "S" | "E" | "W"} direction - Initial direction of the Rover.
   */
  constructor(
    plateauWidth: number,
    plateauHeight: number,
    x: number,
    y: number,
    direction: "N" | "S" | "E" | "W"
  ) {
    this.plateauWidth = plateauWidth;
    this.plateauHeight = plateauHeight;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  /**
   * Move the Rover in its current direction.
   *
   * @method
   * @return {void}
   */
  public move(): void {
    switch (this.direction) {
      case "N":
        this.y =
          this.y < this.plateauHeight
            ? this.y + 1
            : this.throwError("northern");
        break;
      case "S":
        this.y = this.y > 0 ? this.y - 1 : this.throwError("southern");
        break;
      case "E":
        this.x =
          this.x < this.plateauWidth ? this.x + 1 : this.throwError("eastern");
        break;
      case "W":
        this.x = this.x > 0 ? this.x - 1 : this.throwError("western");
        break;
    }
  }

  /**
   * Turn the Rover to the left.
   *
   * @method
   * @return {void}
   */
  public turnLeft(): void {
    const directions: Array<"N" | "W" | "S" | "E"> = ["N", "W", "S", "E"];
    const currentIndex = directions.indexOf(this.direction);
    this.direction = directions[(currentIndex + 1) % 4];
  }

  /**
   * Turn the Rover to the right.
   *
   * @method
   * @return {void}
   */
  public turnRight(): void {
    const directions: Array<"N" | "W" | "S" | "E"> = ["N", "W", "S", "E"];
    const currentIndex = directions.indexOf(this.direction);
    this.direction = directions[(currentIndex + 3) % 4];
  }

  /**
   * Get the x-coordinate of the Rover.
   *
   * @method
   * @return {string} - The x-coordinate as a string.
   */
  public getPositionX(): string {
    return this.x.toString();
  }

  /**
   * Get the y-coordinate of the Rover.
   *
   * @method
   * @return {string} - The y-coordinate as a string.
   */
  public getPositionY(): string {
    return this.y.toString();
  }

  /**
   * Get the current direction of the Rover.
   *
   * @method
   * @return {string} - The current direction as a string.
   */
  public getDirection(): string {
    return this.direction;
  }

  /**
   * Throw an error indicating that the Rover reached the specified edge.
   *
   * @method
   * @param {string} edge - The edge reached by the Rover.
   * @throws {Error} - Error indicating the Rover's position.
   * @return {never}
   * @private
   */
  private throwError(edge: string): never {
    throw new Error(
      `Rover reached the ${edge} edge of the plateau x: ${this.x.toString()} y: ${this.y.toString()} direction: ${
        this.direction
      }`
    );
  }
}

export default Rover;

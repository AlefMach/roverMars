class Rover {
  private plateauWidth: number;
  private plateauHeight: number;
  private x: number;
  private y: number;
  private direction: "N" | "S" | "E" | "W";

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

  public turnLeft(): void {
    const directions: Array<"N" | "W" | "S" | "E"> = ["N", "W", "S", "E"];
    const currentIndex = directions.indexOf(this.direction);
    this.direction = directions[(currentIndex + 1) % 4];
  }

  public turnRight(): void {
    const directions: Array<"N" | "W" | "S" | "E"> = ["N", "W", "S", "E"];
    const currentIndex = directions.indexOf(this.direction);
    this.direction = directions[(currentIndex + 3) % 4];
  }

  public getPositionX(): string {
    return this.x.toString();
  }

  public getPositionY(): string {
    return this.y.toString();
  }

  public getDirection(): string {
    return this.direction;
  }

  private throwError(edge: string): never {
    throw new Error(
      `Rover reached the ${edge} edge of the plateau x: ${this.x.toString()} y: ${this.y.toString()} direction: ${
        this.direction
      }`
    );
  }
}

export default Rover;

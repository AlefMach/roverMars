import Rover from "../../src/scripts/Rover";

/**
 * Test suite for the Rover class.
 */
describe("Rover Class Tests", () => {
  /**
   * Test case for checking the correct current position of the rover after a series of movements.
   */
  test("test 1 - should be return the correct current position rover", () => {
    // Set up the rover and perform a series of movements
    const plateauWidth = 5;
    const plateauHeight = 5;
    const rover = new Rover(plateauWidth, plateauHeight, 1, 2, "N");

    rover.turnLeft();
    rover.move();
    rover.turnLeft();
    rover.move();
    rover.turnLeft();
    rover.move();
    rover.turnLeft();
    rover.move();
    rover.move();

    // Expected final position
    const expected: string = "1 3 N";

    // Get the actual final position
    const response_rover: string = `${rover.getPositionX()} ${rover.getPositionY()} ${rover.getDirection()}`;

    // Check if the actual final position matches the expected position
    expect(response_rover).toStrictEqual(expected);
  });

  /**
   * Test case for checking the correct current position of the rover after a different series of movements.
   */
  test("test 2 - should be return the correct current position rover", () => {
    // Set up the rover with a different initial position and perform a series of movements
    const plateauWidth = 5;
    const plateauHeight = 5;
    const x: number = 3;
    const y: number = 3;
    const rover = new Rover(plateauWidth, plateauHeight, x, y, "E");

    rover.move();
    rover.move();
    rover.turnRight();
    rover.move();
    rover.move();
    rover.turnRight();
    rover.move();
    rover.turnRight();
    rover.turnRight();
    rover.move();

    // Expected final position
    const expected: string = "5 1 E";

    // Get the actual final position
    const response_rover: string = `${rover.getPositionX()} ${rover.getPositionY()} ${rover.getDirection()}`;

    // Check if the actual final position matches the expected position
    expect(response_rover).toStrictEqual(expected);
  });
});

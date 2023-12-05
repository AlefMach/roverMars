import Rover from "../../src/scripts/Rover";

test("test 1 - should be return the correct current position rover", () => {
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

  const expected: string = "1 3 N";
  const response_rover: string = `${rover.getPositionX()} ${rover.getPositionY()} ${rover.getDirection()}`;

  expect(response_rover).toStrictEqual(expected);
});

test("test 2 - should be return the correct current position rover", () => {
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

  const expected: string = "5 1 E";
  const response_rover: string = `${rover.getPositionX()} ${rover.getPositionY()} ${rover.getDirection()}`;

  expect(response_rover).toStrictEqual(expected);
});


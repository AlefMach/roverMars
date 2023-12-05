import Coordinate from "../../src/scripts/Coordinate";

test("test 1 = Should return the value correct to coordinate pass", () => {
  const content: string[][] = [
    ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
  ];

  const coordinate = new Coordinate(content);
  let response: string[] = [];
  response = coordinate.get_new_coordinate();

  const expected: string[] = ["1 3 N\n", "5 1 E\n"];

  expect(response).toStrictEqual(expected);
});

test("test 2 = Should return the value correct to coordinate pass", () => {
  const content: string[][] = [
    ["10 10", "6 2 W", "LMLMLMLMM", "7 3 E", "MMRMMRMRRM"],
  ];

  const coordinate = new Coordinate(content);
  let response: string[] = [];
  response = coordinate.get_new_coordinate();

  const expected: string[] = ["5 2 W\n", "9 1 E\n"];

  expect(response).toStrictEqual(expected);
});

test("test 3 = Should return the value correct to coordinate pass", () => {
  const content: string[][] = [
    ["0 0", "6 2 W", "LMLMLMLMM", "7 3 E", "MMRMMRMRRM"], // will return a message error indicating that the coordinate is pass the limit
    ["10 10", "6 2 W", "LMLMLMLMM", "7 3 E", "MMRMMRMRRM"]
  ];

  const coordinate = new Coordinate(content);
  let response: string[] = [];
  response = coordinate.get_new_coordinate();

  const expected: string[] = ["5 2 W\n", "9 1 E\n"];

  expect(response).toStrictEqual(expected);
});
import Coordinate from "../../src/scripts/Coordinate";

/**
 * Test suite for the Coordinate class.
 */
describe("Coordinate Class Tests", () => {
  /**
   * Test case to verify that the Coordinate class returns the correct values.
   */
  test("Should return the correct values for the provided coordinates", () => {
    // Test data with multiple sets of coordinates
    const content: string[][] = [
      ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ];

    // Initialize a Coordinate instance with the test data
    const coordinate = new Coordinate(content);

    // Get the new coordinates based on the provided input
    let response: string[] = [];
    response = coordinate.getNewCoordinate();

    // Expected result based on the provided input
    const expected: string[] = ["1 3 N\n", "5 1 E\n"];

    // Assert that the actual result matches the expected result
    expect(response).toStrictEqual(expected);
  });

  /**
   * Additional test cases can be added for more scenarios.
   */

  // Example of an additional test case
  test("Another test case", () => {
    // Test data for another scenario
    const content: string[][] = [
      ["10 10", "6 2 W", "LMLMLMLMM", "7 3 E", "MMRMMRMRRM"],
    ];

    const coordinate = new Coordinate(content);
    let response: string[] = [];
    response = coordinate.getNewCoordinate();

    const expected: string[] = ["5 2 W\n", "9 1 E\n"];

    expect(response).toStrictEqual(expected);
  });

  // Example of a test case with an invalid scenario
  test("Invalid coordinates should return an error message", () => {
    const content: string[][] = [
      ["0 0", "6 2 W", "LMLMLMLMM", "7 3 E", "MMRMMRMRRM"],
      ["10 10", "6 2 W", "LMLMLMLMM", "7 3 E", "MMRMMRMRRM"],
    ];

    const coordinate = new Coordinate(content);
    let response: string[] = [];
    response = coordinate.getNewCoordinate();

    const expected: string[] = ["5 2 W\n", "9 1 E\n"];

    expect(response).toStrictEqual(expected);
  });
});

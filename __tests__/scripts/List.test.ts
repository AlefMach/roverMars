import List from "../../src/scripts/List";

/**
 * Test suite for the List class.
 */
describe("List Class Tests", () => {
  /**
   * Test case for organizing a list correctly.
   */
  test("should be organize list correctly", () => {
    // Input list
    const list: string[] = ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"];

    // Expected result after organizing the list
    const expected_list: string[] = [
      "5 5",
      "1 2 N",
      "LMLMLMLMM",
      "3 3 E",
      "MMRMMRMRRM",
    ];

    // Get the current organized list
    const current_list: string[] = List.organizeList(list);

    // Check if the current list matches the expected list
    expect(current_list).toStrictEqual(expected_list);
  });

  /**
   * Test case for organizing a list correctly into a matrix.
   */
  test("should be organize list correctly in matrix", () => {
    // Input list
    const list: string[] = ["1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"];

    // Expected result after organizing the list into a matrix
    const expected_list: string[][] = [
      ["1 2 N", "LMLMLMLMM"],
      ["3 3 E", "MMRMMRMRRM"],
    ];

    // Get the current organized list in matrix form
    const current_list: string[][] = List.splitListInParts(list);

    // Check if the current list in matrix form matches the expected list
    expect(current_list).toStrictEqual(expected_list);
  });
});

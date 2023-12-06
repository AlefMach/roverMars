import File from "../../src/scripts/File";

/**
 * Test suite for the File class.
 */
describe("File Class Tests", () => {
  /**
   * Test case for handling a valid file with valid parameters.
   */
  test("handleFile when params is valid", async () => {
    // File path for the valid test case
    const filePath: string = "../../__tests__/input_test_data.txt";
    const file = new File(filePath);

    // Get the content of the file
    const content: string[][] | string = await file.contentFile();

    // Expected result for the valid test case
    expect(content).toStrictEqual([
      ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
      ["5 7", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
      ["0 0", "1 2 N", "LMLMLMLMM", "3 3 E", "LLLMMLLMR"],
      ["0 1", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
      ["0 3", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ]);
  });

  /**
   * Test case for handling an invalid file with invalid parameters.
   */
  test("handleFile when params is invalid", async () => {
    // File path for the invalid test case
    const filePath: string = "../../__tests__/input_test_data_invalid.txt";
    const file = new File(filePath);

    // Get the content of the invalid file
    const content: string[][] | string = await file.contentFile();

    // Expected result for the invalid test case
    expect(content).toStrictEqual([
      ["5 7", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ]);
  });

  /**
   * Test case for handling the scenario where the file is not found.
   */
  test("handleFile when no has file", async () => {
    // File path for the non-existent file test case
    const filePath: string = "";
    const file = new File(filePath);

    // Get the content when there is no file
    const content: string[][] | string = await file.contentFile();

    // Expected result for the non-existent file test case
    expect(content).toStrictEqual("File not found");
  });
});

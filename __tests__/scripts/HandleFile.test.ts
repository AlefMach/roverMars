import File from "../../src/scripts/File";

test('handleFile when params is valid', async() => {
    const filePath: string = "../../__tests__/input_test_data.txt";
    const file = new File(filePath);
    const content: string[][] | string = await file.contentFile();

    expect(content).toStrictEqual([
      ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
      ["5 7", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
      ["0 0", "1 2 N", "LMLMLMLMM", "3 3 E", "LLLMMLLMR"],
      ["0 1", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
      ["0 3", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ]);
});

test("handleFile when params is invalid", async () => {
  const filePath: string = "../../__tests__/input_test_data_invalid.txt";
  const file = new File(filePath);
  const content: string[][] | string = await file.contentFile();

  expect(content).toStrictEqual([
    ["5 7", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
  ]);
});

test("handleFile when no has file", async () => {
  const filePath: string = "";
  const file = new File(filePath);
  const content: string[][] | string = await file.contentFile();

  expect(content).toStrictEqual("File not found");
});
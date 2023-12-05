import HandleFile from "../../src/scripts/HandleFile";

test('handleFile when params is valid', async() => {
    const filePath: string = "../../__tests__/input_test_data.txt";
    const file = new HandleFile(filePath);
    const content: string[][] | string = await file.contentFile();

    expect(content).toStrictEqual([
      ["1 2 N", "3 3 E", "5 5", "LMLMLMLMM", "MMRMMRMRRM"],
      ["1 2 N", "3 3 E", "5 7", "LMLMLMLMM", "MMRMMRMRRM"],
    ]);
});

test("handleFile when params is invalid", async () => {
  const filePath: string = "../../__tests__/input_test_data_invalid.txt";
  const file = new HandleFile(filePath);
  const content: string[][] | string = await file.contentFile();

  console.log(content);

  expect(content).toStrictEqual([
    ["1 2 N", "3 3 E", "5 7", "LMLMLMLMM", "MMRMMRMRRM"],
  ]);
});

test("handleFile when no has file", async () => {
  const filePath: string = "";
  const file = new HandleFile(filePath);
  const content: string[][] | string = await file.contentFile();

  console.log(content);

  expect(content).toStrictEqual("File not found");
});
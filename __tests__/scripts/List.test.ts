import List from "../../src/scripts/List";

test("should be organize list correctly", () => {
  const list: string[] = ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"];
  const expected_list: string[] = [
    "5 5",
    "1 2 N",
    "LMLMLMLMM",
    "3 3 E",
    "MMRMMRMRRM",
  ];

  const current_list: string[] = List.organize_list(list);

  expect(current_list).toStrictEqual(expected_list);
});

test("should be organize list correctly in matrix", () => {
  const list: string[] = ["1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"];
  const expected_list: string[][] = [
    ["1 2 N", "LMLMLMLMM"],
    ["3 3 E", "MMRMMRMRRM"],
  ];

  const current_list: string[][] = List.split_list_in_parts(list);

  expect(current_list).toStrictEqual(expected_list);
});

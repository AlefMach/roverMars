import RegexDefault from "../utils/RegexDefault";

class List {
  public static organizeList(list: string[]): string[] {
    const new_list: string[] = list.sort(
      (string_one: string, string_two: string): number => {
        // Extract the two integers from each element
        const numsA: number[] = (
          string_one.match(RegexDefault.regexTwoNumbersInt) || []
        ).map(Number);
        const numsB: number[] = (
          string_two.match(RegexDefault.regexTwoNumbersInt) || []
        ).map(Number);

        // Compare the two integers
        for (let i = 0; i < 2; i++) {
          if (numsA[i] !== numsB[i]) {
            return numsA[i] - numsB[i];
          }
        }

        // Compare directions (N, S, E, W)
        const dirA: string[] = string_one.match(
          RegexDefault.regexTwoDigitsOneCardinalPoint
        ) || [""];
        const dirB: string[] = string_two.match(
          RegexDefault.regexTwoDigitsOneCardinalPoint
        ) || [""];

        if (dirA[0] !== dirB[0]) {
          return dirA[0].charCodeAt(0) - dirB[0].charCodeAt(0);
        }

        // If both numbers and directions are the same, compare the remaining strings
        return string_one.localeCompare(string_two);
      }
    );

    return new_list;
  }

  public static splitListInParts(list: string[]): string[][] {
    const groupedItems: string[][] = [];

    for (let i = 0; i < list.length; i += 2) {
      const group: string[] = [list[i], list[i + 1]];
      groupedItems.push(group);
    }

    return groupedItems;
  }
}

export default List;
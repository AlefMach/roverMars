import * as fs from "fs";
import * as path from "path";
import List from "./List";
import RegexDefault from "../utils/RegexDefault";

class File {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = path.resolve(__dirname, filePath);
  }

  public async contentFile(): Promise<string[][] | string> {
    try {
      const fileContent = await this.getTextFile();

      if ("content" in fileContent) {
        const validatedData = this.validateAllParams(fileContent.content);
        const validData = validatedData.filter((element) => element.status);

        const response: string[][] = validData.map((element) => {
          const contentArray: string[] = Array.isArray(element.content)
            ? element.content
            : [""];
          return contentArray;
        });

        return response;
      }

      return "File not found";
    } catch (error) {
      console.error("Error reading file:", error);
      return "Error reading file";
    }
  }

  public writeTextFile(value: string): void {
    // Write data to the file
    fs.appendFile(this.filePath, value, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      }
    });
  }

  private readTextFile(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(this.filePath)) {
        fs.readFile(this.filePath, "utf8", (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      } else {
        console.error(`The file ${this.filePath} was not found.`);
        reject(`File not found: ${this.filePath}`);
      }
    });
  }

  private async getTextFile(): Promise<
    { content: string[] } | { status: false }
  > {
    try {
      const fileContent: string = await this.readTextFile();
      console.log("Content file: \n", fileContent);

      // Separate string by traits
      const fileContentArray: string[] = fileContent.split(/[-]+/);
      const objectContent: { content: string[] } = {
        content: fileContentArray,
      };

      return objectContent;
    } catch (error) {
      console.error("Error reading file:", error);
      const objectContent: { status: false } = {
        status: false,
      };
      return objectContent;
    }
  }

  private validateAllParams(
    objectData: string[]
  ): { content: string[]; status: boolean }[] {
    const separateContexts: string[][] = objectData.map((e) => e.split("\n"));
    const filteredData = separateContexts.map((subarray) =>
      subarray.filter((str: string) => str.trim() !== "")
    );

    // Organization list for processing
    const contents = filteredData.map((subArray: string[]) =>
      List.organizeList(subArray)
    );

    const validation = this.regexMatchAllParams(contents);

    const response = validation.map((isValid, i) => {
      return {
        content: contents[i],
        status: isValid,
      };
    });

    return response;
  }

  private regexMatchAllParams(objectData: any[]): boolean[] {
    return objectData.map((subArray) =>
      subArray.every((e: string) =>
        [
          RegexDefault.regexTwoNumbersInt,
          RegexDefault.regexTwoDigitsOneCardinalPoint,
          RegexDefault.regexMRL,
        ].some((regex) => regex.test(e))
      )
    );
  }
}

export default File;

import * as fs from "fs";
import * as path from "path";
import List from "./List";
import RegexDefault from "../utils/RegexDefault";

/**
 * Class representing a utility for file operations.
 *
 * @class
 */
class File {
  private filePath: string;

  /**
   * Constructor for the File class.
   *
   * @constructor
   * @param {string} filePath - The path to the file.
   */
  constructor(filePath: string) {
    this.filePath = path.resolve(__dirname, filePath);
  }

  /**
   * Asynchronously reads the content of the file and performs validation.
   *
   * @method
   * @async
   * @return {Promise<string[][] | string>} - The validated content of the file or an error message.
   */
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

  /**
   * Writes the given value to the file.
   *
   * @method
   * @param {string} value - The value to be written to the file.
   * @return {void}
   */
  public writeTextFile(value: string): void {
    // Write data to the file
    fs.appendFile(this.filePath, value, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      }
    });
  }

  /**
   * Reads the content of the file asynchronously.
   *
   * @method
   * @async
   * @private
   * @return {Promise<string>} - The content of the file.
   */
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

  /**
   * Validates parameters in the file content.
   *
   * @method
   * @private
   * @param {string[]} objectData - The data to be validated.
   * @return {{ content: string[]; status: boolean }[]} - An array indicating the status of each set of data.
   */
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

  /**
   * Performs regex matching on all parameters.
   *
   * @method
   * @private
   * @param {any[]} objectData - The data to be validated.
   * @return {boolean[]} - An array indicating whether each set of data matches the specified regex patterns.
   */
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

  /**
   * Reads the content of the file and separates it into an object with the content property.
   *
   * @method
   * @async
   * @private
   * @return {Promise<{ content: string[] } | { status: false }>} - An object with the content property or an error status.
   */
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
}

export default File;

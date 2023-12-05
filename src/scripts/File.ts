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
    const file_content: { content: string[] } | { status: false } =
      await this.getTextFile();

    if ("content" in file_content) {
      const validate: any[] = this.validate_all_params(file_content.content);

      const validate_status = validate.filter((element: object) => {
        const content = "content" in element ? element.content : "";

        if ("status" in element && element.status) {
          console.log("Moving on to processing, content", content);
          return true;
        } else {
          console.error("Missing or invalid parameters, content: ", content);
          return false;
        }
      });

      let response: string[][] = [];

      validate_status.forEach((element: object) => {
        const content: unknown = "content" in element ? element.content : [""];
        const contentArray: string[] = Array.isArray(content) ? content : [""];
        response.push(contentArray);
      });

      return response;
    }

    return "File not found";
  }

  public writeTextFile(value: string): void {
    // Escrever dados no arquivo
    fs.appendFile(this.filePath, value, "utf8", (err) => {
      if (err) {
        console.error("Erro ao escrever no arquivo:", err);
      } else {
        return;
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
        console.error(`O arquivo ${this.filePath} não foi encontrado.`);
        return;
      }
    });
  }

  private async getTextFile(): Promise<
    { content: string[] } | { status: false }
  > {
    return await this.readTextFile()
      .then((fileContent: string) => {
        console.log("Content file: \n", fileContent);

        // Separate string by traits
        const fileContentArray: string[] = fileContent.split(/[-]+/);
        const object_content: { content: string[] } = {
          content: fileContentArray,
        };

        return object_content;
      })
      .catch((error) => {
        console.error("Erro ao ler o arquivo:", error);
        const object_content: { status: false } = {
          status: false,
        };
        return object_content;
      });
  }

  private validate_all_params(object_data: string[]): object[] {
    let separate_contexts: any[] = [];

    // Separate strings by spaces
    object_data.forEach((e) => {
      separate_contexts.push(e.split("\n"));
    });

    let filtered_data = separate_contexts.map((subarray) =>
      subarray.filter((str: string) => str.trim() !== "")
    );

    // Organization list for processing
    const contents = filtered_data.map((subArray: string[]) =>
      List.organize_list(subArray)
    );

    const validation = this.regex_match_all_params(contents);

    let response: object[] = [];

    for (let i = 0; i < validation.length; i++) {
      let object_default = {
        content: contents[i],
        status: false,
      };

      if (validation[i]) {
        object_default.status = true;
        response.push(object_default);
      } else {
        object_default.status = false;
        response.push(object_default);
      }
    }

    return response;
  }

  private regex_match_all_params(object_data: any[]) {
    return object_data.map((subArray) =>
      subArray.every((e: string) => {
        if (RegexDefault.regex_two_numbers_int.test(e)) {
          return true;
        }

        if (RegexDefault.regex_two_digits_one_cardinal_point.test(e)) {
          return true;
        }

        if (RegexDefault.regex_MRL.test(e)) {
          return true;
        }

        return false;
      })
    );
  }
}

export default File;

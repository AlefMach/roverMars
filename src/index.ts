import File from "./scripts/File";
import EnvironmentVariable from "./envs/EnvironmentVariable";
import Coordinate from "./scripts/Coordinate";

console.log("Starting automation...");

const fn = async (): Promise<void> => {
  console.log("Executing");

  try {
    const filePath: string = EnvironmentVariable.getFilePath();
    const file = new File(filePath);
    const content: string[][] | string = await file.contentFile();
    let response: string[] = [];

    if (Array.isArray(content) && content.length > 0) {
      const coordinate = new Coordinate(content);
      response = coordinate.get_new_coordinate();

      response.forEach((text_value: string) => {
        const file_path: string = "../../response_rover/response.txt"; // Value file_path default to "response.txt"
        const file = new File(file_path);
        file.writeTextFile(text_value);
      });
    } else {
      console.error("Error executing file");
    }

    return;
  } catch (err) {
    console.error(err);
    return;
  }
};

setInterval(() => fn(), EnvironmentVariable.getTimeExecutFunction());

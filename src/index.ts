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
    if (Array.isArray(content) && content.length > 0) {
      content.forEach((list_string: string[]) => {
        const coordinate = new Coordinate(list_string);
        const response: string[] = coordinate.get_new_coordinate();

        console.log(response)

        // const file_path: string = "../../response_rover/response.txt";
        // const file = new File(file_path);
        // file.writeTextFile(new_coordinate);
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

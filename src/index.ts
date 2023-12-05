import File from "./scripts/File";
import EnvironmentVariable from "./envs/EnvironmentVariable";
import Coordinate from "./scripts/Coordinate";

console.log("Starting automation...");

const executeAutomation = async (): Promise<void> => {
  console.log("Executing");

  try {
    const filePath: string = EnvironmentVariable.getFilePath();
    const file = new File(filePath);
    const content: string[][] | string = await file.contentFile();
    let response: string[] = [];

    if (Array.isArray(content) && content.length > 0) {
      const coordinate = new Coordinate(content);
      response = coordinate.getNewCoordinate();

      response.forEach((textValue: string) => {
        const responseFilePath: string = "../../response_rover/response.txt";
        const responseFile = new File(responseFilePath);
        responseFile.writeTextFile(textValue);
      });
    } else {
      console.error("Error executing file");
    }

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

setInterval(
  () => executeAutomation(),
  EnvironmentVariable.getTimeExecutFunction()
);

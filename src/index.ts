import File from "./scripts/File";
import EnvironmentVariable from "./envs/EnvironmentVariable";
import Coordinate from "./scripts/Coordinate";

/**
 * Entry point for the automation script.
 *
 * @function
 * @async
 * @returns {Promise<void>} A Promise that resolves when the automation is executed.
 */
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

/**
 * Set interval to execute the automation function periodically.
 *
 * @function
 */
setInterval(
  () => executeAutomation(),
  EnvironmentVariable.getTimeExecutFunction()
);

console.log("Starting automation...");

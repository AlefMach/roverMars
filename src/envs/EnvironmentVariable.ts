require("dotenv").config();

/**
 * Class representing environment variables.
 *
 * @class EnvironmentVariable
 */
class EnvironmentVariable {
  /**
   * Get the execution time for a function from the environment variables.
   *
   * @method
   * @public
   * @static
   * @return {number} - The execution time in milliseconds.
   */
  public static getTimeExecutFunction(): number {
    // Get time in .env variable file
    const TIME_EXECUT_FUNCTION: string =
      process.env.TIME_EXECUT_FUNCTION ?? "300000";

    const timeExecutFunction = parseInt(TIME_EXECUT_FUNCTION, 10);

    return timeExecutFunction;
  }

  /**
   * Get the file path from the environment variables.
   *
   * @method
   * @public
   * @static
   * @return {string} - The file path.
   */
  public static getFilePath(): string {
    // Get file path in .env variable file
    const filePath: string =
      process.env.FILE_PATH ?? "../../__tests__/input_test_data.txt";
    return filePath;
  }
}

export default EnvironmentVariable;

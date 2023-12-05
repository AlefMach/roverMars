require("dotenv").config();

class EnvironmentVariable {
  public static getTimeExecutFunction(): number {
    // Get time in .env variable file
    const TIME_EXECUT_FUNCTION: string =
      process.env.TIME_EXECUT_FUNCTION ?? "300000";

    const time_execut_function = parseInt(TIME_EXECUT_FUNCTION, 10);

    return time_execut_function;
  }

  public static getFilePath(): string {
    // Get file path in .env variable file
    const file_path: string = process.env.FILE_PATH ?? "../../input_data.txt";
    return file_path;
  }
}

export default EnvironmentVariable;
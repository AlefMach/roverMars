import HandleFile from "./scripts/HandleFile";
import EnvironmentVariable from "./envs/EnvironmentVariable";

console.log("Starting automation...");

const fn = async (): Promise<void> => {
    console.log("Executing");
    
    try {
        const filePath: string = EnvironmentVariable.getFilePath();
        const file = new HandleFile(filePath);
        const content: string[][] | string = await file.contentFile();
        console.log(content);
        return;
    }catch(err) {
        console.error(err);
        return;
    }
}

setInterval(() => fn(), EnvironmentVariable.getTimeExecutFunction());
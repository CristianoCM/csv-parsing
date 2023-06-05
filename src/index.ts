// import { ReadableStream } from "stream/web";
import { request } from "https";

export default class CSV {
  readonly csvSamplePath =
    "https://gist.githubusercontent.com/friedemannsommer/33ccb6d972110d60b870c6f4fbdcb54c/raw/51d9b995ad9ac0f5b1455065c3c8efd9f4ba9080/example.csv";

  constructor() {}

  private csvParser(data: Buffer, shouldIgnoreFirstLine: string) {
    // Parsing Buffer to String
    const dataStr = data.toString();

    // Separating data row by row
    const splitByLines = dataStr.split(/\n/g);

    // Reading line by line to separate all data
    const allDataToShow = [];
    const fieldsNames = splitByLines[0].split(",");
    const startIndex = shouldIgnoreFirstLine.toLowerCase() === "no" ? 0 : 1;

    for (let i = startIndex; i < splitByLines.length - 1; i++) {
      const line = splitByLines[i];

      // Ignoring possible empty lines
      if (!line) {
        continue;
      }

      const columns = line.split(",");

      // Ignoring if the number of lines and number of columns are different
      if (fieldsNames.length !== columns.length) {
        continue;
      }

      const columnsWithFields: any = {};
      for (let j = 0; j < fieldsNames.length; j++) {
        const fieldName = fieldsNames[j];
        // Getting column value and removing all side-by-side repeated double quotes
        // Then enclosing the text between double quotes
        // At last enclosing all fields that contains commas and/or line breaks
        const regexDoubleQuotes = /([\"])\1+/gm;
        const regexBetweenDoubleQuotes = /"([^"\s]*[^"\s])"/g;
        const regexCommandsAndLF = /([^,\n]*[\n,][^,\n]*)/g;
        const column = columns[j]
          .replace(regexDoubleQuotes, "$1")
          .replace(regexBetweenDoubleQuotes, '""$1""')
          .replace(regexCommandsAndLF, '"$&"');

        columnsWithFields[fieldName] = column || "";
      }

      allDataToShow.push(columnsWithFields);
    }

    // Show table on console
    console.table(allDataToShow);
  }

  readCsvFile(pathToFile: string, shouldIgnoreFirstLine: string) {
    // Validating URL
    try {
      new URL(pathToFile);
    } catch (error) {
      console.error("Invalid URL informed", error);
      process.exit(1);
    }

    // Array that will contain the csv chunk data
    const allData = [] as Uint8Array[];

    // Reading URL with data
    request(pathToFile, (res) => {
      // Assembling all data
      res.on("data", (chunk) => allData.push(chunk));
      // After all data is assembled, create a Buffer
      res.on("end", () =>
        this.csvParser(Buffer.concat(allData), shouldIgnoreFirstLine)
      );
    }).end();

    // In case you want to read a file in the project, you could use the following code
    // NOTE: Add this here to show how would be done, but the application is using the HTTPS reader only
    // const fileContent = fs.readFileSync(pathToFile, 'utf-8');

    // in this case pathToFile is the absolute path to access the csv file instead of a url
  }
}

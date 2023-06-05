# CSV Parsing Readme

Aux info about the CSV Parsing project

## Installing dependencies

This project use npm. To install dependencies write the command:

```bash
npm install
```

## Running project

Run the build to generate the dist folder:

```bash
npm run build
```

Then run the CSV parsing application using the command:

```bash
node ./dist/bin/index.js https://url_to_file/file.csv
```

If the URL to the CSV file is not informed the application will pick a sample csv file

Additionaly you can inform as a third parameter if do you want to ignore the first line of the CSV file in the results

```bash
node ./dist/bin/index.js https://url_to_file/file.csv no
```

By default the code will ignore the first line, if you don't want to ignore it you should pass "no" as a third parameter

To show the CSV included in the test the command will be:

```bash
 node ./dist/bin/index.js https://gist.githubusercontent.com/friedemannsommer/33ccb6d972110d60b870c6f4fbdcb54c/raw/51d9b995ad9ac0f5b1455065c3c8efd9f4ba9080/example.csv
```

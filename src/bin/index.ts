#! /usr/bin/env node
import CSV from "../index";

const csv = new CSV();

const csvFile = process.argv[2] || csv.csvSamplePath;
const shouldIgnoreFirstLine = process.argv[3] || "yes";
csv.readCsvFile(csvFile, shouldIgnoreFirstLine);

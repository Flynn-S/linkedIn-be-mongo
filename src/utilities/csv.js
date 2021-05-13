import fs from "fs-extra";
const { createReadStream } = fs;
import { pipeline } from "stream";
import json2csv from "json2csv";

const parser = json2csv.Parser;

export const createCSV = async (target, source) => {
  try {
    const fields = [
      "role",
      "company",
      "startDate",
      "endDate",
      "description",
      "area",
      "profileId",
      "createdAt",
      "updatedAt",
    ];
    const options = { fields };

    const json2csvParser = new parser(options);
    const csvData = json2csvParser.parse(jsonData);

    res.setHeader("Content-Disposition", `attachment; filename=export.csv`);
    res.set("Content-Type", "text/csv");

    const sourceStream = createReadStream(source);

    pipeline(sourceStream, json2csv, target, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

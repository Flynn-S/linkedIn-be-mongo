import { Transform } from "json2csv";
import fs from "fs-extra";
const { createReadStream } = fs;
import { pipeline } from "stream";

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
    const json2csv = new Transform(options);
    res.setHeader("Content-Disposition", `attachment; filename=export.csv`);
    console.log(json2csv);

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

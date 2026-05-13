"use strict";

import { pathUtilities, fileSystemUtilities } from "necessary";

import { PACKAGE_JSON } from "../constants";

const { concatenatePaths } = pathUtilities,
      { readFile, writeFile, checkFileExists } = fileSystemUtilities;

export function readPackageJSONFile(subDirectoryPath) {
  let packageJSON = null;

  try {
    const packageJSONFilePath = concatenatePaths(subDirectoryPath, PACKAGE_JSON),
          packageJSONFIleExists = checkFileExists(packageJSONFilePath);

    if (packageJSONFIleExists) {
      const packageJSONFileContent = readFile(packageJSONFilePath),
            jsonString = packageJSONFileContent,  ///
            json = JSON.parse(jsonString);

      packageJSON = json; ///
    }
  } catch (error) {
    console.log(`There was an error when reading from the package.json file in the '${subDirectoryPath}' sub-directory:`);

    console.log(error);
  }

  return packageJSON;
}

export function writePackageJSONFile(subDirectoryPath, packageJSON) {
  let success;

  try {
    const packageJSONFilePath = concatenatePaths(subDirectoryPath, PACKAGE_JSON),
          json = packageJSON, ///
          jsonString = JSON.stringify(json, null, 2),
          packageJSONContent = `${jsonString}
`;

    writeFile(packageJSONFilePath, packageJSONContent);

    success = true;
  } catch (error) {
    console.log(`There was an error when writing to the package.json file in the "${subDirectoryPath}" sub-directory:`);

    console.log(error);

    success = false;
  }

  return success;
}

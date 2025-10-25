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
      const packageJSONFileContent = readFile(packageJSONFilePath);

      packageJSON = JSON.parse(packageJSONFileContent);
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
          packageJSONContent = JSON.stringify(packageJSON, null, "  ") + "\n";  ///

    writeFile(packageJSONFilePath, packageJSONContent);

    success = true;
  } catch (error) {
    console.log(`There was an error when writing to the package.json file in the "${subDirectoryPath}" sub-directory:`);

    console.log(error);

    success = false;
  }

  return success;
}

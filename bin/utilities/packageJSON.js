"use strict";

const { pathUtilities, arrayUtilities, fileSystemUtilities } = require("necessary");

const { PACKAGE_JSON } = require("../constants");

const { second } = arrayUtilities,
      { concatenatePaths } = pathUtilities,
      { readFile, writeFile, checkFileExists } = fileSystemUtilities;

const utilitiesDirectoryName = __dirname, ///
      matches = utilitiesDirectoryName.match(/^(.+)\/bin\/utilities$/),
      secondMatch = second(matches),
			applicationDirectoryName = secondMatch, ///
			packageJSONFilePath = concatenatePaths(applicationDirectoryName, PACKAGE_JSON),
			packageJSONFile = readFile(packageJSONFilePath),
			packageJSON = JSON.parse(packageJSONFile),
			{ version } = packageJSON,
			packageVersion = version;  ///

function getPackageVersion() {
	return packageVersion;
}

function readPackageJSONFile(subDirectoryPath) {
  let packageJSON = null;

  try {
    const packageJSONFilePath = packageJSONFilePathFromSubDirectoryPath(subDirectoryPath),
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

function writePackageJSONFile(subDirectoryPath, packageJSON) {
  let success;

  try {
    const packageJSONFilePath = packageJSONFilePathFromSubDirectoryPath(subDirectoryPath),
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

module.exports = {
	getPackageVersion,
  readPackageJSONFile,
  writePackageJSONFile
};

function packageJSONFilePathFromSubDirectoryPath(subDirectoryPath) {
  const packageJSONFilePath = concatenatePaths(subDirectoryPath, PACKAGE_JSON);

  return packageJSONFilePath;
}

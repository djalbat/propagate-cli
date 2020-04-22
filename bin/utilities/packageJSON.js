"use strict";

const necessary = require("necessary");

const constants = require("../constants");

const { arrayUtilities, fileSystemUtilities } = necessary,
      { second } = arrayUtilities,
      { PACKAGE_JSON_FILE_NAME } = constants,
      { readFile, writeFile, checkFileExists } = fileSystemUtilities;

const utilitiesDirectoryName = __dirname, ///
      matches = utilitiesDirectoryName.match(/^(.+)\/bin\/utilities$/),
      secondMatch = second(matches),
			applicationDirectoryName = secondMatch, ///
			packageJSONFilePath = `${applicationDirectoryName}/${PACKAGE_JSON_FILE_NAME}`,
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

    process.exit();
  }

  return packageJSON;
}

function writePackageJSONFile(subDirectoryPath, packageJSON) {
  try {
    const packageJSONFilePath = packageJSONFilePathFromSubDirectoryPath(subDirectoryPath),
          packageJSONContent = JSON.stringify(packageJSON, null, "  ") + '\n';  ///

    writeFile(packageJSONFilePath, packageJSONContent);
  } catch (error) {
    console.log(`There was an error when writing to the package.json file in the '${subDirectoryPath}' sub-directory:`);

    console.log(error);

    process.exit();
  }
}

module.exports = {
	getPackageVersion,
  readPackageJSONFile,
  writePackageJSONFile
};

function packageJSONFilePathFromSubDirectoryPath(subDirectoryPath) {
  const packageJSONFilePath = `${subDirectoryPath}/${PACKAGE_JSON_FILE_NAME}`;

  return packageJSONFilePath;
}

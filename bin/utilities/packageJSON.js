'use strict';

const necessary = require('necessary');

const constants = require('../constants');

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

  const packageJSONFilePath = packageJSONFilePathFromSubDirectoryPath(subDirectoryPath),
        packageJSONFIleExists = checkFileExists(packageJSONFilePath);

  if (packageJSONFIleExists) {
    const packageJSONFileContent = readFile(packageJSONFilePath);

    packageJSON = JSON.parse(packageJSONFileContent);
  }

  return packageJSON;
}

function writePackageJSONFile(subDirectoryPath, packageJSON) {
  const packageJSONFilePath = packageJSONFilePathFromSubDirectoryPath(subDirectoryPath),
        packageJSONContent = JSON.stringify(packageJSON, null, '  ');

  writeFile(packageJSONFilePath, packageJSONContent);
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

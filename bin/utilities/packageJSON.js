'use strict';

const necessary = require('necessary');

const constants = require('../constants');

const { arrayUtilities, fileSystemUtilities } = necessary,
      { second } = arrayUtilities,
      { readFile, checkFileExists } = fileSystemUtilities,
      { PACKAGE_JSON_FILE_NAME } = constants;

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

  const packageJSONFilePath = `${subDirectoryPath}/${PACKAGE_JSON_FILE_NAME}`,
        packageJSONFIleExists = checkFileExists(packageJSONFilePath);

  if (packageJSONFIleExists) {
    const packageJSONFileContent = readFile(packageJSONFilePath);

    packageJSON = JSON.parse(packageJSONFileContent);
  }

  return packageJSON;
}

module.exports = {
	getPackageVersion,
  readPackageJSONFile
};

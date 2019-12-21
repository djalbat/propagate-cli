'use strict';

const necessary = require('necessary');

const constants = require('./constants');

const { fileSystemUtilities } = necessary,
      { PACKAGE_JSON_FILE_NAME } = constants,
      { readFile, checkFileExists } = fileSystemUtilities;

class Release {
  constructor(name, version, dependencies, devDependencies ) {
    this.name = name;
    this.version = version;
    this.dependencies = dependencies;
    this.devDependencies = devDependencies;
  }

  getName() {
    return this.name;
  }

  getVersion() {
    return this.version;
  }

  getDependencies() {
    return this.dependencies;
  }

  getDevDependencies() {
    return this.devDependencies;
  }

  static fromSubDirectoryRPath(subDirectoryPath) {
    let release = null;

    const packageJSONFilePath = `${subDirectoryPath}/${PACKAGE_JSON_FILE_NAME}`,
          packageJSONFIleExists = checkFileExists(packageJSONFilePath);

    if (packageJSONFIleExists) {
      const packageJSONFileContent = readFile(packageJSONFilePath),
            packageJSON = JSON.parse(packageJSONFileContent),
            { name = null, version = null, dependencies = {}, devDependencies = {}  } = packageJSON;

      release = new Release(name, version, dependencies, devDependencies);
   }

    return release;
  }
}

module.exports = Release;

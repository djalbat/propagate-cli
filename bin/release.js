'use strict';

const necessary = require('necessary');

const constants = require('./constants');

const { fileSystemUtilities } = necessary,
      { PACKAGE_JSON_FILE_NAME } = constants,
      { readFile, checkFileExists } = fileSystemUtilities;

class Release {
  constructor(name, version, dependencyMap, devDependencyMap, subDirectoryPath) {
    this.name = name;
    this.version = version;
    this.dependencyMap = dependencyMap;
    this.devDependencyMap = devDependencyMap;
    this.subDirectoryPath = subDirectoryPath;
  }

  getName() {
    return this.name;
  }

  getVersion() {
    return this.version;
  }

  getDependencyMap() {
    return this.dependencyMap;
  }

  getDevDependencyMap() {
    return this.devDependencyMap;
  }

  getSubDirectoryPath() {
    return this.subDirectoryPath;
  }

  isPublishable() {
    const publishable = (this.name !== null) && (this.version !== null);

    return publishable;
  }

  static fromSubDirectoryRPath(subDirectoryPath) {
    let release = null;

    const packageJSONFilePath = `${subDirectoryPath}/${PACKAGE_JSON_FILE_NAME}`,
          packageJSONFIleExists = checkFileExists(packageJSONFilePath);

    if (packageJSONFIleExists) {
      const packageJSONFileContent = readFile(packageJSONFilePath),
            packageJSON = JSON.parse(packageJSONFileContent),
            { name = null, version = null, dependencies = {}, devDependencies = {}  } = packageJSON,
            dependencyMap = dependencies, ///
            devDependencyMap = devDependencies; ///

      release = new Release(name, version, dependencyMap, devDependencyMap, subDirectoryPath);
   }

    return release;
  }
}

module.exports = Release;

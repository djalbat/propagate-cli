'use strict';

const necessary = require('necessary');

const constants = require('./constants');

const { fileSystemUtilities } = necessary,
      { PACKAGE_JSON_FILE_NAME } = constants,
      { readFile, checkFileExists } = fileSystemUtilities;

class Release {
  constructor(name, version, newVersion, dependencyMap, devDependencyMap, subDirectoryPath) {
    this.name = name;
    this.version = version;
    this.newVersion = newVersion;
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

  getNewVersion() {
    return this.newVersion;
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

  setNewVersion(newVersion) {
    this.newVersion = newVersion;
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
            newVersion = null,
            dependencyMap = dependencies, ///
            devDependencyMap = devDependencies; ///

      release = new Release(name, version, newVersion, dependencyMap, devDependencyMap, subDirectoryPath);
   }

    return release;
  }
}

module.exports = Release;

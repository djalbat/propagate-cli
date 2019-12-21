'use strict';

const necessary = require('necessary');

const constants = require('./constants');

const { arrayUtilities, fileSystemUtilities } = necessary,
      { second } = arrayUtilities,
      { PACKAGE_JSON_FILE_NAME } = constants,
      { readFile, checkFileExists } = fileSystemUtilities;

class Release {
  constructor(name, version, propagated, dependencyMap, devDependencyMap, subDirectoryPath) {
    this.name = name;
    this.version = version;
    this.propagated = propagated;
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

  hasPropagated() {
    return this.propagated;
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

  propagate() {
    this.propagated = true;
  }

  bumpPatchVersion() {
    const matches = this.version.match(/(\d+)$/),
          secondMatch = second(matches);

    let patchNumber = Number(secondMatch);

    patchNumber++;

    this.version = this.version.replace(/(\d+)$/, patchNumber)
  }

  updateDependencyVersion(name, version) {
    updateVersion(name, version, this.dependencyMap);
  }

  updateDevDependencyVersion(name, version) {
    updateVersion(name, version, this.devDependencyMap);
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
            propagated = null,
            dependencyMap = dependencies, ///
            devDependencyMap = devDependencies; ///

      release = new Release(name, version, propagated, dependencyMap, devDependencyMap, subDirectoryPath);
   }

    return release;
  }
}

module.exports = Release;

function updateVersion(name, version, map) {
  let semver = map[name] || null;

  if (semver !== null) {
    semver = semver.replace(/\d+\.\d+\.\d+/, version);
  }

  map[name] = semver;
}
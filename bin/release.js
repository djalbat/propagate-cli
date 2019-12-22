'use strict';

const necessary = require('necessary');

const packageJSONUtilities = require('./utilities/packageJSON');

const { arrayUtilities } = necessary,
      { second } = arrayUtilities,
      { readPackageJSONFile } = packageJSONUtilities;

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
    updateSemver(name, version, this.dependencyMap);
  }

  updateDevDependencyVersion(name, version) {
    updateSemver(name, version, this.devDependencyMap);
  }

  isPublishable() {
    const publishable = (this.name !== null) && (this.version !== null);

    return publishable;
  }

  static fromSubDirectoryRPath(subDirectoryPath) {
    let release = null;

    const packageJSON = readPackageJSONFile(subDirectoryPath);

    if (packageJSON !== null) {
      const { name = null,
              version = null,
              dependencies = {},
              devDependencies = {} } = packageJSON,
            propagated = false,
            dependencyMap = dependencies, ///
            devDependencyMap = devDependencies; ///

      release = new Release(name, version, propagated, dependencyMap, devDependencyMap, subDirectoryPath);
   }

    return release;
  }
}

module.exports = Release;

function updateSemver(name, version, map) {
  let semver = map[name] || null;

  if (semver !== null) {
    semver = semver.replace(/\d+\.\d+\.\d+/, version);
  }

  map[name] = semver;
}

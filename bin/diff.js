'use strict';

const MapDiff = require('./diff/map'),
      constants = require('./constants'),
      VersionDiff = require('./diff/version'),
      packageJSONUtilities = require('./utilities/packageJSON');

const { DEPENDENCIES_NAME, DEV_DEPENDENCIES_NAME } = constants,
      { readPackageJSONFile, writePackageJSONFile } = packageJSONUtilities;

class Diff {
  constructor(release, versionDiff, dependencyMapDiff, devDependencyMapDiff) {
    this.release = release;
    this.versionDiff = versionDiff;
    this.dependencyMapDiff = dependencyMapDiff;
    this.devDependencyMapDiff = devDependencyMapDiff;
  }

  getRelease() {
    return this.release;
  }

  getVersionDiff() {
    return this.versionDiff;
  }

  getDependencyMapDiff() {
    return this.dependencyMapDiff;
  }

  getDevDependencyMapDiff() {
    return this.devDependencyMapDiff;
  }

  hasVersionChanged() {
    const versionChanged = (this.versionDiff !== null);

    return versionChanged;
  }

  haveDependenciesChanged() {
    const dependenciesChanged = (this.dependencyMapDiff !== null);

    return dependenciesChanged;
  }

  haveDevDependenciesChanged() {
    const devDependenciesChanged = (this.devDependencyMapDiff !== null);

    return devDependenciesChanged;
  }

  hasChanged() {
    const versionChanged = this.hasVersionChanged(),
          dependenciesChanged = this.haveDependenciesChanged(),
          devDependenciesChanged = this.haveDevDependenciesChanged(),
          changed = versionChanged || dependenciesChanged || devDependenciesChanged;

    return changed;
  }

  getSubDirectoryPath() { return this.release.getSubDirectoryPath(); }

  getName() { return this.release.getName(); }

  apply() {
    const changed = this.hasChanged();

    if (changed) {
      const versionChanged = this.hasVersionChanged(),
            dependenciesChanged = this.haveDependenciesChanged(),
            devDependenciesChanged = this.haveDevDependenciesChanged(),
            subDirectoryPath = this.getSubDirectoryPath(),
            packageJSON = readPackageJSONFile(subDirectoryPath);

      if (versionChanged) {
        this.versionDiff.apply(packageJSON);
      }

      if (dependenciesChanged) {
        this.dependencyMapDiff.apply(packageJSON, DEPENDENCIES_NAME);
      }

      if (devDependenciesChanged) {
        this.devDependencyMapDiff.apply(packageJSON, DEV_DEPENDENCIES_NAME);
      }

      writePackageJSONFile(subDirectoryPath, packageJSON);
    }
  }

  asString() {
    let unchanged = true;

    const name = this.getName(),
          subDirectoryPath = this.getSubDirectoryPath();

    let string = (name === null) ?
                  ` '${subDirectoryPath}':\n` :
                    ` '${subDirectoryPath}' ("${name}"):\n`;

    if (this.versionDiff !== null) {
      const versionDiffString = this.versionDiff.asString();

      string += `\n   "version": ${versionDiffString},`;

      unchanged = false;
    }

    if (this.dependencyMapDiff !== null) {
      const dependencyMapDiffString = this.dependencyMapDiff.asString();

      string += `\n   "dependencies": ${dependencyMapDiffString},`;

      unchanged = false;
    }

    if (this.devDependencyMapDiff !== null) {
      const devDependencyMapDiffString = this.devDependencyMapDiff.asString();

      string += `\n   "devDependencies": ${devDependencyMapDiffString},`;

      unchanged = false;
    }

    if (unchanged) {
      string = null;
    } else {
      string = string.replace(/,$/, '\n');
    }

    return string;
  }

  static fromRelease(release) {
    const subDirectoryPath = release.getSubDirectoryPath(),
          packageJSON = readPackageJSONFile(subDirectoryPath),
          { version = null, dependencies = {}, devDependencies = {} } = packageJSON,
          dependencyMap = dependencies, ///
          devDependencyMap = devDependencies, ///
          releaseVersion = release.getVersion(),
          releaseDependencyMap = release.getDependencyMap(),
          releaseDevDependencyMap = release.getDevDependencyMap(),
          versionDiff = VersionDiff.fromVersionAndReleaseVersion(version, releaseVersion),
          dependencyMapDiff = MapDiff.fromMapAndReleaseMap(dependencyMap, releaseDependencyMap),
          devDependencyMapDiff = MapDiff.fromMapAndReleaseMap(devDependencyMap, releaseDevDependencyMap),
          diff = new Diff(release, versionDiff, dependencyMapDiff, devDependencyMapDiff);

    return diff;
  }
}

module.exports = Diff;

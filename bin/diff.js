"use strict";

const MapDiff = require("./diff/map"),
      constants = require("./constants"),
      VersionDiff = require("./diff/version"),
      packageJSONUtilities = require("./utilities/packageJSON");

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

  getName() { return this.release.getName(); }

  isPublishable() { return this.release.isPublishable(); }

  getSubDirectoryPath() { return this.release.getSubDirectoryPath(); }

  getDevDependencyNames() { return this.release.getDevDependencyNames(); }

  isVersionDiffEmpty() { return this.versionDiff.isEmpty(); }

  isDependencyMapDiffEmpty() { return this.dependencyMapDiff.isEmpty(); }

  isDevDependencyMapDiffEmpty() { return this.devDependencyMapDiff.isEmpty(); }

  save() {
    let success = false;

    const subDirectoryPath = this.getSubDirectoryPath(),
          packageJSON = readPackageJSONFile(subDirectoryPath);

    if (packageJSON !== null) {
      this.versionDiff.save(packageJSON);

      this.dependencyMapDiff.save(packageJSON, DEPENDENCIES_NAME);

      this.devDependencyMapDiff.save(packageJSON, DEV_DEPENDENCIES_NAME);

      success = writePackageJSONFile(subDirectoryPath, packageJSON);
    }

    return success;
  }

  git(quietly, callback) { this.release.git(quietly, callback); }

  build(quietly, callback) { this.release.build(quietly, callback); }

  publish(quietly, callback) { this.release.publish(quietly, callback); }

  removeDependency(name) { this.dependencyMapDiff.removeSemverDiff(name); }

  removeDevDependency(name) { this.devDependencyMapDiff.removeSemverDiff(name); }

  asString() {
    let string = ``;

    const name = this.getName(),
          subDirectoryPath = this.getSubDirectoryPath();

    string += (name === null) ?
            ` "${subDirectoryPath}":\n` :
              ` "${subDirectoryPath}" ("${name}"):\n`;

    const versionDiffEmpty = this.isVersionDiffEmpty(),
          dependencyMapDiffEmpty = this.isDependencyMapDiffEmpty(),
          devDependencyMapDiffEmpty = this.isDevDependencyMapDiffEmpty();

    if (!versionDiffEmpty) {
      const versionDiffString = this.versionDiff.asString();

      string += `\n   "version": ${versionDiffString},`;
    }

    if (!dependencyMapDiffEmpty) {
      const dependencyMapDiffString = this.dependencyMapDiff.asString();

      string += `\n   "dependencies": ${dependencyMapDiffString},`;
    }

    if (!devDependencyMapDiffEmpty) {
      const devDependencyMapDiffString = this.devDependencyMapDiff.asString();

      string += `\n   "devDependencies": ${devDependencyMapDiffString},`;
    }

    string = string.replace(/,$/, "\n");

    return string;
  }

  static fromRelease(release) {
    const subDirectoryPath = release.getSubDirectoryPath(),
          packageJSON = readPackageJSONFile(subDirectoryPath);

    if (packageJSON === null) {
      process.exit(1);
    }

    const { version = null, dependencies = {}, devDependencies = {} } = packageJSON,
          versionString = version,  ///
          dependencyMap = dependencies, ///
          devDependencyMap = devDependencies, ///
          releaseVersion = release.getVersion(),
          releaseDependencyMap = release.getDependencyMap(),
          releaseDevDependencyMap = release.getDevDependencyMap(),
          versionDiff = VersionDiff.fromVersionStringAndReleaseVersion(versionString, releaseVersion),
          dependencyMapDiff = MapDiff.fromMapAndReleaseMap(dependencyMap, releaseDependencyMap),
          devDependencyMapDiff = MapDiff.fromMapAndReleaseMap(devDependencyMap, releaseDevDependencyMap),
          diff = new Diff(release, versionDiff, dependencyMapDiff, devDependencyMapDiff);

    return diff;
  }
}

module.exports = Diff;

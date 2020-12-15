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

  isDependencyMapDiffEmpty() { return this.dependencyMapDiff.isEmpty(); }

  isDevDependencyMapDiffEmpty() { return this.devDependencyMapDiff.isEmpty(); }

  isEmpty() {
    const versionDiffEmpty = this.versionDiff.isEmpty(),
          dependencyMapDiffEmpty = this.dependencyMapDiff.isEmpty(),
          devDependencyMapDiffEmpty = this.devDependencyMapDiff.isEmpty(),
          empty = (versionDiffEmpty && dependencyMapDiffEmpty && devDependencyMapDiffEmpty);

    return empty;
  }

  save() {
    const subDirectoryPath = this.getSubDirectoryPath(),
          packageJSON = readPackageJSONFile(subDirectoryPath);

    this.versionDiff.save(packageJSON);

    this.dependencyMapDiff.save(packageJSON, DEPENDENCIES_NAME);

    this.devDependencyMapDiff.save(packageJSON, DEV_DEPENDENCIES_NAME);

    writePackageJSONFile(subDirectoryPath, packageJSON);
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

    const versionDiffEmpty = this.versionDiff.isEmpty(),
          dependencyMapDiffEmpty = this.dependencyMapDiff.isEmpty(),
          devDependencyMapDiffEmpty = this.devDependencyMapDiff.isEmpty();

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
    let diff = null;

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
          versionDiffEmpty = versionDiff.isEmpty(),
          dependencyMapDiffEmpty = dependencyMapDiff.isEmpty(),
          devDependencyMapDiffEmpty = devDependencyMapDiff.isEmpty();

    if (!versionDiffEmpty || !dependencyMapDiffEmpty || !devDependencyMapDiffEmpty) {
      diff = new Diff(release, versionDiff, dependencyMapDiff, devDependencyMapDiff);
    }

    return diff;
  }
}

module.exports = Diff;

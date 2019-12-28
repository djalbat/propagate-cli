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

  isVersionUpdated() {
    const versionUpdated = (this.versionDiff !== null);

    return versionUpdated;
  }

  areDependenciesUpdated() {
    const dependenciesUpdated = (this.dependencyMapDiff !== null);

    return dependenciesUpdated;
  }

  areDevDependenciesUpdated() {
    const devDependenciesUpdated = (this.devDependencyMapDiff !== null);

    return devDependenciesUpdated;
  }

  isBuildable() {
    const devDependenciesUpdated = this.areDevDependenciesUpdated(),
          buildable = devDependenciesUpdated; ///

    return buildable;
  }

  getName() { return this.release.getName(); }

  isPublishable() { return this.release.isPublishable(); }

  getSubDirectoryPath() { return this.release.getSubDirectoryPath(); }

  git(quietly) { this.release.git(quietly); }

  build(quietly) { this.release.build(quietly); }

  publish(quietly) { this.release.publish(quietly); }

  save() {
    const subDirectoryPath = this.getSubDirectoryPath(),
          packageJSON = readPackageJSONFile(subDirectoryPath),
          versionUpdated = this.isVersionUpdated(),
          dependenciesUpdated = this.areDependenciesUpdated(),
          devDependenciesUpdated = this.areDevDependenciesUpdated();

    if (versionUpdated) {
      this.versionDiff.save(packageJSON);
    }

    if (dependenciesUpdated) {
      this.dependencyMapDiff.save(packageJSON, DEPENDENCIES_NAME);
    }

    if (devDependenciesUpdated) {
      this.devDependencyMapDiff.save(packageJSON, DEV_DEPENDENCIES_NAME);
    }

    writePackageJSONFile(subDirectoryPath, packageJSON);
  }

  asString() {
    let string = ``;

    const name = this.getName(),
          subDirectoryPath = this.getSubDirectoryPath();

    string += (name === null) ?
            ` '${subDirectoryPath}':\n` :
              ` '${subDirectoryPath}' ("${name}"):\n`;

    if (this.versionDiff !== null) {
      const versionDiffString = this.versionDiff.asString();

      string += `\n   "version": ${versionDiffString},`;
    }

    if (this.dependencyMapDiff !== null) {
      const dependencyMapDiffString = this.dependencyMapDiff.asString();

      string += `\n   "dependencies": ${dependencyMapDiffString},`;
    }

    if (this.devDependencyMapDiff !== null) {
      const devDependencyMapDiffString = this.devDependencyMapDiff.asString();

      string += `\n   "devDependencies": ${devDependencyMapDiffString},`;
    }

    string = string.replace(/,$/, '\n');

    return string;
  }

  static fromRelease(release) {
    let diff = null;

    const subDirectoryPath = release.getSubDirectoryPath(),
          packageJSON = readPackageJSONFile(subDirectoryPath),
          { version = null,
            dependencies = {},
            devDependencies = {} } = packageJSON,
          dependencyMap = dependencies, ///
          devDependencyMap = devDependencies, ///
          releaseVersion = release.getVersion(),
          releaseDependencyMap = release.getDependencyMap(),
          releaseDevDependencyMap = release.getDevDependencyMap(),
          versionDiff = VersionDiff.fromVersionAndReleaseVersion(version, releaseVersion),
          dependencyMapDiff = MapDiff.fromMapAndReleaseMap(dependencyMap, releaseDependencyMap),
          devDependencyMapDiff = MapDiff.fromMapAndReleaseMap(devDependencyMap, releaseDevDependencyMap);

    if (  (versionDiff !== null) ||
          (dependencyMapDiff !== null) ||
          (devDependencyMapDiff !== null) ) {

      diff = new Diff(release, versionDiff, dependencyMapDiff, devDependencyMapDiff);
    }

    return diff;
  }
}

module.exports = Diff;

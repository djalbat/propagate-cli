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

  isUpdated() {
    const versionUpdated = this.isVersionUpdated(),
          dependenciesUpdated = this.areDependenciesUpdated(),
          devDependenciesUpdated = this.areDevDependenciesUpdated(),
          updated = versionUpdated || dependenciesUpdated || devDependenciesUpdated;

    return updated;
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

  getUpdatedDependencyNames() {
    const updatedDependencyNames = [],
          dependenciesUpdated = this.areDependenciesUpdated();

    if (dependenciesUpdated) {
      const semverDiffs = this.dependencyMapDiff.getSemverDiffs();

      semverDiffs.forEach((semverDiff) => {
        const name = semverDiff.getName();

        const updatedDependencyName = name; ///

        updatedDependencyNames.push(updatedDependencyName);
      })
    }

    return updatedDependencyNames;
  }

  getUpdatedDevDependencyNames() {
    const updatedDevDependencyNames = [],
          devDependenciesUpdated = this.areDevDependenciesUpdated();

    if (devDependenciesUpdated) {
      const semverDiffs = this.devDependencyMapDiff.getSemverDiffs();

      semverDiffs.forEach((semverDiff) => {
        const name = semverDiff.getName();

        const updatedDevDependencyName = name; ///

        updatedDevDependencyNames.push(updatedDevDependencyName);
      })
    }

    return updatedDevDependencyNames;
  }

  isBuildable() {
    const devDependenciesUpdated = this.areDevDependenciesUpdated(),
          buildable = devDependenciesUpdated; ///

    return buildable;
  }

  getName() { return this.release.getName(); }

  isBuilt() { return this.release.isBuilt(); }

  isPublished() { return this.release.isPublished(); }

  isPropagated() { return this.release.isPropagated(); }

  isPublishable() { return this.release.isPublishable(); }

  getSubDirectoryPath() { return this.release.getSubDirectoryPath(); }

  git(quietly) { this.release.git(quietly); }

  build(quietly) { this.release.build(quietly); }

  publish(quietly) { this.release.publish(quietly); }

  apply() {
    const updated = this.isUpdated();

    if (updated) {
      const versionUpdated = this.isVersionUpdated(),
            dependenciesUpdated = this.areDependenciesUpdated(),
            devDependenciesUpdated = this.areDevDependenciesUpdated(),
            subDirectoryPath = this.getSubDirectoryPath(),
            packageJSON = readPackageJSONFile(subDirectoryPath);

      if (versionUpdated) {
        this.versionDiff.apply(packageJSON);
      }

      if (dependenciesUpdated) {
        this.dependencyMapDiff.apply(packageJSON, DEPENDENCIES_NAME);
      }

      if (devDependenciesUpdated) {
        this.devDependencyMapDiff.apply(packageJSON, DEV_DEPENDENCIES_NAME);
      }

      writePackageJSONFile(subDirectoryPath, packageJSON);
    }
  }

  asString() {
    let unupdated = true;

    const name = this.getName(),
          subDirectoryPath = this.getSubDirectoryPath();

    let string = (name === null) ?
                  ` '${subDirectoryPath}':\n` :
                    ` '${subDirectoryPath}' ("${name}"):\n`;

    if (this.versionDiff !== null) {
      const versionDiffString = this.versionDiff.asString();

      string += `\n   "version": ${versionDiffString},`;

      unupdated = false;
    }

    if (this.dependencyMapDiff !== null) {
      const dependencyMapDiffString = this.dependencyMapDiff.asString();

      string += `\n   "dependencies": ${dependencyMapDiffString},`;

      unupdated = false;
    }

    if (this.devDependencyMapDiff !== null) {
      const devDependencyMapDiffString = this.devDependencyMapDiff.asString();

      string += `\n   "devDependencies": ${devDependencyMapDiffString},`;

      unupdated = false;
    }

    if (unupdated) {
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

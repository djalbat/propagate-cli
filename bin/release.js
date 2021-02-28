"use strict";

const Version = require("./version"),
      configuration = require("./configuration"),
      shellUtilities = require("./utilities/shell"),
      packageJSONUtilities = require("./utilities/packageJSON");

const { execute } = shellUtilities,
      { readPackageJSONFile } = packageJSONUtilities,
      { retrieveShellCommands } = configuration;

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

  getVersionString() {
    const versionString = this.version.asString();

    return versionString; ///
  }

  getDependencyNames() {
    const dependencyNames = Object.keys(this.dependencyMap);

    return dependencyNames;
  }

  getDevDependencyNames() {
    const devDependencyNames = Object.keys(this.devDependencyMap);

    return devDependencyNames;
  }

  git(quietly, callback) {
    let shellCommands = retrieveShellCommands();

    const { git } = shellCommands,
          gitShellCommands = git;

    shellCommands = gitShellCommands; ///

    this.executeShellCommands(shellCommands, quietly, callback);
  }

  build(quietly, callback) {
    let shellCommands = retrieveShellCommands();

    const { build } = shellCommands,
          buildShellCommands = build;

    shellCommands = buildShellCommands; ///

    this.executeShellCommands(shellCommands, quietly, callback);
  }

  publish(quietly, callback) {
    let shellCommands = retrieveShellCommands();

    const { publish } = shellCommands,
          publishShellCommands = publish;

    shellCommands = publishShellCommands; ///

    this.executeShellCommands(shellCommands, quietly, callback);
  }

  bumpPatchNumber() { this.version.bumpPatchNumber(); }

  executeShellCommands(shellCommands, quietly, callback) {
    const currentWorkingDirectoryPath = process.cwd();

    process.chdir(this.subDirectoryPath);

    execute(shellCommands, quietly, (success) => {
      process.chdir(currentWorkingDirectoryPath);

      callback(success);
    });
  }

  updateDependencyVersion(name, versionString) {
    const success = updateSemver(name, versionString, this.dependencyMap);

    if (!success) {
      console.log(`Either the '${name}' dependency version of the '${this.subDirectoryPath}' release is greater than or equal to the propagated '${versionString}' version or it cannot be parsed.`);

      process.exit(1);
    }
  }

  updateDevDependencyVersion(name, versionString) {
    const success = updateSemver(name, versionString, this.devDependencyMap);

    if (!success) {
      console.log(`Either the '${name}' developer dependency version of the '${this.subDirectoryPath}' release is greater than or equal to the propagated '${versionString}' version or it cannot be parsed.`);

      process.exit(1);
    }
  }

  static fromSubDirectoryPath(subDirectoryPath) {
    let release = null;

    const packageJSON = readPackageJSONFile(subDirectoryPath);

    if (packageJSON !== null) {
      let { version = null } = packageJSON;

      const { name = null, dependencies = {}, devDependencies = {} } = packageJSON,
            versionString = version,  ///
            dependencyMap = dependencies, ///
            devDependencyMap = devDependencies; ///

      version = Version.fromVersionString(versionString);

      release = new Release(name, version, dependencyMap, devDependencyMap, subDirectoryPath);
    }

    return release;
  }
}

module.exports = Release;

function updateSemver(name, versionString, map) {
  let success = false;

  let semver = map[name];

  const version = Version.fromVersionString(versionString),
        existingSemver = semver, ///
        existingVersion = Version.fromString(existingSemver);

  if (existingVersion !== null) {
    const versionGreaterThanExistingVersion = version.isGreaterThan(existingVersion);

    success = versionGreaterThanExistingVersion;  ///

    if (success) {
      semver = version.updateSemver(semver);

      map[name] = semver;
    }
  }

  return success;
}

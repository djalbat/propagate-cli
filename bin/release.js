'use strict';

const necessary = require('necessary');

const configuration = require('./configuration'),
      shellUtilities = require('./utilities/shell'),
      packageJSONUtilities = require('./utilities/packageJSON');

const { arrayUtilities } = necessary,
      { second } = arrayUtilities,
      { execute } = shellUtilities,
      { cwd, chdir } = process,
      { readPackageJSONFile } = packageJSONUtilities,
      { retrieveShellCommands } = configuration;

class Release {
  constructor(name, version, dependencyMap, devDependencyMap, subDirectoryPath, propagated) {
    this.name = name;
    this.version = version;
    this.dependencyMap = dependencyMap;
    this.devDependencyMap = devDependencyMap;
    this.subDirectoryPath = subDirectoryPath;
    this.propagated = propagated;
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

  isPropagated() {
    return this.propagated;
  }

  isPublishable() {
    const publishable = (this.name !== null) && (this.version !== null);

    return publishable;
  }

  getDependencyNames() {
    const dependencyNames = Object.keys(this.dependencyMap);

    return dependencyNames;
  }

  getDevDependencyNames() {
    const devDependencyNames = Object.keys(this.devDependencyMap);

    return devDependencyNames;
  }

  git(quietly) {
    let shellCommands = retrieveShellCommands();

    const { git } = shellCommands,
          gitShellCommands = git;

    shellCommands = gitShellCommands; ///

    this.execute(shellCommands, quietly);
  }

  build(quietly) {
    let shellCommands = retrieveShellCommands();

    const { build } = shellCommands,
          buildShellCommands = build;

    shellCommands = buildShellCommands; ///

    this.execute(shellCommands, quietly);
  }

  publish(quietly) {
    let shellCommands = retrieveShellCommands();

    const { publish } = shellCommands,
          publishShellCommands = publish;

    shellCommands = publishShellCommands; ///

    this.execute(shellCommands, quietly);
  }

  execute(shellCommands, quietly) {
    const currentWorkingDirectoryPath = cwd();

    chdir(this.subDirectoryPath);

    const output = execute(shellCommands, quietly);

    if (!quietly) {
      (this.name === null) ?
        console.log(` '${this.subDirectoryPath}': ${output}`) :
          console.log(` '${this.subDirectoryPath}' ("${this.name}"): ${output}`);
    }

    chdir(currentWorkingDirectoryPath);
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

  static fromSubDirectoryPath(subDirectoryPath) {
    let release = null;

    const packageJSON = readPackageJSONFile(subDirectoryPath);

    if (packageJSON !== null) {
      const { name = null, version = null, dependencies = {}, devDependencies = {} } = packageJSON,
            dependencyMap = dependencies, ///
            devDependencyMap = devDependencies, ///
            propagated = false;

      release = new Release(name, version, dependencyMap, devDependencyMap, subDirectoryPath, propagated);
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

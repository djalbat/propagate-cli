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
  constructor(name, version, dependencyMap, devDependencyMap, subDirectoryPath, built, published, propagated) {
    this.name = name;
    this.version = version;
    this.dependencyMap = dependencyMap;
    this.devDependencyMap = devDependencyMap;
    this.subDirectoryPath = subDirectoryPath;

    this.built = built;
    this.published = published;
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

  isBuilt() {
    return this.built;
  }

  isPublished() {
    return this.published;
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
    debugger
  }

  build(quietly) {
    let shellCommands = retrieveShellCommands();

    const { build } = shellCommands,
          buildShellCommands = build;

    shellCommands = buildShellCommands; ///

    this.execute(shellCommands, quietly);

    this.built = true;
  }

  publish(quietly) {
    let shellCommands = retrieveShellCommands();

    const { publish } = shellCommands,
          publishShellCommands = publish;

    shellCommands = publishShellCommands; ///

    this.execute(shellCommands, quietly);

    this.published = true;
  }

  execute(shellCommands, quietly) {
    const currentWorkingDirectoryPath = cwd();

    chdir(this.subDirectoryPath);

    const output = execute(shellCommands, quietly);

    if (!quietly) {
      console.log(` './${this.subDirectoryPath}' ("${this.name}"): ${output}`)
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
            built = false,
            published = false,
            propagated = false;

      release = new Release(name, version, dependencyMap, devDependencyMap, subDirectoryPath, built, published, propagated);
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

"use strict";

import { arrayUtilities, templateUtilities, asynchronousUtilities } from "necessary"

import Version from "./version";

import { readPackageJSONFile } from "./utilities/packageJSON";
import { showCursor, hideCursor } from "./utilities/terminal";
import { executePromptly, executeRepeatedly } from "./utilities/shell";
import { retrieveShellCommands, retrieveIgnoredBuilds, retrieveIgnoredPublishes } from "./configuration";

const { prune } = arrayUtilities,
      { eventually } = asynchronousUtilities,
      { parseContent } = templateUtilities;

export default class Release {
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

  poll(specifiers, quietly, callback) {
    const specifiersLength = specifiers.length;

    if (specifiersLength === 0) {
      const success = true;

      callback(success);

      return;
    }

    (specifiersLength === 1) ?
      console.log(`Polling for the dependency:`) :
        console.log(`Polling for the dependenies:`);

    hideCursor();

    specifiers.forEach((specifier) => {
      console.log(` - ${specifier}`);
    });

    const length = specifiersLength,  ///
          operations = specifiers.map((specifier, index) => {
            return (next, done, context) => {
              const shellCommands = shellCommandsFromSpecifier(specifier);

              executeRepeatedly(shellCommands, specifier, index, length, quietly, (success) => {
                if (success) {
                  const polledSpecifier = specifier; ///

                  prune(specifiers, (specifier) => {
                    if (specifier !== polledSpecifier) {
                      return true;
                    }
                  });
                }

                next();
              });
            };
          });

    eventually(operations, () => {
      const specifiersLength = specifiers.length,
            success = (specifiersLength === 0);

      showCursor();

      callback(success);
    });
  }

  install(quietly, callback) {
    let shellCommands = retrieveShellCommands();

    const { install } = shellCommands,
          installShellCommands = install;

    shellCommands = installShellCommands; ///

    this.executeShellCommands(shellCommands, quietly, callback);
  }

  build(quietly, callback) {
    const ignoredBuilds = retrieveIgnoredBuilds(),
          subDirectoryPaths = ignoredBuilds,  ///
          subDirectoryPathsIncludesSubDirectoryPath = subDirectoryPaths.includes(this.subDirectoryPath),
          buildIgnored = subDirectoryPathsIncludesSubDirectoryPath; ///

    if (buildIgnored) {
      console.log(`Ignoring the '${this.subDirectoryPath}' build.`);

      const success = true;

      callback(success);

      return;
    }

    let shellCommands = retrieveShellCommands();

    const { build } = shellCommands,
          buildShellCommands = build;

    shellCommands = buildShellCommands; ///

    this.executeShellCommands(shellCommands, quietly, callback);
  }

  publish(quietly, callback) {
    const ignoredPublishes = retrieveIgnoredPublishes(),
          names = ignoredPublishes,
          namesIncludesName = names.includes(this.name),
          publishIgnored = namesIncludesName; ///

    if (publishIgnored) {
      console.log(`Ignoring the '${this.name}' publish.`);

      const success = true;

      callback(success);

      return;
    }

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

    executePromptly(shellCommands, quietly, (success) => {
      process.chdir(currentWorkingDirectoryPath);

      callback(success);
    });
  }

  updateDependencyVersion(name, versionString) {
    const success = updateSemver(name, versionString, this.dependencyMap);

    if (!success) {
      console.log(`Either the version of the '${this.subDirectoryPath}' release's '${name}' dependency is greater than or equal to the propagated '${versionString}' version or it cannot be parsed.`);
    }

    return success;
  }

  updateDevDependencyVersion(name, versionString) {
    const success = updateSemver(name, versionString, this.devDependencyMap);

    if (!success) {
      console.log(`Either the version of the '${this.subDirectoryPath}' release's '${name}' developer dependency is greater than or equal to the propagated '${versionString}' version or it cannot be parsed.`);
    }

    return success;
  }

  static fromSubDirectoryPath(subDirectoryPath) {
    let release = null;

    const packageJSON = readPackageJSONFile(subDirectoryPath);

    if (packageJSON !== null) {
      let { version = null } = packageJSON;

      const { name = null, dependencies = {}, devDependencies = {} } = packageJSON,
            versionString = version;  ///

      version = Version.fromVersionString(versionString);

      const dependencyMap = dependencies, ///
            devDependencyMap = devDependencies; ///

      release = new Release(name, version, dependencyMap, devDependencyMap, subDirectoryPath);
    }

    return release;
  }
}

function updateSemver(name, versionString, map) {
  let success = false;

  let semver = map[name] || null;

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

function shellCommandsFromSpecifier(specifier) {
  let shellCommands = retrieveShellCommands();

  const { poll } = shellCommands,
        pollShellCommands = poll, ///
        args = {
          specifier
        };

  shellCommands = parseContent(pollShellCommands, args);

  return shellCommands;
}

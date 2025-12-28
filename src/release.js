"use strict";

import { arrayUtilities, templateUtilities, asynchronousUtilities } from "necessary"

import Version from "./version";

import { EMPTY_STRING } from "./constants";
import { readPackageJSONFile } from "./utilities/packageJSON";
import { executePromptly, executeRepeatedly } from "./utilities/shell";
import { retrieveShellCommands, retrieveIgnoredBuilds, retrieveIgnoredPublishes } from "./configuration";

const { eventually } = asynchronousUtilities,
      { parseContent } = templateUtilities,
      { prune, filter } = arrayUtilities;

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

  getDependencies(names) {
    const dependencyNames = this.getDependencyNames(),
          devDependencyNames = this.getDevDependencyNames();

    filter(dependencyNames, (dependencyName) => {
      const namesIncludeDependencyName = names.includes(dependencyName);

      if (namesIncludeDependencyName) {
        return true;
      }
    });

    filter(devDependencyNames, (devDependencyName) => {
      const namesIncludeDevDependencyName = names.includes(devDependencyName);

      if (namesIncludeDevDependencyName) {
        return true;
      }
    });

    names = [
      ...dependencyNames,
      ...devDependencyNames
    ];

    const dependencies = names.map((name) => {
      let version = this.dependencyMap[name] || this.devDependencyMap[name];

      version = version.replace(/[\^~]/g, EMPTY_STRING);

      const propagatedDependency = `${name}@${version}`;

      return propagatedDependency;
    });

    return dependencies;
  }

  git(quietly, callback) {
    let shellCommands = retrieveShellCommands();

    const { git } = shellCommands,
      gitShellCommands = git;

    shellCommands = gitShellCommands; ///

    this.executeShellCommands(shellCommands, quietly, callback);
  }

  poll(names, quietly, callback) {
    const dependencies = this.getDependencies(names),
          dependenciesLength = dependencies.length;

    if (dependenciesLength === 0) {
      const success = true;

      callback(success);

      return;
    }

    (dependenciesLength === 1) ?
      console.log(`Polling for the dependency:`) :
        console.log(`Polling for the dependenies:`);

    const operations = dependencies.map((dependency) => {
      return (next, done, context, index) => {
        const shellCommands = shellCommandsFromDependency(dependency);

        console.log(` - ${dependency} `);

        executeRepeatedly(shellCommands, quietly, (success) => {
          if (success) {
            const polledDependency = dependency; ///

            prune(dependencies, (dependency) => {
              if (dependency !== polledDependency) {
                return true;
              }
            });
          }

          next();
        });
      };
    });

    eventually(operations, () => {
      const dependenciesLength = dependencies.length,
            success = (dependenciesLength === 0);

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
            versionString = version,  ///
            dependencyMap = dependencies, ///
            devDependencyMap = devDependencies; ///

      version = Version.fromVersionString(versionString);

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

function shellCommandsFromDependency(dependency) {
  let shellCommands = retrieveShellCommands();

  const { poll } = shellCommands,
        pollShellCommands = poll, ///
        args = {
          dependency
        };

  shellCommands = parseContent(pollShellCommands, args);

  return shellCommands;
}

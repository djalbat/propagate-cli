"use strict";

const { fileSystemUtilities } = require("necessary");

const Release = require("./release");

const { absolutePathFromName } = require("./utilities/path"),
      { DEFAULT_DIRECTORY_NAME } = require("./constants");

const { readDirectory, isEntryDirectory } = fileSystemUtilities;

class ReleaseMap {
  constructor(map) {
    this.map = map;
  }

  getNames() {
    const names = [],
          releases = this.getReleases();

    releases.forEach((release) => {
      const name = release.getName();

      if (name !== null) {
        names.push(name);
      }
    });

    return names;
  }

  getReleases() {
    const releases = Object.values(this.map);

    return releases;
  }

  getSubDirectoryPaths() {
    const subDirectoryPaths = Object.keys(this.map);

    return subDirectoryPaths;
  }

  getNameToSubDirectoryPathMap() {
    const nameToSubDirectoryPathMap = {},
          subDirectoryPaths = this.getSubDirectoryPaths();

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = this.retrieveRelease(subDirectoryPath),
            name = release.getName();

      if (name !== null) {
        nameToSubDirectoryPathMap[name] = subDirectoryPath;
      }
    });

    return nameToSubDirectoryPathMap;
  }

  retrieveRelease(subDirectoryPath) {
    const release = this.map[subDirectoryPath] || null;  ///

    return release;
  }

  static fromDirectoriesAndIgnoredDependencies(directories, ignoredDependencies) {
    const map = {},
          subDirectoryPaths = subDirectoryPathsFromDirectoriesAndIgnoredDependencies(directories, ignoredDependencies);

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = Release.fromSubDirectoryPath(subDirectoryPath);

      if (release !== null) {
        map[subDirectoryPath] = release;
      }
    });

    const releaseMap = new ReleaseMap(map);

    return releaseMap;
  }
}

module.exports = ReleaseMap;

function subDirectoryPathsFromDirectoriesAndIgnoredDependencies(directories, ignoredDependencies) {
  const subDirectoryPaths = [],
        directoryNames = [
          DEFAULT_DIRECTORY_NAME,
          ...directories
        ];

  directoryNames.forEach((directoryName) => {
    const absoluteDirectoryPath = absolutePathFromName(directoryName),
          entryNames = readDirectory(absoluteDirectoryPath);

    entryNames.forEach((entryName) => {
      const entryPath = `${directoryName}/${entryName}`,
            entryDirectory = isEntryDirectory(entryPath);

      if (entryDirectory) {
        const subDirectoryName = entryName, ///
              ignoredDependenciesIncludesSubDirectoryName = ignoredDependencies.includes(subDirectoryName);

        if (!ignoredDependenciesIncludesSubDirectoryName) {
          const subDirectoryPath = entryPath; ///

          subDirectoryPaths.push(subDirectoryPath);
        }
      }
    });
  });

  return subDirectoryPaths;
}

'use strict';

const necessary = require('necessary');

const Release = require('./release'),
      constants = require('./constants'),
      pathUtilities = require('./utilities/path');

const { fileSystemUtilities } = necessary,
      { absolutePathFromName } = pathUtilities,
      { DEFAULT_DIRECTORY_NAME } = constants,
      { readDirectory, isEntryDirectory } = fileSystemUtilities;

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
          ignoredSubDirectoryNames = ignoredDependencies, ///
          subDirectoryPaths = subDirectoryPathsFromDirectoriesAndIgnoredSubDirectoryNames(directories, ignoredSubDirectoryNames);

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

function subDirectoryPathsFromDirectoriesAndIgnoredSubDirectoryNames(directories, ignoredSubDirectoryNames) {
  const subDirectoryPaths = [],
        directoryNames = [
          DEFAULT_DIRECTORY_NAME,
          ...directories
        ];

  directoryNames.forEach((directoryName) => {
    const absoluteDirectoryPath = absolutePathFromName(directoryName),
          entryNames = readDirectory(absoluteDirectoryPath);

    entryNames.forEach((entryName) => {
      const entryRPath = `${directoryName}/${entryName}`,
            entryDirectory = isEntryDirectory(entryRPath);

      if (entryDirectory) {
        const subDirectoryName = entryName, ///
              ignoredSubDirectoryNamesIncludesSubDirectoryName = ignoredSubDirectoryNames.includes(subDirectoryName);

        if (!ignoredSubDirectoryNamesIncludesSubDirectoryName) {
          const subDirectoryPath = entryRPath; ///

          subDirectoryPaths.push(subDirectoryPath);
        }
      }
    });
  });

  return subDirectoryPaths;
}

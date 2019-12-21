'use strict';

const necessary = require('necessary');

const Release = require('./release'),
      pathUtilities = require('./utilities/path');

const { absolutePathFromName } = pathUtilities;

const { fileSystemUtilities } = necessary,
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

      nameToSubDirectoryPathMap[name] = subDirectoryPath;
    });

    return nameToSubDirectoryPathMap;
  }

  retrieveRelease(subDirectoryRPath) {
    const release = this.map[subDirectoryRPath] || null;  ///

    return release;
  }

  static fromDirectories(directories) {
    const map = {},
          subDirectoryRPaths = subDirectoryRPathsFromDirectories(directories);

    subDirectoryRPaths.forEach((subDirectoryRPath) => {
      const release = Release.fromSubDirectoryRPath(subDirectoryRPath);

      if (release !== null) {
        map[subDirectoryRPath] = release;
      }
    });

    const releaseMap = new ReleaseMap(map);

    return releaseMap;
  }
}

module.exports = ReleaseMap;

function subDirectoryRPathsFromDirectories(directories) {
  const subDirectoryRPaths = [],
        directoryNames = [
          '.',
          ...directories
        ];

  directoryNames.forEach((directoryName) => {
    const absoluteDirectoryPath = absolutePathFromName(directoryName),
          entryNames = readDirectory(absoluteDirectoryPath);

    entryNames.forEach((entryName) => {
      const entryRPath = `${directoryName}/${entryName}`,
            entryDirectory = isEntryDirectory(entryRPath);

      if (entryDirectory) {
        const subDirectoryRPath = entryRPath; ///

        subDirectoryRPaths.push(subDirectoryRPath);
      }
    });
  });

  return subDirectoryRPaths;
}

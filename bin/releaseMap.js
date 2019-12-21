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

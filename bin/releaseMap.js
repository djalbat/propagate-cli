'use strict';

const necessary = require('necessary');

const pathUtilities = require('./utilities/path');

const { absolutePathFromName } = pathUtilities;

const { fileSystemUtilities } = necessary,
      { readDirectory, isEntryDirectory } = fileSystemUtilities;

class PackageMap {
  constructor(subDirectoryRelativePaths) {
    this.subDirectoryRelativePaths = subDirectoryRelativePaths;
  }

  getSubDirectoryRelativePaths() {
    return this.subDirectoryRelativePaths;
  }

  isSubDirectoryRelativePathPresent() {

  }

  static fromDirectories(directories) {
    const subDirectoryRelativePaths = subDirectoryRelativePathsFromDirectories(directories),
          packageMap = new PackageMap(subDirectoryRelativePaths);

    return packageMap;
  }
}

module.exports = PackageMap;

function subDirectoryRelativePathsFromDirectories(directories) {
  const subDirectoryRelativePaths = [],
        directoryNames = [
          '.',
          ...directories
        ];

  directoryNames.forEach((directoryName) => {
    const absoluteDirectoryPath = absolutePathFromName(directoryName),
        entryNames = readDirectory(absoluteDirectoryPath);

    entryNames.forEach((entryName) => {
      const entryRelativePath = `${directoryName}/${entryName}`,
            entryDirectory = isEntryDirectory(entryRelativePath);

      if (entryDirectory) {
        const subDirectoryRelativePath = entryRelativePath; ///

        subDirectoryRelativePaths.push(subDirectoryRelativePath);
      }
    });
  });

  return subDirectoryRelativePaths;
}

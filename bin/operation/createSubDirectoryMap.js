"use strict";

const { fileSystemUtilities } = require("necessary");

const { retrieveDirectories } = require("../configuration"),
      { absolutePathFromName } = require("../utilities/path"),
      { DEFAULT_DIRECTORY_NAME } = require("../defaults");

const { readDirectory, isEntryDirectory } = fileSystemUtilities;

function createSubDirectoryMapOperation(proceed, abort, context) {
  const subDirectoryMap = {},
        directories = retrieveDirectories(),
        directoryNames = [
          DEFAULT_DIRECTORY_NAME,
          ...directories
        ];

  directoryNames.forEach((directoryName) => {
    try {
      const absoluteDirectoryPath = absolutePathFromName(directoryName),
            entryNames = readDirectory(absoluteDirectoryPath);

      entryNames.forEach((entryName) => {
        const entryPath = `${directoryName}/${entryName}`,
              entryDirectory = isEntryDirectory(entryPath);

        if (entryDirectory) {
          const subDirectoryName = entryName, ///
                subDirectoryPath = entryPath; ///

          subDirectoryMap[subDirectoryName] = subDirectoryPath;
        }
      });
    } catch (error) {
      console.log(`The '${directoryName}' directory cannot be read.`);

      process.exit(1);
    }
  });

  Object.assign(context, {
    subDirectoryMap
  });

  proceed();
}

module.exports = createSubDirectoryMapOperation;

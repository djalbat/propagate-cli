'use strict';

const necessary = require('necessary');

const messages = require('../messages'),
      configuration = require('../configuration'),
      pathUtilities = require('../utilities/path');

const { exit } = process,
      { retrieveDirectories } = configuration,
      { absolutePathFromName } = pathUtilities,
      { NO_SUB_DIRECTORY_SPECIFIED_MESSAGE } = messages;

const { fileSystemUtilities } = necessary,
      { readDirectory, isEntryDirectory } = fileSystemUtilities;

function propagate(argument, quietly) {
  if (argument === null) {
    console.log(NO_SUB_DIRECTORY_SPECIFIED_MESSAGE);

    exit();
  }

  const subDirectoryName = argument, ///
        directories = retrieveDirectories(),
        directoryNames = [
          '.',
          ...directories
        ],
        subDirectoryNames = [];

  directoryNames.forEach((directoryName) => retrieveSubDirectoryNames(directoryName, subDirectoryNames));

  console.log(subDirectoryNames)
}

module.exports = propagate;

function retrieveSubDirectoryNames(directoryName, subDirectoryNames) {
  const absoluteDirectoryPath = absolutePathFromName(directoryName),
        entryNames = readDirectory(absoluteDirectoryPath);

  entryNames.forEach((entryName) => {
    const entryDirectory = isEntryDirectory(entryName);

    if (entryDirectory) {
      const subDirectoryName = entryName;  ///

      subDirectoryNames.push(subDirectoryName);
    }
  });

  return subDirectoryNames;
}

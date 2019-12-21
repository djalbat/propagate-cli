'use strict';

const messages = require('../messages'),
      PackageMap = require('../packageMap'),
      configuration = require('../configuration');

const { exit } = process,
      { retrieveDirectories } = configuration,
      { NO_SUB_DIRECTORY_MESSAGE, NO_SUB_DIRECTORY_SPECIFIED_MESSAGE } = messages;

function propagate(argument, quietly) {
  if (argument === null) {
    console.log(NO_SUB_DIRECTORY_SPECIFIED_MESSAGE);

    exit();
  }

  const directories = retrieveDirectories(),
        packageMap = PackageMap.fromDirectories(directories),
        subDirectoryRelativePath = `./${argument}`,
        subDirectoryRelativePaths = subDirectoryRelativePathsFromDirectories(directories),
        subDirectoryRelativePathsIncludesSubDirectoryRelativePath = subDirectoryRelativePaths.includes(subDirectoryRelativePath);

  if (!subDirectoryRelativePathsIncludesSubDirectoryRelativePath) {
    console.log(NO_SUB_DIRECTORY_MESSAGE);

    exit();
  }

  if (!quietly) {
    console.log('The sub-directories are:');

    console.log('');

    subDirectoryRelativePaths.forEach((subDirectoryRelativePath) => {
      console.log(` '${subDirectoryRelativePath}'`);
    });

    console.log('');
  }
}

module.exports = propagate;

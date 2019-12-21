'use strict';

const messages = require('../messages'),
      ReleaseMap = require('../releaseMap'),
      configuration = require('../configuration');

const { exit } = process,
      { retrieveDirectories } = configuration,
      { NO_RELEASE_MESSAGE, NO_SUB_DIRECTORY_SPECIFIED_MESSAGE } = messages;

function propagate(argument, quietly) {
  if (argument === null) {
    console.log(NO_SUB_DIRECTORY_SPECIFIED_MESSAGE);

    exit();
  }

  const subDirectoryNames = argument.split(','),
        subDirectoryRPaths = subDirectoryNames.map((subDirectoryName) => `./${subDirectoryName}`),
        directories = retrieveDirectories(),
        releaseMap = ReleaseMap.fromDirectories(directories);

  checkReleases(subDirectoryRPaths, releaseMap);
}

module.exports = propagate;

function checkReleases(subDirectoryRPaths, releaseMap) {
  console.log('Checking packages...');

  console.log('');

  subDirectoryRPaths.forEach((subDirectoryRPath) => {
    console.log(` '${subDirectoryRPath}'`);

    const subDirectoryRPathPresent = releaseMap.isSubDirectoryRPathPresent(subDirectoryRPath);

    if (!subDirectoryRPathPresent) {
      console.log(NO_RELEASE_MESSAGE);

      exit();
    }
  });

  console.log('');
}

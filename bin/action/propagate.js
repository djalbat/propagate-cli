'use strict';

const messages = require('../messages'),
      ReleaseMap = require('../releaseMap'),
      configuration = require('../configuration');

const { exit } = process,
      { retrieveDirectories } = configuration,
      { NO_RELEASE_PRESENT_MESSAGE, RELEASE_NOT_PUBLISHABLE_MESSAGE, NO_SUB_DIRECTORY_SPECIFIED_MESSAGE } = messages;

function propagate(argument, quietly) {
  if (argument === null) {
    console.log(NO_SUB_DIRECTORY_SPECIFIED_MESSAGE);

    exit();
  }

  const subDirectoryNames = argument.split(','),
        subDirectoryRPaths = subDirectoryNames.map((subDirectoryName) => `./${subDirectoryName}`),
        directories = retrieveDirectories(),
        releaseMap = ReleaseMap.fromDirectories(directories);

  checkSubDirectories(subDirectoryRPaths, releaseMap);
}

module.exports = propagate;

function checkSubDirectories(subDirectoryRPaths, releaseMap) {
  console.log('Checking sub-directories...');

  console.log('');

  subDirectoryRPaths.forEach((subDirectoryRPath) => {
    console.log(` '${subDirectoryRPath}'`);

    const release = releaseMap.retrieveRelease(subDirectoryRPath),
          releasePresent = (release !== null);

    if (!releasePresent) {
      console.log(NO_RELEASE_PRESENT_MESSAGE);

      exit();
    }

    const releasePublishable = release.isPublishable();

    if (!releasePublishable) {
      console.log(RELEASE_NOT_PUBLISHABLE_MESSAGE);

      exit();
    }
  });

  console.log('');
}

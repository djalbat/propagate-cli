'use strict';

const messages = require('../messages');

const { NO_RELEASE_PRESENT_MESSAGE, RELEASE_NOT_PUBLISHABLE_MESSAGE } = messages;

function createReleaseCallback(proceed, abort, context) {
  const { argument, releaseMap } = context,
        subDirectoryName = argument,  ////
        subDirectoryRPath = `./${subDirectoryName}`,
        release = releaseMap.retrieveRelease(subDirectoryRPath);

  if (release === null) {
    console.log(NO_RELEASE_PRESENT_MESSAGE);

    abort();
  }

  const releasePublishable = release.isPublishable();

  if (!releasePublishable) {
    console.log(RELEASE_NOT_PUBLISHABLE_MESSAGE);

    abort();
  }

  Object.assign(context, {
    release
  });

  proceed();
}

module.exports = createReleaseCallback;

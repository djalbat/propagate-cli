"use strict";

const { NO_RELEASE_MESSAGE, RELEASE_NOT_PUBLISHABLE_MESSAGE } = require("../messages");

function retrieveReleaseOperation(proceed, abort, context) {
  const { subDirectoryPath, releaseMap } = context,
        release = releaseMap.retrieveRelease(subDirectoryPath);

  if (release === null) {
    console.log(NO_RELEASE_MESSAGE);

    abort();

    return;
  }

  const releasePublishable = release.isPublishable();

  if (!releasePublishable) {
    console.log(RELEASE_NOT_PUBLISHABLE_MESSAGE);

    abort();

    return;
  }

  Object.assign(context, {
    release
  });

  proceed();
}

module.exports = retrieveReleaseOperation;

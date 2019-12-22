'use strict';

const ReleaseMap = require('../releaseMap'),
      configuration = require('../configuration');

const { retrieveDirectories } = configuration;

function createReleaseMapCallback(proceed, abort, context) {
  const directories = retrieveDirectories(),
        releaseMap = ReleaseMap.fromDirectories(directories);

  Object.assign(context, {
    releaseMap
  });

  proceed();
}

module.exports = createReleaseMapCallback;

"use strict";

const ReleaseMap = require("../releaseMap");

const { retrieveDirectories, retrieveIgnoredDependencies } = require("../configuration");

function createReleaseMapCallback(proceed, abort, context) {
  const directories = retrieveDirectories(),
        ignoredDependencies = retrieveIgnoredDependencies(),
        releaseMap = ReleaseMap.fromDirectoriesAndIgnoredDependencies(directories, ignoredDependencies);

  Object.assign(context, {
    releaseMap
  });

  proceed();
}

module.exports = createReleaseMapCallback;

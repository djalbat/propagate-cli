"use strict";

const ReleaseMap = require("../releaseMap"),
      configuration = require("../configuration");

const { retrieveDirectories, retrieveIgnoredDependencies } = configuration;

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

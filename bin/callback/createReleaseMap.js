"use strict";

const ReleaseMap = require("../releaseMap");

const { retrieveIgnoredDependencies } = require("../configuration");

function createReleaseMapCallback(proceed, abort, context) {
  const { subDirectoryMap } = context,
        ignoredDependencies = retrieveIgnoredDependencies(),
        releaseMap = ReleaseMap.fromSubDirectoryMapAndIgnoredDependencies(subDirectoryMap, ignoredDependencies);

  Object.assign(context, {
    releaseMap
  });

  proceed();
}

module.exports = createReleaseMapCallback;

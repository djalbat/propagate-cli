"use strict";

const { pathUtilities } = require("necessary");

const { DEFAULT_DIRECTORY_NAME } = require("../defaults"),
      { retrieveIgnoredDependencies } = require("../configuration"),
      { IGNORED_DEPENDENCIES_INCLUDE_SUB_DIRECTORY_MESSAGE } = require("../messages");

const { concatenatePaths } = pathUtilities;

function createSubDirectoryPathOperation(proceed, abort, context) {
  const { subDirectoryName } = context,
        ignoredDependencies = retrieveIgnoredDependencies(),
        ignoredDependenciesIncludesSubDirectoryName = ignoredDependencies.includes(subDirectoryName);

  if (ignoredDependenciesIncludesSubDirectoryName) {
    console.log(IGNORED_DEPENDENCIES_INCLUDE_SUB_DIRECTORY_MESSAGE);

    abort();

    return;
  }

  const directoryName = DEFAULT_DIRECTORY_NAME, ///
        subDirectoryPath = concatenatePaths(directoryName, subDirectoryName);

  Object.assign(context, {
    subDirectoryPath
  });

  proceed();
}

module.exports = createSubDirectoryPathOperation;

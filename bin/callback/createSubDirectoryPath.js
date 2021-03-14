"use strict";

const { DEFAULT_DIRECTORY_NAME } = require("../constants"),
      { retrieveIgnoredDependencies } = require("../configuration"),
      { NO_SUB_DIRECTORY_SPECIFIED_MESSAGE, IGNORED_DEPENDENCIES_INCLUDES_SUB_DIRECTORY_MESSAGE } = require("../messages");

function createSubDirectoryPathCallback(proceed, abort, context) {
  const { argument } = context;

  if (argument === null) {
    console.log(NO_SUB_DIRECTORY_SPECIFIED_MESSAGE);

    abort();

    return;
  }

  const subDirectoryName = argument,  ////
        ignoredDependencies = retrieveIgnoredDependencies(),
        ignoredDependenciesIncludesSubDirectoryName = ignoredDependencies.includes(subDirectoryName);

  if (ignoredDependenciesIncludesSubDirectoryName) {
    console.log(IGNORED_DEPENDENCIES_INCLUDES_SUB_DIRECTORY_MESSAGE);

    abort();

    return;
  }

  const directoryName = DEFAULT_DIRECTORY_NAME, ///
        subDirectoryPath = `${directoryName}/${subDirectoryName}`;

  Object.assign(context, {
    subDirectoryPath
  });

  proceed();
}

module.exports = createSubDirectoryPathCallback;

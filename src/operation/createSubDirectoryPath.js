"use strict";

import { pathUtilities } from "necessary";

import { DEFAULT_DIRECTORY_NAME } from "../defaults";
import { retrieveIgnoredDependencies } from "../configuration";
import { IGNORED_DEPENDENCIES_INCLUDE_SUB_DIRECTORY_MESSAGE } from "../messages";

const { concatenatePaths } = pathUtilities;

export default function createSubDirectoryPathOperation(proceed, abort, context) {
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

"use strict";

import { pathUtilities } from "necessary";

import { DEFAULT_DIRECTORY_NAME } from "../defaults";

const { concatenatePaths } = pathUtilities;

export default function createSubDirectoryPathOperation(proceed, abort, context) {
  const { subDirectoryName } = context,
        directoryName = DEFAULT_DIRECTORY_NAME, ///
        subDirectoryPath = concatenatePaths(directoryName, subDirectoryName);

  Object.assign(context, {
    subDirectoryPath
  });

  proceed();
}

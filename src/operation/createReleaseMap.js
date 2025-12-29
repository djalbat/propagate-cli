"use strict";

import ReleaseMap from "../releaseMap"

import { retrieveIgnoredDependencies } from "../configuration"

export default function createReleaseMapOperation(proceed, abort, context) {
  const { subDirectoryMap, subDirectoryName } = context,
        ignoredDependencies = retrieveIgnoredDependencies(),
        releaseMap = ReleaseMap.fromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies);

  Object.assign(context, {
    releaseMap
  });

  proceed();
}

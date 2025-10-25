"use strict";

import ReleaseMap from "../releaseMap"

import { retrieveIgnoredDependencies } from "../configuration"

export default function createReleaseMapOperation(proceed, abort, context) {
  const { subDirectoryMap } = context,
        ignoredDependencies = retrieveIgnoredDependencies(),
        releaseMap = ReleaseMap.fromSubDirectoryMapAndIgnoredDependencies(subDirectoryMap, ignoredDependencies);

  Object.assign(context, {
    releaseMap
  });

  proceed();
}

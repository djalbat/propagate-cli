"use strict";

import ReleaseGraph from "../releaseGraph";

import { consoleLogSubDirectoryPathsCycle } from '../utilities/console';
import { retrieveForcedDependencyRelations } from "../configuration";
import { AT_LEAST_ONE_CYCLIC_DEPENDENCY_MESSAGE, AT_LEAST_ONE_CYCLIC_DEV_DEPENDENCY_MESSAGE } from "../messages";

export default function createReleaseGraphOperation(proceed, abort, context) {
  const { releaseMap, subDirectoryMap } = context,
        forcedDependencyRelations = retrieveForcedDependencyRelations(),
        releaseGraph = ReleaseGraph.fromReleaseMapSubDirectoryMapAndForcedDependencyRelations(releaseMap, subDirectoryMap, forcedDependencyRelations),
        cyclicDependencyPresent = releaseGraph.isCyclicDependencyPresent(),
        cyclicDevDependencyPresent = releaseGraph.isCyclicDevDependencyPresent();

  if (cyclicDependencyPresent) {
    const cyclicDependencySubDirectoryPaths = releaseGraph.getCyclicDependencySubDirectoryPaths();

    console.log(AT_LEAST_ONE_CYCLIC_DEPENDENCY_MESSAGE);

    consoleLogSubDirectoryPathsCycle(cyclicDependencySubDirectoryPaths);

    abort();

    return;
  }

  if (cyclicDevDependencyPresent) {
    const cyclicDevDependencySubDirectoryPaths = releaseGraph.getCyclicDevDependencySubDirectoryPaths();

    console.log(AT_LEAST_ONE_CYCLIC_DEV_DEPENDENCY_MESSAGE);

    consoleLogSubDirectoryPathsCycle(cyclicDevDependencySubDirectoryPaths);

    abort();

    return;
  }

  Object.assign(context, {
    releaseGraph
  });

  proceed();
}

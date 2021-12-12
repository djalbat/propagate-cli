"use strict";

const messages = require("../messages"),
      ReleaseGraph = require("../releaseGraph");

const { consoleLogSubDirectoryPathsCycle } = require('../utilities/console'),
      { retrieveForcedDependencyRelations } = require("../configuration");

const { AT_LEAST_ONE_CYCLIC_DEPENDENCY_MESSAGE, AT_LEAST_ONE_CYCLIC_DEV_DEPENDENCY_MESSAGE } = messages;

function createReleaseGraphOperation(proceed, abort, context) {
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

module.exports = createReleaseGraphOperation;

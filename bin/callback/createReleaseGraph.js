"use strict";

const messages = require("../messages"),
      ReleaseGraph = require("../releaseGraph");

const consoleUtilities = require('../utilities/console');

const { consoleLogSubDirectoryPathsCycle } = consoleUtilities,
      { AT_LEAST_ONE_CYCLIC_DEPENDENCY_MESSAGE, AT_LEAST_ONE_CYCLIC_DEV_DEPENDENCY_MESSAGE } = messages;

function createReleaseGraphCallback(proceed, abort, context) {
  const { releaseMap } = context,
        releaseGraph = ReleaseGraph.fromReleaseMap(releaseMap),
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

module.exports = createReleaseGraphCallback;

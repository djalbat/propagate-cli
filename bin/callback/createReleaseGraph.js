"use strict";

const necessary = require("necessary");

const messages = require("../messages"),
      ReleaseGraph = require("../releaseGraph");

const { arrayUtilities } = necessary,
      { first } = arrayUtilities,
      { AT_LEAST_ONE_CYCLIC_DEPENDENCY_MESSAGE, AT_LEAST_ONE_CYCLIC_DEV_DEPENDENCY_MESSAGE } = messages;

function createReleaseGraphCallback(proceed, abort, context) {
  const { releaseMap } = context,
        releaseGraph = ReleaseGraph.fromReleaseMap(releaseMap),
        cyclicDependencyPresent = releaseGraph.isCyclicDependencyPresent(),
        cyclicDevDependencyPresent = releaseGraph.isCyclicDevDependencyPresent();

  if (cyclicDependencyPresent) {
    const cyclicDependencySubDirectoryNames = releaseGraph.getCyclicDependencySubDirectoryNames();

    console.log(AT_LEAST_ONE_CYCLIC_DEPENDENCY_MESSAGE);

    consoleLogSubDirectoryNamesCycle(cyclicDependencySubDirectoryNames);

    abort();

    return;
  }

  if (cyclicDevDependencyPresent) {
    const cyclicDevDependencySubDirectoryNames = releaseGraph.getCyclicDevDependencySubDirectoryNames();

    console.log(AT_LEAST_ONE_CYCLIC_DEV_DEPENDENCY_MESSAGE);

    consoleLogSubDirectoryNamesCycle(cyclicDevDependencySubDirectoryNames);

    abort();

    return;
  }

  Object.assign(context, {
    releaseGraph
  });

  proceed();
}

module.exports = createReleaseGraphCallback;

function consoleLogSubDirectoryNamesCycle(subDirectoryNames) {
  const firstSubDirectoryName = first(subDirectoryNames);

  subDirectoryNames = [
    ...subDirectoryNames,
    firstSubDirectoryName
  ];

  subDirectoryNames.forEach((subDirectoryName) => {
    console.log(` "${subDirectoryName}"`);
  });
}

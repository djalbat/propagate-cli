'use strict';

const DependencyGraph = require('../dependencyGraph');

function createDependencyGraphCallback(proceed, abort, context) {
  const { releaseMap } = context,
        dependencyGraph = DependencyGraph.fromReleaseMap(releaseMap);

  Object.assign(context, {
    dependencyGraph
  });

  proceed();
}

module.exports = createDependencyGraphCallback;

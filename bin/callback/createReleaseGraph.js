'use strict';

const ReleaseGraph = require('../releaseGraph');

function createReleaseGraphCallback(proceed, abort, context) {
  const { releaseMap } = context,
        releaseGraph = ReleaseGraph.fromReleaseMap(releaseMap);

  Object.assign(context, {
    releaseGraph
  });

  proceed();
}

module.exports = createReleaseGraphCallback;

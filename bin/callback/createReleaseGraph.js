'use strict';

const ReleaseGraph = require('../releaseGraph');

function createReleaseGraphCallback(proceed, abort, context) {
  const { releaseMap } = context,
        releaseGraph = ReleaseGraph.fromReleaseMap(releaseMap),
        cyclesPresent = releaseGraph.areCyclesPresent();

  if (cyclesPresent) {
    debugger
  }

  Object.assign(context, {
    releaseGraph
  });

  proceed();
}

module.exports = createReleaseGraphCallback;

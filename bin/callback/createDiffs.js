"use strict";

const Diff = require("../diff");

function createDiffsCallback(proceed, abort, context) {
  const { releaseMap, releaseGraph } = context,
        diffs = createDiffs(releaseMap, releaseGraph);

  Object.assign(context, {
    diffs
  });

  proceed();
}

module.exports = createDiffsCallback;

function createDiffs(releaseMap, releaseGraph) {
  const diffs = [],
        topologicallyOrderedSubDirectoryNames = releaseGraph.getTopologicallyOrderedSubDirectoryNames(),
        subDirectoryNames = topologicallyOrderedSubDirectoryNames;  ///

  subDirectoryNames.forEach((subDirectoryName) => {
    const release = releaseMap.retrieveRelease(subDirectoryName),
          diff = Diff.fromRelease(release);

    if (diff !== null) {
      diffs.push(diff);
    }
  });

  return diffs;
}

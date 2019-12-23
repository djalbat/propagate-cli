'use strict';

const Diff = require('../diff');

function createDiffsCallback(proceed, abort, context) {
  const { quietly, release, releaseMap, dependencyGraph } = context,
        diffs = createDiffs(release, releaseMap, dependencyGraph);

  Object.assign(context, {
    diffs
  });

  if (!quietly) {
    logDiffs(diffs);
  }

  proceed();
}

module.exports = createDiffsCallback;

function logDiffs(diffs) {
  diffs.forEach((diff) => {
    const diffString = diff.asString();

    if (diffString !== null) {
      console.log(diffString);
    }
  });
}

function createDiffs(release, releaseMap, dependencyGraph, diffs = []) {
  const subDirectoryPath = release.getSubDirectoryPath();

  let diff = diffs.find((diff) => {
    const diffSubdirectoryPath = diff.getSubDirectoryPath();

    if (diffSubdirectoryPath === subDirectoryPath) {
      return true;
    }
  }) || null;

  if (diff === null) {
    diff = Diff.fromRelease(release);

    diffs.push(diff);

    const dependentReleases = dependencyGraph.retrieveDependentReleases(release, releaseMap);

    dependentReleases.forEach((dependentRelease) => {
      const release = dependentRelease; ///

      createDiffs(release, releaseMap, dependencyGraph, diffs);
    });
  }

  return diffs;
}

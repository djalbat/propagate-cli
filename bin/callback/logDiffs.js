'use strict';

const Diff = require('../diff');

function logDiffsCallback(proceed, abort, context) {
  const { release, quietly, releaseMap, dependencyGraph } = context;

  if (!quietly) {
    const diffs = retrieveDiffs(release, releaseMap, dependencyGraph);

    diffs.forEach((diff) => {
      const diffString = diff.asString();

      if (diffString !== null) {
        console.log(diffString);
      }
    });
  }

  proceed();
}

module.exports = logDiffsCallback;

function retrieveDiffs(release, releaseMap, dependencyGraph, diffs = []) {
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

      retrieveDiffs(release, releaseMap, dependencyGraph, diffs);
    });
  }

  return diffs;
}

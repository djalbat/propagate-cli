'use strict';

const Diff = require('../diff');

function logDiffsCallback(proceed, abort, context) {
  const { release, quietly, dependencyGraph } = context;

  if (!quietly) {
    const diffs = retrieveDiffs(release, dependencyGraph);

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

function retrieveDiffs(release, dependencyGraph, diffs = []) {
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

    const dependentReleases = dependencyGraph.retrieveDependentReleases(release);

    dependentReleases.forEach((dependentRelease) => {
      const release = dependentRelease; ///

      retrieveDiffs(release, dependencyGraph, diffs);
    });
  }

  return diffs;
}

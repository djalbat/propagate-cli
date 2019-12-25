'use strict';

const Diff = require('../diff');

function createDiffsCallback(proceed, abort, context) {
  const { quietly, release, releaseMap, releaseGraph } = context,
        diffs = createDiffs(release, releaseMap, releaseGraph);

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

function createDiffs(release, releaseMap, releaseGraph, diffs = []) {
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

    const successorReleases = releaseGraph.retrieveSuccessorReleases(release, releaseMap);

    successorReleases.forEach((successorRelease) => {
      const release = successorRelease; ///

      createDiffs(release, releaseMap, releaseGraph, diffs);
    });
  }

  return diffs;
}

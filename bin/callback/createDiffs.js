'use strict';

const Diff = require('../diff');

function createDiffsCallback(proceed, abort, context) {
  const { release, releaseMap, releaseGraph } = context,
        diff = Diff.fromRelease(release),
        diffs = [
          diff
        ];

  createDiffs(diff, releaseMap, releaseGraph, diffs);

  Object.assign(context, {
    diffs
  });

  proceed();
}

module.exports = createDiffsCallback;

function createDiffs(diff, releaseMap, releaseGraph, diffs) {
  const release = diff.getRelease(),
        successorReleases = releaseGraph.retrieveSuccessorReleases(release, releaseMap);

  successorReleases.forEach((successorRelease) => {
    const release = successorRelease, ///
          diffed = release.isDiffed();

    if (!diffed) {
      const diff = Diff.fromRelease(release);

      if (diff !== null) {
        diffs.push(diff);

        createDiffs(diff, releaseMap, releaseGraph, diffs);
      }

      release.diff();
    }
  });
}

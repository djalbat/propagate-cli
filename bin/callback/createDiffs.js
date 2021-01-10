"use strict";

const necessary = require("necessary");

const Diff = require("../diff");

const { arrayUtilities } = necessary,
      { first } = arrayUtilities;

function createDiffs(proceed, abort, context) {
  const { releases, releaseGraph } = context,
        release = releases.shift(),
        diffs = [],
        diff = Diff.fromRelease(release);

  diffs.push(diff);

  const topologicallyOrderedSubDirectoryPaths = releaseGraph.getTopologicallyOrderedSubDirectoryPaths(),
        releaseSubDirectoryPath = release.getSubDirectoryPath(),
        subDirectoryPaths = topologicallyOrderedSubDirectoryPaths;  ///

  prune(subDirectoryPaths, (subDirectoryPath) => {
    if (subDirectoryPath !== releaseSubDirectoryPath) {
      return true;
    }
  });

  subDirectoryPaths.forEach((subDirectoryPath) => {
    prune(releases, (release) => {
      const releaseSubDirectoryPath = release.getSubDirectoryPath();

      if (releaseSubDirectoryPath === subDirectoryPath) {
        const diff = Diff.fromRelease(release);

        diffs.push(diff);

        return;
      }

      return true;
    });
  });

  Object.assign(context, {
    diffs
  });

  proceed();
}

module.exports = createDiffs;

function prune(array, test) {
  let prunedElement = undefined;

  array.some((element, index) => {
    const passed = test(element, index);

    if (!passed) {
      const start = index,  ///
            deleteCount = 1,
            deletedElements = array.splice(start, deleteCount),
            firstDeletedElement = first(deletedElements);

      prunedElement = firstDeletedElement;  ///

      return true;
    }
  });

  return prunedElement;
}

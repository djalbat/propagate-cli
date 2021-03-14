"use strict";

const { arrayUtilities } = require("necessary");

const { nextDiffsFromDiff, previousDiffsFromDiff } = require("../utilities/diffs");

const { first } = arrayUtilities;

function consoleLogUnpublishedDiff(diff, diffs) {
  const previousDiffs = previousDiffsFromDiff(diff, diffs),
        unpublishedDiff = diff; ///

  consoleLogUnpublishedDiffEx(unpublishedDiff, previousDiffs);
}

function consoleLogUnpublishedDiffs(diff, diffs) {
  const nextDiffs = nextDiffsFromDiff(diff, diffs),
        previousDiffs = previousDiffsFromDiff(diff, diffs),
        unpublishedDiffs = [
          diff,
          ...nextDiffs
        ]

  unpublishedDiffs.forEach((unpublishedDiff) => consoleLogUnpublishedDiffEx(unpublishedDiff, previousDiffs));
}

function consoleLogSubDirectoryPathsCycle(subDirectoryPaths) {
  const firstSubDirectoryPath = first(subDirectoryPaths);

  subDirectoryPaths = [
    ...subDirectoryPaths,
    firstSubDirectoryPath
  ];

  subDirectoryPaths.forEach((subDirectoryPath) => {
    console.log(` "${subDirectoryPath}"`);
  });
}

module.exports = {
  consoleLogUnpublishedDiff,
  consoleLogUnpublishedDiffs,
  consoleLogSubDirectoryPathsCycle
};

function consoleLogUnpublishedDiffEx(unpublishedDiff, previousDiffs) {
  const name = unpublishedDiff.getName();

  previousDiffs.forEach((previousDiff) => {
    const diff = previousDiff,  ///
          subDirectoryPath = diff.getSubDirectoryPath(),
          devDependencyNames = diff.getDevDependencyNames(),
          devDependencyNamesIncludesName = devDependencyNames.includes(name);

    if (devDependencyNamesIncludesName) {
      console.log(`The '${subDirectoryPath}/package.json' file has already been saved but its updated '${name}' developer dependency will now not be published.`);
    }
  });
}

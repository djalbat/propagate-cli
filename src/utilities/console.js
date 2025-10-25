"use strict";

import { arrayUtilities } from "necessary";

import { nextDiffsFromDiff, previousDiffsFromDiff } from "../utilities/diffs";

const { first } = arrayUtilities;

export function consoleLogUnpublishedDiff(diff, diffs) {
  const previousDiffs = previousDiffsFromDiff(diff, diffs),
        unpublishedDiff = diff; ///

  consoleLogUnpublishedDiffEx(unpublishedDiff, previousDiffs);
}

export function consoleLogUnpublishedDiffs(diff, diffs) {
  const nextDiffs = nextDiffsFromDiff(diff, diffs),
        previousDiffs = previousDiffsFromDiff(diff, diffs),
        unpublishedDiffs = [
          diff,
          ...nextDiffs
        ]

  unpublishedDiffs.forEach((unpublishedDiff) => consoleLogUnpublishedDiffEx(unpublishedDiff, previousDiffs));
}

export function consoleLogSubDirectoryPathsCycle(subDirectoryPaths) {
  const firstSubDirectoryPath = first(subDirectoryPaths);

  subDirectoryPaths = [
    ...subDirectoryPaths,
    firstSubDirectoryPath
  ];

  subDirectoryPaths.forEach((subDirectoryPath) => {
    console.log(` "${subDirectoryPath}"`);
  });
}

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

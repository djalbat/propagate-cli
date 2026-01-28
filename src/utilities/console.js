"use strict";

import { arrayUtilities } from "necessary";

const { first } = arrayUtilities;

export function consoleLogUnpublishedDiff(diff, diffs) {
  const previousDiffs = previousDiffsFromDiff(diff, diffs),
        unpublishedDiff = diff, ///
        name = unpublishedDiff.getName();

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

function previousDiffsFromDiff(diff, diffs) {
  const index = diffs.indexOf(diff),
        endIndex = index, ///
        beginIndex = 0,
        previousDiffs = diffs.slice(beginIndex, endIndex);

  return previousDiffs;
}

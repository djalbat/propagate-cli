"use strict";

const necessary = require("necessary");

const { arrayUtilities } = necessary,
      { first } = arrayUtilities;

function consoleLogUnpublishedDiff(unpublishedDiff, previousDiffs) {
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

function consoleLogUnpublishedDiffs(unpublishedDiffs, previousDiffs) {
  unpublishedDiffs.forEach((unpublishedDiff) => consoleLogUnpublishedDiff(unpublishedDiff, previousDiffs));
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

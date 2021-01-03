"use strict";

const necessary = require("necessary");

const { arrayUtilities } = necessary,
      { first } = arrayUtilities;

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

function consoleLogUnpublishedDiffs(diff, diffs) {
  const names = diffs.map((diff) => diff.getName()),
        currentDiff = diff, ///
        currentIndex = diffs.indexOf(currentDiff),
        previousDiffs = diffs.slice(0, currentIndex);

  previousDiffs.forEach((previousDiff) => {
    const diff = previousDiff,  ///
          name = diff.getName(),
          devDependencyNames = diff.getDevDependencyNames();

    devDependencyNames.forEach((devDependencyName) => {
      const index = names.indexOf(devDependencyName);

      if (index >= currentIndex) {
        console.log(`The '${name}' release has already passed but its '${devDependencyName}' developer dependency has yet to be published.`);
      }
    });
  });
}

module.exports = {
  consoleLogUnpublishedDiffs,
  consoleLogSubDirectoryPathsCycle
};

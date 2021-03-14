"use strict";

const { consoleLogUnpublishedDiff } = require('../utilities/console');

function removeDependencies(diff, diffs, releaseMap, releaseGraph) {
  const release = diff.getRelease(),
        dependentReleases = releaseGraph.retrieveDependentReleases(release, releaseMap),
        dependentReleasesLength = dependentReleases.length;

  consoleLogUnpublishedDiff(diff, diffs);

  if (dependentReleasesLength > 0) {
    const name = release.getName();

    dependentReleases.forEach((dependentRelease) => {
      const release = dependentRelease, ///
            diff = findDiff(release, diffs);

      if (diff !== null) {
        const dependencyMapEmpty = diff.isDependencyMapDiffEmpty();

        diff.removeDependency(name);

        if (dependencyMapEmpty) {
          removeDevDependencies(diff, diffs, releaseMap, releaseGraph);

          removeDependencies(diff, diffs, releaseMap, releaseGraph);
        }
      }
    });
  }
}

function removeDevDependencies(diff, diffs, releaseMap, releaseGraph) {
  const release = diff.getRelease(),
        devDependentReleases = releaseGraph.retrieveDevDependentReleases(release, releaseMap),
        devDependentReleasesLength = devDependentReleases.length;

  if (devDependentReleasesLength > 0) {
    const name = release.getName();

    devDependentReleases.forEach((devDependentRelease) => {
      const release = devDependentRelease, ///
            diff = findDiff(release, diffs);

      if (diff !== null) {
        diff.removeDevDependency(name);
      }
    });
  }
}

module.exports = {
  removeDependencies,
  removeDevDependencies
};

function findDiff(release, diffs) {
  const diff = diffs.find((diff) => {
    const diffRelease = diff.getRelease();

    if (diffRelease === release) {
      return true;
    }
  }) || null; ///

  return diff;
}

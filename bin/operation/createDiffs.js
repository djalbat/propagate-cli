"use strict";

const Diff = require("../diff");

function createDiffsOperation(proceed, abort, context) {
  let { releases } = context;

  const { release, releaseGraph, dependentReleasesLength } = context,
        start = 1,
        deleteCount = dependentReleasesLength,  ///
        dependentReleases = releases.splice(start, deleteCount),
        devDependentReleases = releases.splice(start),
        orderedDependencySubDirectoryPaths = releaseGraph.getOrderedDependencySubDirectoryPaths(),
        orderedDevDependencySubDirectoryPaths = releaseGraph.getOrderedDevDependencySubDirectoryPaths();

  sortReleases(dependentReleases, orderedDependencySubDirectoryPaths);

  sortReleases(devDependentReleases, orderedDevDependencySubDirectoryPaths);

  releases = [
    release,
    ...dependentReleases,
    ...devDependentReleases
  ];

  const diffs = releases.map((release) => {
    const diff = Diff.fromRelease(release);

    return diff;
  });

  Object.assign(context, {
    diffs
  });

  proceed();
}

module.exports = createDiffsOperation;

function sortReleases(releases, orderedSubDirectoryPaths) {
  releases.sort((releaseA, releaseB) => {
    const releaseASubDirectoryPath = releaseA.getSubDirectoryPath(),
          releaseBSubDirectoryPath = releaseB.getSubDirectoryPath(),
          releaseASubDirectoryPathIndex = orderedSubDirectoryPaths.indexOf(releaseASubDirectoryPath),
          releaseBSubDirectoryPathIndex = orderedSubDirectoryPaths.indexOf(releaseBSubDirectoryPath);

    if (false) {
      ///
    } else if (releaseASubDirectoryPathIndex > releaseBSubDirectoryPathIndex) {
      return +1;
    } else if (releaseASubDirectoryPathIndex < releaseBSubDirectoryPathIndex) {
      return -1;
    }
  });
}

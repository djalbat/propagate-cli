"use strict";

const Diff = require("../diff");

function createDiffsCallback(proceed, abort, context) {
  let { releases } = context;

  const { release, releaseGraph, dependentReleasesLength } = context,
        start = 1,
        deleteCount = dependentReleasesLength,  ///
        dependentReleases = releases.splice(start, deleteCount),
        devDependentReleases = releases.splice(start),
        topologicallyOrderedDependencySubDirectoryPaths = releaseGraph.getTopologicallyOrderedDependencySubDirectoryPaths(),
        topologicallyOrderedDevDependencySubDirectoryPaths = releaseGraph.getTopologicallyOrderedDevDependencySubDirectoryPaths(),
        dependencySubDirectoryPaths = topologicallyOrderedDependencySubDirectoryPaths,  ///
        devDependencySubDirectoryPaths = topologicallyOrderedDevDependencySubDirectoryPaths;  ///

  sortReleases(dependentReleases, dependencySubDirectoryPaths);

  sortReleases(devDependentReleases, devDependencySubDirectoryPaths);

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

module.exports = createDiffsCallback;

function sortReleases(releases, subDirectoryPaths) {
  releases.sort((releaseA, releaseB) => {
    const releaseASubDirectoryPath = releaseA.getSubDirectoryPath(),
          releaseBSubDirectoryPath = releaseB.getSubDirectoryPath(),
          releaseASubDirectoryPathIndex = subDirectoryPaths.indexOf(releaseASubDirectoryPath),
          releaseBSubDirectoryPathIndex = subDirectoryPaths.indexOf(releaseBSubDirectoryPath);

    if (false) {
      ///
    } else if (releaseASubDirectoryPathIndex > releaseBSubDirectoryPathIndex) {
      return +1;
    } else if (releaseASubDirectoryPathIndex < releaseBSubDirectoryPathIndex) {
      return -1;
    }
  });
}

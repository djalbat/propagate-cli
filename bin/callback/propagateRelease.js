"use strict";

function propagateReleaseCallback(proceed, abort, context) {
  const { release, releaseMap, releaseGraph } = context;

  propagateReleaseDependencies(release, releaseMap, releaseGraph);

  propagateDevDependencies(releaseMap, releaseGraph);

  proceed();
}

module.exports = propagateReleaseCallback;

function propagateDevDependencies(releaseMap, releaseGraph) {
  const topologicallyOrderedDevDependencySubDirectoryNames = releaseGraph.getTopologicallyOrderedDevDependencySubDirectoryNames(),
        subDirectoryNames = topologicallyOrderedDevDependencySubDirectoryNames; ///

  subDirectoryNames.forEach((subDirectoryName) => {
    const release = releaseMap.retrieveRelease(subDirectoryName),
          bumped = release.isBumped();

    if (bumped) {
      const name = release.getName(),
            version = release.getVersion(),
            devDependentReleases = releaseGraph.retrieveDevDependentReleases(release, releaseMap);

      devDependentReleases.forEach((devDependentRelease) => {
        const publishable = devDependentRelease.isPublishable();

        if (publishable) {
          const bumped = devDependentRelease.isBumped();

          devDependentRelease.updateDevDependencyVersion(name, version)

          if (!bumped) {
            devDependentRelease.bump();
          }
        }
      });
    }
  });
}

function propagateReleaseDependencies(release, releaseMap, releaseGraph) {
  const name = release.getName(),
        version = release.getVersion(),
        dependentReleases = releaseGraph.retrieveDependentReleases(release, releaseMap);

  release.bump();

  release.propagate();

  dependentReleases.forEach((dependentRelease) => {
    const publishable = dependentRelease.isPublishable();

    dependentRelease.updateDependencyVersion(name, version);

    if (publishable) {
      const propagated = dependentRelease.isPropagated();

      if (!propagated) {
        const release = dependentRelease; ///

        propagateReleaseDependencies(release, releaseMap, releaseGraph);
      }
    }
  });
}

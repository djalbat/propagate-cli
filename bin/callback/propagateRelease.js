'use strict';

function propagateReleaseCallback(proceed, abort, context) {
  const { release, dependencyGraph } = context;

  release.propagate();  ///

  propagateRelease(release, dependencyGraph);

  proceed();
}

module.exports = propagateReleaseCallback;

function propagateRelease(release, dependencyGraph) {
  const name = release.getName(),
        version = release.getVersion(),
        dependentReleases = dependencyGraph.retrieveDependentReleases(release);

  dependentReleases.forEach((dependentRelease) => {
    dependentRelease.updateDependencyVersion(name, version);

    dependentRelease.updateDevDependencyVersion(name, version);

    const publishable = dependentRelease.isPublishable();

    if (publishable) {
      const propagated = dependentRelease.hasPropagated();

      if (!propagated) {
        const release = dependentRelease; ///

        release.propagate();

        release.bumpPatchVersion();

        propagateRelease(release, dependencyGraph);
      }
    }
  });
}

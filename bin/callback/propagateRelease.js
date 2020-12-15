"use strict";

function propagateReleaseCallback(proceed, abort, context) {
  const { release, releaseMap, releaseGraph } = context;

  propagateRelease(release, releaseMap, releaseGraph);

  proceed();
}

module.exports = propagateReleaseCallback;

function propagateRelease(release, releaseMap, releaseGraph) {
  const propagated = true;

  release.setPropagated(propagated);

  release.bumpPatchVersion();

  const name = release.getName(),
        version = release.getVersion(),
        immediateSuccessorReleases = releaseGraph.retrieveImmediateSuccessorReleases(release, releaseMap);

  immediateSuccessorReleases.forEach((immediateSuccessorRelease) => {
    immediateSuccessorRelease.updateDependencyVersion(name, version);

    immediateSuccessorRelease.updateDevDependencyVersion(name, version);

    const publishable = immediateSuccessorRelease.isPublishable();

    if (publishable) {
      const propagated = immediateSuccessorRelease.isPropagated();

      if (!propagated) {
        const release = immediateSuccessorRelease; ///

        propagateRelease(release, releaseMap, releaseGraph);
      }
    }
  });
}

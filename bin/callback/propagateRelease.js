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
        successorReleases = releaseGraph.retrieveSuccessorReleases(release, releaseMap);

  successorReleases.forEach((successorRelease) => {
    successorRelease.updateDependencyVersion(name, version);

    successorRelease.updateDevDependencyVersion(name, version);

    const publishable = successorRelease.isPublishable();

    if (publishable) {
      const propagated = successorRelease.isPropagated();

      if (!propagated) {
        const release = successorRelease; ///

        propagateRelease(release, releaseMap, releaseGraph);
      }
    }
  });
}

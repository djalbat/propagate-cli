"use strict";

function propagateReleaseCallback(proceed, abort, context) {
  const { release, releaseMap, releaseGraph } = context,
        releases = [];

  propagateDependencies(release, releases, releaseMap, releaseGraph);

  const releasesLength = releases.length,
        dependentReleasesLength = releasesLength - 1;

  propagateDevDependencies(releases, releaseMap, releaseGraph);

  Object.assign(context, {
    releases,
    dependentReleasesLength
  });

  proceed();
}

module.exports = propagateReleaseCallback;

function propagateDependencies(release, releases, releaseMap, releaseGraph) {
  const releasesIncludesRelease = releases.includes(release);

  if (!releasesIncludesRelease) {
    const version = release.getVersion();

    if (version !== null) {
      release.bumpPatchNumber();
    }

    releases.push(release);
  } else {
    return;
  }

  const dependentReleases = releaseGraph.retrieveDependentReleases(release, releaseMap),
        dependentReleasesLength = dependentReleases.length;

  if (dependentReleasesLength > 0) {
    const name = release.getName(),
          versionString = release.getVersionString();

    dependentReleases.forEach((dependentRelease) => {
      const release = dependentRelease; ///

      release.updateDependencyVersion(name, versionString);

      propagateDependencies(release, releases, releaseMap, releaseGraph);
    });
  }
}

function propagateDevDependencies(releases, releaseMap, releaseGraph) {
  releases.forEach((release) => {
    const devDependentReleases = releaseGraph.retrieveDevDependentReleases(release, releaseMap),
          devDependentReleasesLength = devDependentReleases.length;

    if (devDependentReleasesLength > 0) {
      const name = release.getName(),
            versionString = release.getVersionString();

      devDependentReleases.forEach((devDependentRelease) => {
        const release = devDependentRelease,  ///
              releasesIncludesRelease = releases.includes(release);

        if (!releasesIncludesRelease) {
          const version = release.getVersion();

          if (version !== null) {
            release.bumpPatchNumber();
          }

          releases.push(release);
        }

        release.updateDevDependencyVersion(name, versionString);
      });
    }
  });
}

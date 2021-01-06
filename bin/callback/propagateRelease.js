"use strict";

const Diff = require("../diff");

function propagateReleaseCallback(proceed, abort, context) {
  const { release, releaseMap, releaseGraph } = context,
        releases = [];

  propagateReleaseDependencies(release, releases, releaseMap, releaseGraph);

  propagateDevDependencies(releases, releaseMap, releaseGraph);

  const diffs = releases.map((release) => {
    const diff = Diff.fromRelease(release);

    return diff;
  })

  Object.assign(context, {
    diffs
  });

  proceed();
}

module.exports = propagateReleaseCallback;

function propagateReleaseDependencies(release, releases, releaseMap, releaseGraph) {
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

      propagateReleaseDependencies(release, releases, releaseMap, releaseGraph);
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

"use strict";

import { isDependencyRelationForced } from "../utilities/dependency";
import { retrieveForcedDependencyRelations } from "../configuration";

export default function propagateReleaseOperation(proceed, abort, context) {
  const { release, releaseMap, releaseGraph, subDirectoryMap } = context,
        forcedDependencyRelations = retrieveForcedDependencyRelations(),
        releases = [];

  propagateDependencies(release, releases, releaseMap, releaseGraph, subDirectoryMap, forcedDependencyRelations);

  const releasesLength = releases.length,
        dependentReleasesLength = releasesLength - 1;

  propagateDevDependencies(releases, releaseMap, releaseGraph);

  Object.assign(context, {
    releases,
    dependentReleasesLength
  });

  proceed();
}

function propagateDependencies(release, releases, releaseMap, releaseGraph, subDirectoryMap, forcedDependencyRelations) {
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
          versionString = release.getVersionString(),
          dependencyRelease = release;  ///

    dependentReleases.forEach((dependentRelease) => {
      const dependencyRelationForced = isDependencyRelationForced(dependencyRelease, dependentRelease, subDirectoryMap, forcedDependencyRelations);

      if (!dependencyRelationForced) {
        const success = dependentRelease.updateDependencyVersion(name, versionString);

        if (success) {
          const release = dependentRelease; ///

          propagateDependencies(release, releases, releaseMap, releaseGraph, subDirectoryMap, forcedDependencyRelations);
        }
      }
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

      devDependentReleases.every((devDependentRelease) => {
        const release = devDependentRelease,  ///
              releasesIncludesRelease = releases.includes(release);

        if (!releasesIncludesRelease) {
          const version = release.getVersion();

          if (version !== null) {
            release.bumpPatchNumber();
          }

          releases.push(release);
        }

        const success = release.updateDevDependencyVersion(name, versionString);

        if (success) {
          return true;
        }
      });
    }
  });
}

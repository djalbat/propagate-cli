"use strict";

export function isDependencyRelationForced(dependencyRelease, dependentRelease, subDirectoryMap, forcedDependencyRelations) {
  const dependentReleaseSubDirectoryPath = dependentRelease.getSubDirectoryPath(),
        dependentReleaseSubDirectoryName = subDirectoryNameFromSubDirectoryPath(dependentReleaseSubDirectoryPath, subDirectoryMap),
        dependencyReleaseSubDirectoryPath = dependencyRelease.getSubDirectoryPath(),
        dependencyReleaseSubDirectoryName = subDirectoryNameFromSubDirectoryPath(dependencyReleaseSubDirectoryPath, subDirectoryMap),
        dependencyRelationForced = forcedDependencyRelations.some((forcedDependencyRelation) => {
          const { dependent, dependency } = forcedDependencyRelation;

          if ((dependent === dependentReleaseSubDirectoryName) && (dependency === dependencyReleaseSubDirectoryName)) {
            return true;
          }
        });

  return dependencyRelationForced;
}

function subDirectoryNameFromSubDirectoryPath(subDirectoryPath, subDirectoryMap) {
  const subDirectoryNames = Object.keys(subDirectoryMap), ///
        subDirectoryPaths = Object.values(subDirectoryMap), ///
        index = subDirectoryPaths.indexOf(subDirectoryPath),
        subDirectoryName = subDirectoryNames[index];

  return subDirectoryName;
}

"use strict";

import Release from "./release";

export default class ReleaseMap {
  constructor(map) {
    this.map = map;
  }

  getNames() {
    const names = [],
          releases = this.getReleases();

    releases.forEach((release) => {
      const name = release.getName();

      if (name !== null) {
        names.push(name);
      }
    });

    return names;
  }

  getReleases() {
    const releases = Object.values(this.map);

    return releases;
  }

  getSubDirectoryPaths() {
    const subDirectoryPaths = Object.keys(this.map);

    return subDirectoryPaths;
  }

  getNameToSubDirectoryPathMap() {
    const nameToSubDirectoryPathMap = {},
          subDirectoryPaths = this.getSubDirectoryPaths();

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = this.retrieveRelease(subDirectoryPath),
            name = release.getName();

      if (name !== null) {
        nameToSubDirectoryPathMap[name] = subDirectoryPath;
      }
    });

    return nameToSubDirectoryPathMap;
  }

  retrieveRelease(subDirectoryPath) {
    const release = this.map[subDirectoryPath] || null;  ///

    return release;
  }

  static fromSubDirectoryMapAndIgnoredDependencies(subDirectoryMap, ignoredDependencies) {
    const map = {},
          subDirectoryPaths = subDirectoryPathsFromSubDirectoryMapAndIgnoredDependencies(subDirectoryMap, ignoredDependencies);

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = Release.fromSubDirectoryPath(subDirectoryPath);

      if (release !== null) {
        map[subDirectoryPath] = release;
      }
    });

    const releaseMap = new ReleaseMap(map);

    return releaseMap;
  }
}

function subDirectoryPathsFromSubDirectoryMapAndIgnoredDependencies(subDirectoryMap, ignoredDependencies) {
  const subDirectoryPaths = [],
        subDirectoryNames = Object.keys(subDirectoryMap), ///
        ignoredDependencySubDirectoryNames = ignoredDependencies; ///

  subDirectoryNames.forEach((subDirectoryName) => {
    const ignoredDependencySubDirectoryNamesIncludesSubDirectoryName = ignoredDependencySubDirectoryNames.includes(subDirectoryName);

    if (!ignoredDependencySubDirectoryNamesIncludesSubDirectoryName) {
      const subDirectoryPath = subDirectoryMap[subDirectoryName]; ///

      subDirectoryPaths.push(subDirectoryPath);
    }
  });

  return subDirectoryPaths;
}

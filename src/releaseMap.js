"use strict";

import { arrayUtilities } from "necessary";

import Release from "./release";

const { prune } = arrayUtilities;

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

  static fromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies) {
    const map = {},
          subDirectoryPaths = subDirectoryPathsFromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies);

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

function subDirectoryPathsFromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies) {
  const subDirectoryPaths = [],
        subDirectoryNames = Object.keys(subDirectoryMap), ///
        ignoredDependencySubDirectoryNames = ignoredDependencies; ///

  prune(ignoredDependencySubDirectoryNames, (ignoredDependencySubDirectoryName) => {
    if (ignoredDependencySubDirectoryName !== subDirectoryName) {
      return true;
    }
  });

  subDirectoryNames.forEach((subDirectoryName) => {
    const ignoredDependencySubDirectoryNamesIncludesSubDirectoryName = ignoredDependencySubDirectoryNames.includes(subDirectoryName);

    if (!ignoredDependencySubDirectoryNamesIncludesSubDirectoryName) {
      const subDirectoryPath = subDirectoryMap[subDirectoryName]; ///

      subDirectoryPaths.push(subDirectoryPath);
    }
  });

  return subDirectoryPaths;
}

'use strict';

const Diff = require('../diff'),
      messages = require('../messages'),
      ReleaseMap = require('../releaseMap'),
      configuration = require('../configuration'),
      DependencyGraph = require('../dependencyGraph');

const { exit } = process,
      { retrieveDirectories } = configuration,
      { NO_RELEASE_PRESENT_MESSAGE,
        RELEASE_NOT_PUBLISHABLE_MESSAGE,
        NO_SUB_DIRECTORY_SPECIFIED_MESSAGE } = messages;

function propagate(argument, quietly) {
  if (argument === null) {
    console.log(NO_SUB_DIRECTORY_SPECIFIED_MESSAGE);

    exit();
  }

  const subDirectoryName = argument,  ////
        subDirectoryRPath = `./${subDirectoryName}`,
        directories = retrieveDirectories(),
        releaseMap = ReleaseMap.fromDirectories(directories),
        release = releaseMap.retrieveRelease(subDirectoryRPath);

  if (release === null) {
    console.log(NO_RELEASE_PRESENT_MESSAGE);

    exit();
  }

  const releasePublishable = release.isPublishable();

  if (!releasePublishable) {
    console.log(RELEASE_NOT_PUBLISHABLE_MESSAGE);

    exit();
  }

  release.propagate();  ///

  const dependencyGraph = DependencyGraph.fromReleaseMap(releaseMap);

  propagateRelease(release, dependencyGraph);

  if (!quietly) {
    const diffs = retrieveDiffs(release, dependencyGraph);

    diffs.forEach((diff) => {
      const diffString = diff.asString();

      if (diffString !== null) {
        console.log(diffString);
      }
    });
  }
}

module.exports = propagate;

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

function retrieveDiffs(release, dependencyGraph, diffs = []) {
  const subDirectoryPath = release.getSubDirectoryPath();

  let diff = diffs.find((diff) => {
    const diffSubdirectoryPath = diff.getSubDirectoryPath();

    if (diffSubdirectoryPath === subDirectoryPath) {
      return true;
    }
  }) || null;

  if (diff === null) {
    diff = Diff.fromRelease(release);

    diffs.push(diff);

    const dependentReleases = dependencyGraph.retrieveDependentReleases(release);

    dependentReleases.forEach((dependentRelease) => {
      const release = dependentRelease; ///

      retrieveDiffs(release, dependencyGraph, diffs);
    });
  }

  return diffs;
}

"use strict";

const necessary = require("necessary");

const messages = require("../messages"),
      ReleaseGraph = require("../releaseGraph");

const { arrayUtilities } = necessary,
      { first } = arrayUtilities,
      { AT_LEAST_ONE_CYCLE_MESSAGE } = messages;

function createReleaseGraphCallback(proceed, abort, context) {
  const { releaseMap } = context,
        releaseGraph = ReleaseGraph.fromReleaseMap(releaseMap),
        cyclesPresent = releaseGraph.areCyclesPresent();

  if (cyclesPresent) {
    const cyclicSubDirectoryNames = releaseGraph.getCyclicSubDirectoryNames(),
          firstCyclicSubDirectoryName = first(cyclicSubDirectoryNames),
          subDirectoryNames = [
            ...cyclicSubDirectoryNames,
            firstCyclicSubDirectoryName
          ];

    console.log(AT_LEAST_ONE_CYCLE_MESSAGE);

    subDirectoryNames.forEach((subDirectoryName) => {
      console.log(` "${subDirectoryName}"`);
    });

    abort();

    return;
  }

  Object.assign(context, {
    releaseGraph
  });

  proceed();
}

module.exports = createReleaseGraphCallback;

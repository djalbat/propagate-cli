"use strict";

const { retrieveIgnoredDependencies } = require("../configuration");

const { NO_IGNORED_DEPENDENCIES_MESSAGE } = require("../messages");

function listForcedDependencyRelations() {
  const ignoredDependencyNumbers = [],
        ignoredDependencies = retrieveIgnoredDependencies(),
        ignoredDependenciesLength = ignoredDependencies.length;

  if (ignoredDependenciesLength === 0) {
    console.log(NO_IGNORED_DEPENDENCIES_MESSAGE);
  } else {
    const ignoredDependencyNames = [
      ...ignoredDependencies
    ];

    console.log("");

    ignoredDependencyNames.forEach((ignoredDependencyName, index) => {
      const ignoredDependencyNumber = index + 1;  ///

      console.log(` ${ignoredDependencyNumber}: "${ignoredDependencyName}"`);

      ignoredDependencyNumbers.push(ignoredDependencyNumber);
    });

    console.log("");
  }

  return ignoredDependencyNumbers;
}

module.exports = listForcedDependencyRelations;

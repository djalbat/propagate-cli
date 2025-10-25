"use strict";

import { EMPTY_STRING } from "../constants";
import { retrieveIgnoredDependencies } from "../configuration";

import { NO_IGNORED_DEPENDENCIES_MESSAGE } from "../messages";

export default function listForcedDependencyRelationsAction() {
  const ignoredDependencyNumbers = [],
        ignoredDependencies = retrieveIgnoredDependencies(),
        ignoredDependenciesLength = ignoredDependencies.length;

  if (ignoredDependenciesLength === 0) {
    console.log(NO_IGNORED_DEPENDENCIES_MESSAGE);
  } else {
    const ignoredDependencyNames = [
      ...ignoredDependencies
    ];

    console.log(EMPTY_STRING);

    ignoredDependencyNames.forEach((ignoredDependencyName, index) => {
      const ignoredDependencyNumber = index + 1;  ///

      console.log(` ${ignoredDependencyNumber}: "${ignoredDependencyName}"`);

      ignoredDependencyNumbers.push(ignoredDependencyNumber);
    });

    console.log(EMPTY_STRING);
  }

  return ignoredDependencyNumbers;
}

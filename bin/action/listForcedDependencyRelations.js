"use strict";

const { retrieveForcedDependencyRelations } = require("../configuration");

const { NO_FORCED_DEPENDENCY_RELATIONS_MESSAGE } = require("../messages");

function listForcedDependencyRelations() {
  const forcedDependencyRelationsNumbers = [],
        forcedDependencyRelations = retrieveForcedDependencyRelations(),
        forcedDependencyRelationsLength = forcedDependencyRelations.length;

  if (forcedDependencyRelationsLength === 0) {
    console.log(NO_FORCED_DEPENDENCY_RELATIONS_MESSAGE);
  } else {
    const forcedDependencyRelationsNames = [
      ...forcedDependencyRelations
    ];

    console.log("");

    forcedDependencyRelationsNames.forEach((forcedDependencyRelationsName, index) => {
      const forcedDependencyRelationsNumber = index + 1;  ///

      console.log(` ${forcedDependencyRelationsNumber}: "${forcedDependencyRelationsName}"`);

      forcedDependencyRelationsNumbers.push(forcedDependencyRelationsNumber);
    });

    console.log("");
  }

  return forcedDependencyRelationsNumbers;
}

module.exports = listForcedDependencyRelations;

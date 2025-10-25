"use strict";

import { EMPTY_STRING } from "../constants";
import { retrieveForcedDependencyRelations } from "../configuration";

import { NO_FORCED_DEPENDENCY_RELATIONS_MESSAGE } from "../messages";

export default function listForcedDependencyRelationsAction() {
  const forcedDependencyRelationsNumbers = [],
        forcedDependencyRelations = retrieveForcedDependencyRelations(),
        forcedDependencyRelationsLength = forcedDependencyRelations.length;

  if (forcedDependencyRelationsLength === 0) {
    console.log(NO_FORCED_DEPENDENCY_RELATIONS_MESSAGE);
  } else {
    console.log(EMPTY_STRING);

    forcedDependencyRelations.forEach((forcedDependencyRelations, index) => {
      const { dependent, dependency } = forcedDependencyRelations,
            forcedDependencyRelationsNumber = index + 1;  ///

      console.log(` ${forcedDependencyRelationsNumber}: "${dependent}" -> "${dependency}"`);

      forcedDependencyRelationsNumbers.push(forcedDependencyRelationsNumber);
    });

    console.log(EMPTY_STRING);
  }

  return forcedDependencyRelationsNumbers;
}

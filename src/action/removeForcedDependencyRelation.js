"use strict";

import listForcedDependencyRelations from "../action/listForcedDependencyRelations";
import removeForcedDependencyRelationPromptOperation from "../operation/prompt/removeForcedDependencyRelation";

import { executeOperations } from "../utilities/operation";
import { updateForcedDependencyRelations, retrieveForcedDependencyRelations } from "../configuration";
import { FAILED_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE, SUCCESSFUL_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE } from "../messages";

export default function removeForcedDependencyRelationAction() {
  const operations = [
          removeForcedDependencyRelationPromptOperation
        ],
        forcedDependencyRelationNumbers = listForcedDependencyRelations(),
        forcedDependencyRelationNumbersLength = forcedDependencyRelationNumbers.length;

  if (forcedDependencyRelationNumbersLength === 0) {
    return;
  }

  const context = {
          forcedDependencyRelationNumbers
        };

  executeOperations(operations, (completed) => {
    if (!completed) {
      console.log(FAILED_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE);

      return;
    }

    const { forcedDependencyRelationNumber } = context,
          start = forcedDependencyRelationNumber - 1,
          deleteCount = 1,
          ignoredDependencies = retrieveForcedDependencyRelations();

    ignoredDependencies.splice(start, deleteCount);

    updateForcedDependencyRelations(ignoredDependencies);

    console.log(SUCCESSFUL_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE);
  }, context);
}

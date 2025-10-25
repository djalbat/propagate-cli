"use strict";

import addForcedDependentPromptOperation from "../operation/prompt/addForcedDependent";
import addForcedDependencyPromptOperation from "../operation/prompt/addForcedDependency";

import { executeOperations } from "../utilities/operation";
import { retrieveForcedDependencyRelations, updateForcedDependencyRelations } from "../configuration";
import { FAILED_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE,
         SUCCESSFUL_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE,
         FORCED_DEPENDENCY_RELATIONS_INCLUDE_FORCED_DEPENDENCY_RELATION_MESSAGE } from "../messages";

export default function addForcedDependencyRelationAction() {
  const operations = [
          addForcedDependencyPromptOperation,
          addForcedDependentPromptOperation
        ],
        context = {};

  executeOperations(operations, (completed) => {
    if (!completed) {
      console.log(FAILED_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE);

      return;
    }

    const { forcedDependent, forcedDependency } = context,
          forcedDependencyRelations = retrieveForcedDependencyRelations(),
          forcedDependencyRelationsIncludesForcedDependencyRelation = forcedDependencyRelations.some((forcedDependencyRelation) => {  ///
            const { dependent, dependency } = forcedDependencyRelation;

            if ((dependent === forcedDependent) && (dependency === forcedDependency)) {
              return true;
            }
          });

    if (forcedDependencyRelationsIncludesForcedDependencyRelation) {
      console.log(FORCED_DEPENDENCY_RELATIONS_INCLUDE_FORCED_DEPENDENCY_RELATION_MESSAGE);
    } else {
      const dependent = forcedDependent,  ///
            dependency = forcedDependency,  ///
            forcedDependencyRelation = {
              dependent,
              dependency
            };

      forcedDependencyRelations.push(forcedDependencyRelation);

      updateForcedDependencyRelations(forcedDependencyRelations);

      console.log(SUCCESSFUL_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE);
    }
  }, context);
}

"use strict";

const addForcedDependentPromptOperation = require("../operation/prompt/addForcedDependent"),
      addForcedDependencyPromptOperation = require("../operation/prompt/addForcedDependency");

const { executeOperations } = require("../utilities/operation"),
      { retrieveForcedDependencyRelations, updateForcedDependencyRelations } = require("../configuration"),
      { FAILED_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE,
        SUCCESSFUL_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE,
        FORCED_DEPENDENCY_RELATIONS_INCLUDE_FORCED_DEPENDENCY_RELATION_MESSAGE } = require("../messages");

function addForcedDependencyRelationAction() {
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

module.exports = addForcedDependencyRelationAction;

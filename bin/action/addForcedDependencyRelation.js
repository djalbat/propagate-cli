"use strict";

const addForcedDependentPromptCallback = require("../callback/prompt/addForcedDependent"),
      addForcedDependencyPromptCallback = require("../callback/prompt/addForcedDependency");

const { executeCallbacks } = require("../utilities/callback"),
      { retrieveForcedDependencyRelations, updateForcedDependencyRelations } = require("../configuration"),
      { FAILED_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE,
        SUCCESSFUL_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE,
        FORCED_DEPENDENCY_RELATIONS_INCLUDE_FORCED_DEPENDENCY_RELATION_MESSAGE } = require("../messages");

function addForcedDependencyRelation() {
  const callbacks = [
          addForcedDependencyPromptCallback,
          addForcedDependentPromptCallback
        ],
        context = {};

  executeCallbacks(callbacks, (completed) => {
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

module.exports = addForcedDependencyRelation;

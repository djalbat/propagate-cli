"use strict";

const addForcedDependencyRelationPromptCallback = require("../callback/prompt/addForcedDependencyRelation");

const { executeCallbacks } = require("../utilities/callback"),
      { retrieveForcedDependencyRelations, updateForcedDependencyRelations } = require("../configuration"),
      { FAILED_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE,
        SUCCESSFUL_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE,
        FORCED_DEPENDENCY_RELATIONS_INCLUDE_FORCED_DEPENDENCY_RELATION_MESSAGE } = require("../messages");

function addForcedDependencyRelation() {
  const callbacks = [
          addForcedDependencyRelationPromptCallback
        ],
        context = {};

  executeCallbacks(callbacks, (completed) => {
    if (!completed) {
      console.log(FAILED_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE);

      return;
    }

    const forcedDependencyRelations = retrieveForcedDependencyRelations(),
          { forcedDependency } = context;

    const forcedDependencyRelationsIncludesForcedDependencyRelation = forcedDependencyRelations.includes(forcedDependency);

    if (forcedDependencyRelationsIncludesForcedDependencyRelation) {
      console.log(FORCED_DEPENDENCY_RELATIONS_INCLUDE_FORCED_DEPENDENCY_RELATION_MESSAGE);
    } else {
      forcedDependencyRelations.push(forcedDependency);

      updateForcedDependencyRelations(forcedDependencyRelations);

      console.log(SUCCESSFUL_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE);
    }
  }, context);
}

module.exports = addForcedDependencyRelation;

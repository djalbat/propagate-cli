"use strict";

const listForcedDependencyRelations = require("../action/listForcedDependencyRelations"),
      removeForcedDependencyRelationPromptCallback = require("../callback/prompt/removeForcedDependencyRelation");

const { executeCallbacks } = require("../utilities/callback"),
      { updateForcedDependencyRelations, retrieveForcedDependencyRelations } = require("../configuration"),
      { FAILED_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE, SUCCESSFUL_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE } = require("../messages");

function removeForcedDependencyRelation() {
  const callbacks = [
          removeForcedDependencyRelationPromptCallback
        ],
        forcedDependencyRelationNumbers = listForcedDependencyRelations(),
        forcedDependencyRelationNumbersLength = forcedDependencyRelationNumbers.length;

  if (forcedDependencyRelationNumbersLength === 0) {
    return;
  }

  const context = {
          forcedDependencyRelationNumbers
        };

  executeCallbacks(callbacks, (completed) => {
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

module.exports = removeForcedDependencyRelation;

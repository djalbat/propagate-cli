"use strict";

const listForcedDependencyRelations = require("../action/listForcedDependencyRelations"),
      removeForcedDependencyRelationPromptOperation = require("../operation/prompt/removeForcedDependencyRelation");

const { executeOperations } = require("../utilities/operation"),
      { updateForcedDependencyRelations, retrieveForcedDependencyRelations } = require("../configuration"),
      { FAILED_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE, SUCCESSFUL_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE } = require("../messages");

function removeForcedDependencyRelation() {
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

module.exports = removeForcedDependencyRelation;

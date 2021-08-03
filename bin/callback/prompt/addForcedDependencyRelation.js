"use strict";

const { shellUtilities } = require("necessary");

const { validateForcedDependencyRelationName } = require("../../utilities/validate"),
      { FORCED_DEPENDENCY_RELATION_DESCRIPTION } = require("../../descriptions"),
      { INVALID_FORCED_DEPENDENCY_RELATION_NAME_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

function addForcedDependencyRelationPromptCallback(proceed, abort, context) {
  const description = FORCED_DEPENDENCY_RELATION_DESCRIPTION,
        errorMessage = INVALID_FORCED_DEPENDENCY_RELATION_NAME_MESSAGE,
        validationFunction = validateForcedDependencyRelationName,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const forcedDependencyRelationName = answer, ///
          valid = (forcedDependencyRelationName !== null);

    if (valid) {
      const forcedDependencyRelation = forcedDependencyRelationName;  ///

      Object.assign(context, {
        forcedDependencyRelation
      });

      proceed();

      return;
    }

    abort();
  });
}

module.exports = addForcedDependencyRelationPromptCallback;

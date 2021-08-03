"use strict";

const { shellUtilities } = require("necessary");

const { validateForcedDependencyRelationNumber } = require("../../utilities/validate"),
      { INVALID_FORCED_DEPENDENCY_RELATION_NUMBER_MESSAGE } = require("../../messages"),
      { SPECIFY_FORCED_DEPENDENCY_RELATION_TO_REMOVE_DESCRIPTION } = require("../../descriptions");

const { prompt } = shellUtilities;

function removeForcedDependencyRelationPromptCallback(proceed, abort, context) {
  const description = SPECIFY_FORCED_DEPENDENCY_RELATION_TO_REMOVE_DESCRIPTION,
        errorMessage = INVALID_FORCED_DEPENDENCY_RELATION_NUMBER_MESSAGE,
        { forcedDependencyRelationNumbers } = context,
        validationFunction = (forcedDependencyRelationNumber) => {
          forcedDependencyRelationNumber = Number(forcedDependencyRelationNumber);  ///

          return validateForcedDependencyRelationNumber(forcedDependencyRelationNumber, forcedDependencyRelationNumbers);
        },  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const forcedDependencyRelationNumber = (answer !== null) ?
                                             Number(answer) :
                                               null,
          valid = (forcedDependencyRelationNumber !== null);

    if (valid) {
      Object.assign(context, {
        forcedDependencyRelationNumber
      });

      proceed();

      return;
    }

    abort();
  });
}

module.exports = removeForcedDependencyRelationPromptCallback;

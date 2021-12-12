"use strict";

const { shellUtilities } = require("necessary");

const { validateForcedDependencyName } = require("../../utilities/validate"),
      { FORCED_DEPENDENCY_DESCRIPTION } = require("../../descriptions"),
      { INVALID_FORCED_DEPENDENCY_NAME_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

function addForcedDependencyPromptOperation(proceed, abort, context) {
  const description = FORCED_DEPENDENCY_DESCRIPTION,
        errorMessage = INVALID_FORCED_DEPENDENCY_NAME_MESSAGE,
        validationFunction = validateForcedDependencyName,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const forcedDependencyName = answer, ///
          valid = (forcedDependencyName !== null);

    if (valid) {
      const forcedDependency = forcedDependencyName;  ///

      Object.assign(context, {
        forcedDependency
      });

      proceed();

      return;
    }

    abort();
  });
}

module.exports = addForcedDependencyPromptOperation;

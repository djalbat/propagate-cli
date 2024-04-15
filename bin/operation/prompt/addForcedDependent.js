"use strict";

const { shellUtilities } = require("necessary");

const { validateForcedDependentName } = require("../../utilities/validate"),
      { FORCED_DEPENDENT_DESCRIPTION } = require("../../descriptions"),
      { INVALID_FORCED_DEPENDENT_NAME_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

function addForcedDependentPromptOperation(proceed, abort, context) {
  const attempts = Infinity,
        description = FORCED_DEPENDENT_DESCRIPTION,
        errorMessage = INVALID_FORCED_DEPENDENT_NAME_MESSAGE,
        validationFunction = validateForcedDependentName,  ///
        options = {
          attempts,
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const forcedDependentName = answer, ///
          valid = (forcedDependentName !== null);

    if (valid) {
      const forcedDependent = forcedDependentName;  ///

      Object.assign(context, {
        forcedDependent
      });

      proceed();

      return;
    }

    abort();
  });
}

module.exports = addForcedDependentPromptOperation;

"use strict";

const { shellUtilities } = require("necessary");

const { validateForcedDependentName } = require("../../utilities/validate"),
      { FORCED_DEPENDENT_DESCRIPTION } = require("../../descriptions"),
      { INVALID_FORCED_DEPENDENT_NAME_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

function addForcedDependentPromptCallback(proceed, abort, context) {
  const description = FORCED_DEPENDENT_DESCRIPTION,
        errorMessage = INVALID_FORCED_DEPENDENT_NAME_MESSAGE,
        validationFunction = validateForcedDependentName,  ///
        options = {
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

module.exports = addForcedDependentPromptCallback;

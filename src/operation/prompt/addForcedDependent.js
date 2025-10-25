"use strict";

import { shellUtilities } from "necessary";

import { validateForcedDependentName } from "../../utilities/validate";
import { FORCED_DEPENDENT_DESCRIPTION } from "../../descriptions";
import { INVALID_FORCED_DEPENDENT_NAME_MESSAGE } from "../../messages";

const { prompt } = shellUtilities;

export default function addForcedDependentPromptOperation(proceed, abort, context) {
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

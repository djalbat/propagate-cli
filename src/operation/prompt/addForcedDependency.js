"use strict";

import { shellUtilities } from "necessary";

import { validateForcedDependencyName } from "../../utilities/validate";
import { FORCED_DEPENDENCY_DESCRIPTION } from "../../descriptions";
import { INVALID_FORCED_DEPENDENCY_NAME_MESSAGE } from "../../messages";

const { prompt } = shellUtilities;

export default function addForcedDependencyPromptOperation(proceed, abort, context) {
  const attempts = Infinity,
        description = FORCED_DEPENDENCY_DESCRIPTION,
        errorMessage = INVALID_FORCED_DEPENDENCY_NAME_MESSAGE,
        validationFunction = validateForcedDependencyName,  ///
        options = {
          attempts,
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

"use strict";

import { shellUtilities } from "necessary";

import { validateForcedDependencyRelationNumber } from "../../utilities/validate";
import { INVALID_FORCED_DEPENDENCY_RELATION_NUMBER_MESSAGE } from "../../messages";
import { SPECIFY_FORCED_DEPENDENCY_RELATION_TO_REMOVE_DESCRIPTION } from "../../descriptions";

const { prompt } = shellUtilities;

export default function removeForcedDependencyRelationPromptOperation(proceed, abort, context) {
  const attempts = Infinity,
        description = SPECIFY_FORCED_DEPENDENCY_RELATION_TO_REMOVE_DESCRIPTION,
        errorMessage = INVALID_FORCED_DEPENDENCY_RELATION_NUMBER_MESSAGE,
        { forcedDependencyRelationNumbers } = context,
        validationFunction = (forcedDependencyRelationNumber) => {
          forcedDependencyRelationNumber = Number(forcedDependencyRelationNumber);  ///

          return validateForcedDependencyRelationNumber(forcedDependencyRelationNumber, forcedDependencyRelationNumbers);
        },  ///
        options = {
          attempts,
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

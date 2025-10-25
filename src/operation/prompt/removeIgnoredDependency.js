"use strict";

import { shellUtilities } from "necessary";

import { validateIgnoredDependencyNumber } from "../../utilities/validate";
import { INVALID_IGNORED_DEPENDENCY_NUMBER_MESSAGE } from "../../messages";
import { SPECIFY_IGNORED_DEPENDENCY_TO_REMOVE_DESCRIPTION } from "../../descriptions";

const { prompt } = shellUtilities;

export default function removeIgnoredDependencyPromptOperation(proceed, abort, context) {
  const attempts = Infinity,
        description = SPECIFY_IGNORED_DEPENDENCY_TO_REMOVE_DESCRIPTION,
        errorMessage = INVALID_IGNORED_DEPENDENCY_NUMBER_MESSAGE,
        { ignoredDependencyNumbers } = context,
        validationFunction = (ignoredDependencyNumber) => {
          ignoredDependencyNumber = Number(ignoredDependencyNumber);  ///

          return validateIgnoredDependencyNumber(ignoredDependencyNumber, ignoredDependencyNumbers);
        },  ///
        options = {
          attempts,
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const ignoredDependencyNumber = (answer !== null) ?
                                      Number(answer) :
                                        null,
          valid = (ignoredDependencyNumber !== null);

    if (valid) {
      Object.assign(context, {
        ignoredDependencyNumber
      });

      proceed();

      return;
    }

    abort();
  });
}

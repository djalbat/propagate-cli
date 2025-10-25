"use strict";

import { shellUtilities } from "necessary";

import { validateIgnoredDependencyName } from "../../utilities/validate";
import { IGNORED_DEPENDENCY_DESCRIPTION } from "../../descriptions";
import { INVALID_IGNORED_DEPENDENCY_NAME_MESSAGE } from "../../messages";

const { prompt } = shellUtilities;

export default function addIgnoredDependencyPromptOperation(proceed, abort, context) {
  const attempts = Infinity,
        description = IGNORED_DEPENDENCY_DESCRIPTION,
        errorMessage = INVALID_IGNORED_DEPENDENCY_NAME_MESSAGE,
        validationFunction = validateIgnoredDependencyName,  ///
        options = {
          attempts,
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const ignoredDependencyName = answer, ///
          valid = (ignoredDependencyName !== null);

    if (valid) {
      const ignoredDependency = ignoredDependencyName;  ///

      Object.assign(context, {
        ignoredDependency
      });

      proceed();

      return;
    }

    abort();
  });
}

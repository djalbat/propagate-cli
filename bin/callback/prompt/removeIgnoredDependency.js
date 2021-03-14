"use strict";

const { shellUtilities } = require("necessary");

const { validateIgnoredDependencyNumber } = require("../../utilities/validate"),
      { INVALID_IGNORED_DEPENDENCY_NUMBER_MESSAGE } = require("../../messages"),
      { SPECIFY_IGNORED_DEPENDENCY_TO_REMOVE_DESCRIPTION } = require("../../descriptions");

const { prompt } = shellUtilities;

function removeIgnoredDependencyPromptCallback(proceed, abort, context) {
  const description = SPECIFY_IGNORED_DEPENDENCY_TO_REMOVE_DESCRIPTION,
        errorMessage = INVALID_IGNORED_DEPENDENCY_NUMBER_MESSAGE,
        { ignoredDependencyNumbers } = context,
        validationFunction = (ignoredDependencyNumber) => {
          ignoredDependencyNumber = Number(ignoredDependencyNumber);  ///

          return validateIgnoredDependencyNumber(ignoredDependencyNumber, ignoredDependencyNumbers);
        },  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const ignoredDependencyNumber = Number(answer),
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

module.exports = removeIgnoredDependencyPromptCallback;

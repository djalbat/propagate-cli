"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      descriptions = require("../../descriptions"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { validateIgnoredDependencyNumber } = validateUtilities,
      { INVALID_IGNORED_DEPENDENCY_NUMBER_MESSAGE } = messages,
      { SPECIFY_IGNORED_DEPENDENCY_TO_REMOVE_DESCRIPTION } = descriptions;

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

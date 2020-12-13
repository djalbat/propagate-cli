"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { validateIgnoredDependencyNumber } = validateUtilities,
      { INVALID_IGNORED_DEPENDENCY_NUMBER_MESSAGE } = messages;

function removeIgnoredDependencyPromptCallback(proceed, abort, context) {
  const description = "Specify an ignored dependency to remove: ",
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

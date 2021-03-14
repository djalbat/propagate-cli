"use strict";

const { shellUtilities } = require("necessary");

const { validateIgnoredDependencyName } = require("../../utilities/validate"),
      { IGNORED_DEPENDENCY_DESCRIPTION } = require("../../descriptions"),
      { INVALID_IGNORED_DEPENDENCY_NAME_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

function addIgnoredDependencyPromptCallback(proceed, abort, context) {
  const description = IGNORED_DEPENDENCY_DESCRIPTION,
        errorMessage = INVALID_IGNORED_DEPENDENCY_NAME_MESSAGE,
        validationFunction = validateIgnoredDependencyName,  ///
        options = {
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

module.exports = addIgnoredDependencyPromptCallback;

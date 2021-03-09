"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      descriptions = require("../../descriptions"),
      validateUtilities = require("../../utilities/validate");

const { shellUtilities } = necessary,
      { prompt } = shellUtilities,
      { validateIgnoredDependencyName } = validateUtilities,
      { IGNORED_DEPENDENCY_DESCRIPTION } = descriptions,
      { INVALID_IGNORED_DEPENDENCY_NAME_MESSAGE } = messages;

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

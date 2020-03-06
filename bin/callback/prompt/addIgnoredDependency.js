'use strict';

const necessary = require('necessary');

const messages = require('../../messages'),
      validateUtilities = require('../../utilities/validate');

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { validateIgnoredDependencyName } = validateUtilities,
      { INVALID_IGNORED_DEPENDENCY_NAME_MESSAGE } = messages;

function addIgnoredDependencyPromptCallback(proceed, abort, context) {
  const description = 'Ignored dependency: ',
        errorMessage = INVALID_IGNORED_DEPENDENCY_NAME_MESSAGE,
        validationFunction = validateIgnoredDependencyName,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (ignoredDependencyName) => {
    const valid = (ignoredDependencyName !== null);

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

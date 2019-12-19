'use strict';

const necessary = require('necessary');

const validate = require('../../validate'),
      messages = require('../../messages');

const { miscellaneousUtilities } = necessary,
      { validateDirectoryPath } = validate,
      { prompt } = miscellaneousUtilities,
      { INVALID_DIRECTORY_PATH_MESSAGE } = messages;

function addDirectoryPromptCallback(proceed, abort, context) {
  const description = 'Directory path: ',
        errorMessage = INVALID_DIRECTORY_PATH_MESSAGE,
        validationFunction = validateDirectoryPath,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (directoryPath) => {
    const valid = (directoryPath !== null);

    if (valid) {
      const directory = directoryPath;  ///

      Object.assign(context, {
        directory
      });

      proceed();

      return;
    }

    abort();
  });
}

module.exports = addDirectoryPromptCallback;

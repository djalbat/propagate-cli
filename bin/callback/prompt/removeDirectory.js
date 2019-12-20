'use strict';

const necessary = require('necessary');

const validate = require('../../validate'),
      messages = require('../../messages');

const { miscellaneousUtilities } = necessary,
      { validateDirectoryNumber } = validate,
      { prompt } = miscellaneousUtilities,
      { INVALID_DIRECTORY_NUMBER_MESSAGE } = messages;

function removeDirectoryPromptCallback(proceed, abort, context) {
  const description = 'Specify a directory to remove: ',
        errorMessage = INVALID_DIRECTORY_NUMBER_MESSAGE,
        { directoryNumbers } = context,
        validationFunction = (directoryNumber) => {
          directoryNumber = Number(directoryNumber);  ///

          return validateDirectoryNumber(directoryNumber, directoryNumbers);
        },  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (directoryNumber) => {
    directoryNumber = Number(directoryNumber);  ///

    const valid = (directoryNumber !== null);

    if (valid) {
      Object.assign(context, {
        directoryNumber
      });

      proceed();

      return;
    }

    abort();
  });
}

module.exports = removeDirectoryPromptCallback;

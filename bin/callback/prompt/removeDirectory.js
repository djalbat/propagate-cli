"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { validateDirectoryNumber } = validateUtilities,
      { INVALID_DIRECTORY_NUMBER_MESSAGE } = messages;

function removeDirectoryPromptCallback(proceed, abort, context) {
  const description = "Specify a directory to remove: ",
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

  prompt(options, (answer) => {
    const directoryNumber = Number(answer),
          valid = (directoryNumber !== null);

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

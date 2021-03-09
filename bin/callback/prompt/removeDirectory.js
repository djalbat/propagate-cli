"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      descriptions = require("../../descriptions"),
      validateUtilities = require("../../utilities/validate");

const { shellUtilities } = necessary,
      { prompt } = shellUtilities,
      { validateDirectoryNumber } = validateUtilities,
      { INVALID_DIRECTORY_NUMBER_MESSAGE } = messages,
      { SPECIFY_DIRECTORY_TO_REMOVE_DESCRIPTION } = descriptions;

function removeDirectoryPromptCallback(proceed, abort, context) {
  const description = SPECIFY_DIRECTORY_TO_REMOVE_DESCRIPTION,
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

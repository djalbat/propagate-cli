"use strict";

const { shellUtilities } = require("necessary");

const { validateDirectoryNumber } = require("../../utilities/validate"),
      { INVALID_DIRECTORY_NUMBER_MESSAGE } = require("../../messages"),
      { SPECIFY_DIRECTORY_TO_REMOVE_DESCRIPTION } = require("../../descriptions");

const { prompt } = shellUtilities;

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

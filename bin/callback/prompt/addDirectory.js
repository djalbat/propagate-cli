"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      descriptions = require("../../descriptions"),
      validateUtilities = require("../../utilities/validate");

const { shellUtilities } = necessary,
      { prompt } = shellUtilities,
      { validateDirectoryPath } = validateUtilities,
      { DIRECTORY_PATH_DESCRIPTION } = descriptions,
      { INVALID_DIRECTORY_PATH_MESSAGE } = messages;

function addDirectoryPromptCallback(proceed, abort, context) {
  const description = DIRECTORY_PATH_DESCRIPTION,
        errorMessage = INVALID_DIRECTORY_PATH_MESSAGE,
        validationFunction = validateDirectoryPath,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const directoryPath = answer, ///
          valid = (directoryPath !== null);

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

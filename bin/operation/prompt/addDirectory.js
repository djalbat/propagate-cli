"use strict";

const { shellUtilities } = require("necessary");

const { validateDirectoryPath } = require("../../utilities/validate"),
      { DIRECTORY_PATH_DESCRIPTION } = require("../../descriptions"),
      { INVALID_DIRECTORY_PATH_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

function addDirectoryPromptOperation(proceed, abort, context) {
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

module.exports = addDirectoryPromptOperation;

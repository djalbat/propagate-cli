"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { validateDirectoryPath } = validateUtilities,
      { INVALID_DIRECTORY_PATH_MESSAGE } = messages;

function addDirectoryPromptCallback(proceed, abort, context) {
  const description = "Directory path: ",
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

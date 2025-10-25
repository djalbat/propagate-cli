"use strict";

import { shellUtilities } from "necessary";

import { validateDirectoryPath } from "../../utilities/validate";
import { DIRECTORY_PATH_DESCRIPTION } from "../../descriptions";
import { INVALID_DIRECTORY_PATH_MESSAGE } from "../../messages";

const { prompt } = shellUtilities;

export default function addDirectoryPromptOperation(proceed, abort, context) {
  const attempts = Infinity,
        description = DIRECTORY_PATH_DESCRIPTION,
        errorMessage = INVALID_DIRECTORY_PATH_MESSAGE,
        validationFunction = validateDirectoryPath,  ///
        options = {
          attempts,
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

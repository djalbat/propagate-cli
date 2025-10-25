"use strict";

import { shellUtilities } from "necessary";

import { validateDirectoryNumber } from "../../utilities/validate";
import { INVALID_DIRECTORY_NUMBER_MESSAGE } from "../../messages";
import { SPECIFY_DIRECTORY_TO_REMOVE_DESCRIPTION } from "../../descriptions";

const { prompt } = shellUtilities;

export default function removeDirectoryPromptOperation(proceed, abort, context) {
  const attempts = Infinity,
        description = SPECIFY_DIRECTORY_TO_REMOVE_DESCRIPTION,
        errorMessage = INVALID_DIRECTORY_NUMBER_MESSAGE,
        { directoryNumbers } = context,
        validationFunction = (directoryNumber) => {
          directoryNumber = Number(directoryNumber);  ///

          return validateDirectoryNumber(directoryNumber, directoryNumbers);
        },  ///
        options = {
          attempts,
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const directoryNumber = (answer !== null) ?
                              Number(answer) :
                                null,
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

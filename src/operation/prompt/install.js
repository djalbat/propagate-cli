"use strict";

import { shellUtilities } from "necessary";

import { YES } from "../../constants";
import { validateAnswer } from "../../utilities/validate";
import { isAnswerAffirmative } from "../../utilities/prompt";
import { INSTALL_YES_NO_DESCRIPTION } from "../../descriptions";
import { FAILED_INSTALL_MESSAGE, INVALID_ANSWER_MESSAGE } from "../../messages";

const { prompt } = shellUtilities;

export default function installPromptOperation(proceed, abort, context) {
  const { yes, diff, diffs, quietly } = context,
        answer = yes ?
                   YES :
                     null,
        attempts = Infinity,
        description = INSTALL_YES_NO_DESCRIPTION,
        errorMessage = INVALID_ANSWER_MESSAGE,
        validationFunction = validateAnswer,  ///
        options = {
          answer,
          attempts,
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const valid = (answer !== null);

    if (valid) {
      const affirmative = isAnswerAffirmative(answer);

      if (!affirmative) {
        proceed();

        return;
      }

      diff.install(quietly, (success) => {
        if (!success) {
          console.log(FAILED_INSTALL_MESSAGE);

          abort();

          return;
        }

        proceed();
      });

      return;
    }

    console.log(FAILED_INSTALL_MESSAGE);

    abort();
  });
}

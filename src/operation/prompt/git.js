"use strict";

import { shellUtilities } from "necessary";

import { YES } from "../../constants";
import { validateAnswer } from "../../utilities/validate";
import { isAnswerAffirmative } from "../../utilities/prompt";
import { ADD_COMMIT_PUSH_GIT_DESCRIPTION } from "../../descriptions";
import { FAILED_GIT_MESSAGE, INVALID_ANSWER_MESSAGE } from "../../messages";

const { prompt } = shellUtilities;

export default function gitPromptOperation(proceed, abort, context) {
  const { yes, diff, diffs, quietly } = context,
        answer = yes ?
                   YES :
                     null,
        attempts = Infinity,
        description = ADD_COMMIT_PUSH_GIT_DESCRIPTION,
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

      diff.git(quietly, (success) => {
        if (!success) {
          console.log(FAILED_GIT_MESSAGE);

          abort();

          return;
        }

        proceed();
      });

      return;
    }

    console.log(FAILED_GIT_MESSAGE);

    abort();
  });
}

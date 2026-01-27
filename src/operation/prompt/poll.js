"use strict";

import { shellUtilities } from "necessary";

import { YES } from "../../constants";
import { validateAnswer } from "../../utilities/validate";
import { isAnswerAffirmative } from "../../utilities/prompt";
import { POLL_YES_NO_DESCRIPTION } from "../../descriptions";
import { consoleLogUnpublishedDiffs } from "../../utilities/console";
import { FAILED_POLL_MESSAGE, INVALID_ANSWER_MESSAGE } from "../../messages";

const { prompt } = shellUtilities;

export default function pollPromptOperation(proceed, abort, context) {
  const { yes, diff, diffs, quietly } = context,
        answer = yes ?
                   YES :
                     null,
        attempts = Infinity,
        description = POLL_YES_NO_DESCRIPTION,
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

      diff.poll(quietly, (success) => {
        if (!success) {
          consoleLogUnpublishedDiffs(diff, diffs);

          console.log(FAILED_POLL_MESSAGE);

          abort();

          return;
        }

        proceed();
      });

      return;
    }

    consoleLogUnpublishedDiffs(diff, diffs);

    console.log(FAILED_POLL_MESSAGE);

    abort();
  });
}

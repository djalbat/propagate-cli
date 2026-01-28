"use strict";

import { shellUtilities } from "necessary";

import { YES } from "../../constants";
import { validateAnswer } from "../../utilities/validate";
import { isAnswerAffirmative } from "../../utilities/prompt";
import { SAVE_UPDATES_YES_NO_DESCRIPTION } from "../../descriptions";
import { removeDependencies, removeDevDependencies } from "../../utilities/propagate";
import { FAILED_SAVE_MESSAGE, INVALID_ANSWER_MESSAGE } from "../../messages";

const { prompt } = shellUtilities;

export default function savePromptOperation(proceed, abort, context) {
  const { yes, diff, diffs } = context,
        diffString = diff.asString();

  console.log(diffString);

  const answer = yes ?
                   YES :
                     null,
        attempts = Infinity,
        description = SAVE_UPDATES_YES_NO_DESCRIPTION,
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
        const { releaseMap, releaseGraph } = context;

        removeDependencies(diff, diffs, releaseMap, releaseGraph);

        removeDevDependencies(diff, diffs, releaseMap, releaseGraph);

        abort();

        return;
      }

      const success = diff.save();

      if (!success) {
        console.log(FAILED_SAVE_MESSAGE);

        abort();

        return;
      }

      proceed();

      return;
    }

    console.log(FAILED_SAVE_MESSAGE);

    abort();
  });
}

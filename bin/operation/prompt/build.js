"use strict";

const { shellUtilities } = require("necessary");

const { YES } = require("../../constants"),
      { validateAnswer } = require("../../utilities/validate"),
      { isAnswerAffirmative } = require("../../utilities/prompt"),
      { BUILD_YES_NO_DESCRIPTION } = require("../../descriptions"),
      { consoleLogUnpublishedDiffs } = require("../../utilities/console"),
      { FAILED_BUILD_MESSAGE, INVALID_ANSWER_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

function buildPromptOperation(proceed, abort, context) {
  const { yes, diff, diffs, quietly } = context,
        answer = yes ?
                   YES :
                     null,
        attempts = Infinity,
        description = BUILD_YES_NO_DESCRIPTION,
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

      diff.build(quietly, (success) => {
        if (!success) {
          consoleLogUnpublishedDiffs(diff, diffs);

          console.log(FAILED_BUILD_MESSAGE);

          abort();

          return;
        }

        proceed();
      });

      return;
    }

    consoleLogUnpublishedDiffs(diff, diffs);

    console.log(FAILED_BUILD_MESSAGE);

    abort();
  });
}

module.exports = buildPromptOperation;

"use strict";

const { shellUtilities } = require("necessary");

const { YES } = require("../../constants"),
      { validateAnswer } = require("../../utilities/validate"),
      { isAnswerAffirmative } = require("../../utilities/prompt"),
      { consoleLogUnpublishedDiffs } = require("../../utilities/console"),
      { ADD_COMMIT_PUSH_GIT_DESCRIPTION } = require("../../descriptions"),
      { FAILED_GIT_MESSAGE, INVALID_ANSWER_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

function gitPromptOperation(proceed, abort, context) {
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
          consoleLogUnpublishedDiffs(diff, diffs);

          console.log(FAILED_GIT_MESSAGE);

          abort();

          return;
        }

        proceed();
      });

      return;
    }

    consoleLogUnpublishedDiffs(diff, diffs);

    console.log(FAILED_GIT_MESSAGE);

    abort();
  });
}

module.exports = gitPromptOperation;

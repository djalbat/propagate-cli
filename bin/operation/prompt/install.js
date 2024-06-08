"use strict";

const { shellUtilities } = require("necessary");

const { YES } = require("../../constants"),
      { validateAnswer } = require("../../utilities/validate"),
      { isAnswerAffirmative } = require("../../utilities/prompt"),
      { INSTALL_YES_NO_DESCRIPTION } = require("../../descriptions"),
      { consoleLogUnpublishedDiffs } = require("../../utilities/console"),
      { FAILED_INSTALL_MESSAGE, INVALID_ANSWER_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

function installPromptOperation(proceed, abort, context) {
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
          consoleLogUnpublishedDiffs(diff, diffs);

          console.log(FAILED_INSTALL_MESSAGE);

          abort();

          return;
        }

        proceed();
      });

      return;
    }

    consoleLogUnpublishedDiffs(diff, diffs);

    console.log(FAILED_INSTALL_MESSAGE);

    abort();
  });
}

module.exports = installPromptOperation;

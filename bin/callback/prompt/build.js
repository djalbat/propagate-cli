"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      constants = require("../../constants"),
      promptUtilities = require("../../utilities/prompt"),
      consoleUtilities = require("../../utilities/console"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { YES } = constants,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { consoleLogUnpublishedDiffs } = consoleUtilities,
      { FAILED_BUILD_MESSAGE, INVALID_ANSWER_MESSAGE } = messages;

function buildPromptCallback(proceed, abort, context) {
  const { yes, diff, diffs, quietly } = context;

  const answer = yes ?
                   YES :
                     null,
        description = "Build? (y)es (n)o: ",
        errorMessage = INVALID_ANSWER_MESSAGE,
        validationFunction = validateAnswer,  ///
        options = {
          answer,
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

          process.exit(1);
        }

        proceed();
      });

      return;
    }

    consoleLogUnpublishedDiffs(diff, diffs);

    console.log(FAILED_BUILD_MESSAGE);

    process.exit(1);
  });
}

module.exports = buildPromptCallback;

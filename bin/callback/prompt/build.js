"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      constants = require("../../constants"),
      descriptions = require("../../descriptions"),
      diffsUtilities = require("../../utilities/diffs"),
      promptUtilities = require("../../utilities/prompt"),
      consoleUtilities = require("../../utilities/console"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { YES } = constants,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { BUILD_YES_NO_DESCRIPTION } = descriptions,
      { consoleLogUnpublishedDiffs } = consoleUtilities,
      { nextDiffsFromDiff, previousDiffsFromDiff } = diffsUtilities,
      { FAILED_BUILD_MESSAGE, INVALID_ANSWER_MESSAGE } = messages;

function buildPromptCallback(proceed, abort, context) {
  const { yes, diff, diffs, quietly } = context;

  const answer = yes ?
                   YES :
                     null,
        description = BUILD_YES_NO_DESCRIPTION,
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

    const nextDiffs = nextDiffsFromDiff(diff, diffs),
          previousDiffs = previousDiffsFromDiff(diff, diffs),
          unpublishedDiffs = [
            diff,
            ...nextDiffs
          ]

    consoleLogUnpublishedDiffs(unpublishedDiffs, previousDiffs);

    console.log(FAILED_BUILD_MESSAGE);

    process.exit(1);
  });
}

module.exports = buildPromptCallback;

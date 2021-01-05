"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      constants = require("../../constants"),
      descriptions = require("../../descriptions"),
      diffsUtilities = require("../../utilities/diffs"),
      promptUtilities = require("../../utilities/prompt"),
      consoleUtilities = require("../../utilities/console"),
      validateUtilities = require("../../utilities/validate"),
      propagateUtilities = require("../../utilities/propagate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { YES } = constants,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages,
      { consoleLogUnpublishedDiffs } = consoleUtilities,
      { SAVE_UPDATES_YES_NO_DESCRIPTION } = descriptions,
      { nextDiffsFromDiff, previousDiffsFromDiff } = diffsUtilities,
      { removeDependencies, removeDevDependencies } = propagateUtilities;

function savePromptCallback(proceed, abort, context) {
  const { yes, diff, diffs } = context,
        diffString = diff.asString();

  console.log(diffString);

  const answer = yes ?
                   YES :
                     null,
        description = SAVE_UPDATES_YES_NO_DESCRIPTION,
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

      if (affirmative) {
        diff.save();

        proceed();
      } else {
        const { releaseMap, releaseGraph } = context;

        removeDependencies(diff, diffs, releaseMap, releaseGraph);

        removeDevDependencies(diff, diffs, releaseMap, releaseGraph);

        abort();
      }

      return;
    }

    const nextDiffs = nextDiffsFromDiff(diff, diffs),
          previousDiffs = previousDiffsFromDiff(diff, diffs),
          unpublishedDiffs = [
            diff,
            ...nextDiffs
          ]

    consoleLogUnpublishedDiffs(unpublishedDiffs, previousDiffs);

    process.exit(1);
  });
}

module.exports = savePromptCallback;

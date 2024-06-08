"use strict";

const { shellUtilities } = require("necessary");

const { YES } = require("../../constants"),
      { validateAnswer } = require("../../utilities/validate"),
      { isAnswerAffirmative } = require("../../utilities/prompt"),
      { consoleLogUnpublishedDiffs } = require("../../utilities/console"),
      { SAVE_UPDATES_YES_NO_DESCRIPTION } = require("../../descriptions"),
      { removeDependencies, removeDevDependencies } = require("../../utilities/propagate"),
      { FAILED_SAVE_MESSAGE, INVALID_ANSWER_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

function savePromptOperation(proceed, abort, context) {
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
        consoleLogUnpublishedDiffs(diff, diffs);

        console.log(FAILED_SAVE_MESSAGE);

        abort();

        return;
      }

      proceed();

      return;
    }

    consoleLogUnpublishedDiffs(diff, diffs);

    console.log(FAILED_SAVE_MESSAGE);

    abort();
  });
}

module.exports = savePromptOperation;

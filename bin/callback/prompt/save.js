"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      constants = require("../../constants"),
      descriptions = require("../../descriptions"),
      promptUtilities = require("../../utilities/prompt"),
      consoleUtilities = require("../../utilities/console"),
      validateUtilities = require("../../utilities/validate"),
      propagateUtilities = require("../../utilities/propagate");

const { shellUtilities } = necessary,
      { prompt } = shellUtilities,
      { YES } = constants,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { consoleLogUnpublishedDiffs } = consoleUtilities,
      { SAVE_UPDATES_YES_NO_DESCRIPTION } = descriptions,
      { removeDependencies, removeDevDependencies } = propagateUtilities,
      { FAILED_SAVE_MESSAGE, INVALID_ANSWER_MESSAGE } = messages;

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
        const success = diff.save();

        if (!success) {
          consoleLogUnpublishedDiffs(diff, diffs);

          console.log(FAILED_SAVE_MESSAGE);

          process.exit(1);
        }

        proceed();
      } else {
        const { releaseMap, releaseGraph } = context;

        removeDependencies(diff, diffs, releaseMap, releaseGraph);

        removeDevDependencies(diff, diffs, releaseMap, releaseGraph);

        abort();
      }

      return;
    }

    consoleLogUnpublishedDiffs(diff, diffs);

    console.log(FAILED_SAVE_MESSAGE);

    process.exit(1);
  });
}

module.exports = savePromptCallback;

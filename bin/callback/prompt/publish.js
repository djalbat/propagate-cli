"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      constants = require("../../constants"),
      descriptions = require("../../descriptions"),
      promptUtilities = require("../../utilities/prompt"),
      consoleUtilities = require("../../utilities/console"),
      validateUtilities = require("../../utilities/validate"),
      propagateUtilities = require("../../utilities/propagate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { YES } = constants,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { PUBLISH_YES_NO_DESCRIPTION } = descriptions,
      { consoleLogUnpublishedDiffs } = consoleUtilities,
      { FAILED_PUBLISH_MESSAGE, INVALID_ANSWER_MESSAGE } = messages,
      { removeDependencies, removeDevDependencies } = propagateUtilities;

function publishPromptCallback(proceed, abort, context) {
  const { yes, diff, diffs, quietly } = context,
        publishable = diff.isPublishable();

  if (!publishable) {
    proceed();

    return;
  }

  const answer = yes ?
                   YES :
                     null,
        description = PUBLISH_YES_NO_DESCRIPTION,
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
        removeDependencies(diff, diffs);

        removeDevDependencies(diff, diffs);

        proceed();

        return;
      }

      diff.publish(quietly, (success) => {
        if (!success) {
          consoleLogUnpublishedDiffs(diff, diffs);

          console.log(FAILED_PUBLISH_MESSAGE);

          process.exit(1);
        }

        proceed();
      });

      return;
    }

    consoleLogUnpublishedDiffs(diff, diffs);

    console.log(FAILED_PUBLISH_MESSAGE);

    process.exit(1);
  });
}

module.exports = publishPromptCallback;

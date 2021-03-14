"use strict";

const { shellUtilities } = require("necessary");

const { YES } = require("../../constants"),
      { validateAnswer } = require("../../utilities/validate"),
      { isAnswerAffirmative } = require("../../utilities/prompt"),
      { PUBLISH_YES_NO_DESCRIPTION } = require("../../descriptions"),
      { consoleLogUnpublishedDiffs } = require("../../utilities/console"),
      { removeDependencies, removeDevDependencies } = require("../../utilities/propagate"),
      { FAILED_PUBLISH_MESSAGE, INVALID_ANSWER_MESSAGE } = require("../../messages");

const { prompt } = shellUtilities;

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
        const { releaseMap, releaseGraph } = context;

        removeDependencies(diff, diffs, releaseMap, releaseGraph);

        removeDevDependencies(diff, diffs, releaseMap, releaseGraph);

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

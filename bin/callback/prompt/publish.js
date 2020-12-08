"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      diffUtilities = require("../../utilities/diff"),
      promptUtilities = require("../../utilities/prompt"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { eliminateDiff } = diffUtilities,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { FAILED_PUBLISH_MESSAGE, INVALID_ANSWER_MESSAGE } = messages;

function publishAndOrPublishPromptCallback(proceed, abort, context) {
  const { diff, quietly, force } = context,
        publishable = diff.isPublishable();

  if (!publishable) {
    proceed();

    return;
  }

  if (force) {
    diff.publish(quietly, (success) => {
      if (!success) {
        console.log(FAILED_PUBLISH_MESSAGE);

        process.exit();
      }

      proceed();
    });

    return;
  }

  const description = "Publish? (y)es (n)o: ",
        errorMessage = INVALID_ANSWER_MESSAGE,
        validationFunction = validateAnswer,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const valid = (answer !== null);

    if (valid) {
      const affirmative = isAnswerAffirmative(answer);

      if (affirmative) {
        diff.publish(quietly, (success) => {
          if (!success) {
            console.log(FAILED_PUBLISH_MESSAGE);

            process.exit();
          }

          proceed();
        });
      } else {
        const { diffs } = context;

        eliminateDiff(diff, diffs);

        abort();
      }

      return;
    }

    process.exit();
  });
}

module.exports = publishAndOrPublishPromptCallback;

"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      constants = require("../../constants"),
      diffUtilities = require("../../utilities/diff"),
      promptUtilities = require("../../utilities/prompt"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { YES } = constants,
      { eliminateDiff } = diffUtilities,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { FAILED_PUBLISH_MESSAGE, INVALID_ANSWER_MESSAGE } = messages;

function publishPromptCallback(proceed, abort, context) {
  const { yes, diff, quietly } = context,
        publishable = diff.isPublishable();

  if (!publishable) {
    proceed();

    return;
  }

  const answer = yes ?
                   YES :
                     null,
        description = "Publish? (y)es (n)o: ",
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
        const { diffs } = context;

        eliminateDiff(diff, diffs);

        proceed();

        return;
      }

      diff.publish(quietly, (success) => {
        if (!success) {
          console.log(FAILED_PUBLISH_MESSAGE);

          process.exit();
        }

        proceed();
      });

      return;
    }

    process.exit();
  });
}

module.exports = publishPromptCallback;

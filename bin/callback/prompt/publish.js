"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      diffUtilities = require("../../utilities/diff"),
      promptUtilities = require("../../utilities/prompt"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { exit } = process,
      { prompt } = miscellaneousUtilities,
      { eliminateDiff } = diffUtilities,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages;

function publishAndOrPublishPromptCallback(proceed, abort, context) {
  const { diff, quietly, force } = context,
        publishable = diff.isPublishable();

  if (!publishable) {
    proceed();

    return;
  }

  if (force) {
    diff.publish(quietly);

    proceed();

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
        diff.publish(quietly);

        proceed();
      } else {
        const { diffs } = context;

        eliminateDiff(diff, diffs);

        abort();
      }

      return;
    }

    exit();
  });
}

module.exports = publishAndOrPublishPromptCallback;

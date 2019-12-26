'use strict';

const necessary = require('necessary');

const messages = require('../../messages'),
      promptUtilities = require('../../utilities/prompt'),
      validateUtilities = require('../../utilities/validate');

const { asynchronousUtilities, miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { forEach } = asynchronousUtilities,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages;

function publishPromptCallback(proceed, abort, context) {
  const { forced, quietly, diffs } = context,
        description = 'Publish package? (y)es (n)o: ',
        errorMessage = INVALID_ANSWER_MESSAGE,
        validationFunction = validateAnswer,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        },
        publishableDiffs = publishableDiffsFromDiffs(diffs);

  forEach(publishableDiffs, (publishableDiff, next) => {
    const diff = publishableDiff, ///
          subDirectoryPath = diff.getSubDirectoryPath();

    console.log(subDirectoryPath);

    if (forced) {
      diff.publish(quietly);

      next();

      return;
    }

    prompt(options, (answer) => {
      const valid = (answer !== null);

      if (valid) {
        const affirmative = isAnswerAffirmative(answer);

        if (affirmative) {
          diff.publish(quietly);
        }
      }

      next();
    });
  }, proceed);
}

module.exports = publishPromptCallback;

function publishableDiffsFromDiffs(diffs) {
  const publishableDiffs = [];

  diffs.forEach((diff) => {
    const publishable = diff.isPublishable();

    if (publishable) {
      const buildable = diff.isBuildable();

      if (!buildable) { ///
        const publishableDiff = diff; ///

        publishableDiffs.push(publishableDiff);
      }
    }
  });

  return publishableDiffs;
}

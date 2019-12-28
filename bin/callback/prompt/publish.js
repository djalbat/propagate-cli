'use strict';

const necessary = require('necessary');

const messages = require('../../messages'),
      promptUtilities = require('../../utilities/prompt'),
      validateUtilities = require('../../utilities/validate');

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
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

  const description = 'Publish? (y)es (n)o: ',
        errorMessage = INVALID_ANSWER_MESSAGE,
        initialValue = 'y',
        validationFunction = validateAnswer,  ///
        options = {
          description,
          errorMessage,
          initialValue,
          validationFunction
        };

  prompt(options, (answer) => {
    const valid = (answer !== null);

    if (valid) {
      const affirmative = isAnswerAffirmative(answer);

      if (affirmative) {
        diff.publish(quietly);
      }
    }

    proceed();
  });
}

module.exports = publishAndOrPublishPromptCallback;

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

function publishPromptCallback(proceed, abort, context) {
  const { forced, quietly, diffs } = context;

  if (forced) {
    publish(diffs, quietly);

    proceed();

    return;
  }

  const description = 'Publish packages? (y)es (n)o: ',
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
        publish(diffs, quietly);

        proceed();

        return;
      }
    }

    abort();
  });
}

module.exports = publishPromptCallback;

function publish(diffs, quietly) {
  diffs.forEach((diff) => {
    const publishable = diff.isPublishable();

    if (publishable) {
      const devDependenciesChanged = diff.haveDevDependenciesChanged();

      if (!devDependenciesChanged) {
        diff.publish(quietly);
      }
    }
  });
}

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

function gitPromptCallback(proceed, abort, context) {
  const { diffs, forced, quietly } = context,
        description = 'Push updates to Git? (y)es (n)o: ',
        errorMessage = INVALID_ANSWER_MESSAGE,
        validationFunction = validateAnswer,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  forEach(diffs, (diff, next) => {
    const subDirectoryPath = diff.getSubDirectoryPath();

    console.log(subDirectoryPath);

    if (forced) {
      diff.git(quietly);

      next();

      return;
    }

    prompt(options, (answer) => {
      const valid = (answer !== null);

      if (valid) {
        const affirmative = isAnswerAffirmative(answer);

        if (affirmative) {
          diff.git(quietly);
        }
      }

      next();
    });
  }, proceed);
}

module.exports = gitPromptCallback;

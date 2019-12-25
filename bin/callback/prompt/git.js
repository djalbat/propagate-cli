'use strict';

const necessary = require('necessary');

const messages = require('../../messages'),
      promptUtilities = require('../../utilities/prompt'),
      validateUtilities = require('../../utilities/validate');

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { GIT_MESSAGE, INVALID_ANSWER_MESSAGE } = messages;

function gitPromptCallback(proceed, abort, context) {
  const { forced, quietly, diffs } = context;

  if (forced) {
    git(diffs, quietly);

    proceed();

    return;
  }

  const description = 'Push changes to Git? (y)es (n)o: ',
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
        git(diffs, quietly);

        proceed();

        return;
      }
    }

    abort();
  });
}

module.exports = gitPromptCallback;

function git(diffs, quietly) {
  console.log(GIT_MESSAGE);

  diffs.forEach((diff) => diff.git(quietly));
}

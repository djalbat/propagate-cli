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

function applyDiffsPromptCallback(proceed, abort, context) {
  const { diffs, forced } = context;

  if (forced) {
    applyDiffs(diffs);

    proceed();

    return;
  }

  const description = 'Apply these differences? (y)es (n)o: ',
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
        applyDiffs(diffs);

        proceed();

        return;
      }
    }

    abort();
  });
}

module.exports = applyDiffsPromptCallback;

function applyDiffs(diffs) {
  diffs.forEach((diff) => diff.apply());
}

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

function buildAndOrPublishPromptCallback(proceed, abort, context) {
  const { diff, quietly, force } = context;

  if (force) {
    diff.build(quietly);

    proceed();

    return;
  }

  const description = 'Build? (y)es (n)o: ',
        errorMessage = INVALID_ANSWER_MESSAGE,
        buildable = diff.isBuildable(),
        initialValue = buildable ? 'y' : 'n',
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
        diff.build(quietly);
      }
    }

    proceed();
  });
}

module.exports = buildAndOrPublishPromptCallback;

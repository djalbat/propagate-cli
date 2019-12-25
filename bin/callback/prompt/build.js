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

function buildPromptCallback(proceed, abort, context) {
  const { forced, quietly, diffs, publishedNames } = context;

  const diffSubdirectoryPaths = diffs.map((diff) => diff.getSubDirectoryPath());

  const remainingDiffs = diffs.filter((diff) => {
    let keep = true;

    const name = diff.getName();

    if (name !== null) {
      const publishedNameIncludesName = publishedNames.includes(name);

      if (publishedNameIncludesName) {
        keep = false;
      }
    }

    return keep;
  });

  if (forced) {
    build(diffs, quietly);

    proceed();

    return;
  }

  const description = 'Build packages? (y)es (n)o: ',
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
        build(diffs, quietly);

        proceed();

        return;
      }
    }

    abort();
  });
}

module.exports = buildPromptCallback;

function build(diffs, quietly) {
  diffs.forEach((diff) => {
    ///
  });
}

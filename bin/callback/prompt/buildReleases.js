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

function buildReleasesPromptCallback(proceed, abort, context) {
  const { forced, quietly, releaseMap } = context;

  if (forced) {
    const releases = releaseMap.getReleases();

    buildReleases(releases, quietly);

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
        buildReleases(diffs);

        proceed();

        return;
      }
    }

    abort();
  });
}

module.exports = buildReleasesPromptCallback;

function buildReleases(releases, quietly) {
  debugger
}
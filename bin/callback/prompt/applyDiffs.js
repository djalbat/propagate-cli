'use strict';

const necessary = require('necessary');

const Diff = require('../../diff'),
      messages = require('../../messages'),
      promptUtilities = require('../../utilities/prompt'),
      validateUtilities = require('../../utilities/validate');

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages;

function applyDiffsPromptCallback(proceed, abort, context) {
  const { forced, quietly, release, releaseMap, dependencyGraph } = context,
        diffs = retrieveDiffs(release, releaseMap, dependencyGraph);

  if (!quietly) {
    logDiffs(diffs);
  }

  if (forced) {
    applyDiffs(diffs);

    proceed();

    return;
  }

  const description = 'Apply? (y)es (n)o: ',
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

function logDiffs(diffs) {
  diffs.forEach((diff) => {
    const diffString = diff.asString();

    if (diffString !== null) {
      console.log(diffString);
    }
  });
}

function applyDiffs(diffs) {
  diffs.forEach((diff) => diff.apply());
}

function retrieveDiffs(release, releaseMap, dependencyGraph, diffs = []) {
  const subDirectoryPath = release.getSubDirectoryPath();

  let diff = diffs.find((diff) => {
    const diffSubdirectoryPath = diff.getSubDirectoryPath();

    if (diffSubdirectoryPath === subDirectoryPath) {
      return true;
    }
  }) || null;

  if (diff === null) {
    diff = Diff.fromRelease(release);

    diffs.push(diff);

    const dependentReleases = dependencyGraph.retrieveDependentReleases(release, releaseMap);

    dependentReleases.forEach((dependentRelease) => {
      const release = dependentRelease; ///

      retrieveDiffs(release, releaseMap, dependencyGraph, diffs);
    });
  }

  return diffs;
}

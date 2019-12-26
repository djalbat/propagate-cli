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

function buildAndOrPublishPromptCallback(proceed, abort, context) {
  const { forced, quietly, diffs } = context,
        description = 'Build and/or publish binary or package? (y)es (n)o: ',
        errorMessage = INVALID_ANSWER_MESSAGE,
        validationFunction = validateAnswer,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        },
        buildableDiffs = buildableDiffsFromDiffs(diffs);

  forEach(buildableDiffs, (buildableDiff, next) => {
    const diff = buildableDiff, ///
          subDirectoryPath = diff.getSubDirectoryPath();

    console.log(subDirectoryPath);

    if (forced) {
      buildAndOrPublish(diff, quietly);

      next();

      return;
    }

    prompt(options, (answer) => {
      const valid = (answer !== null);

      if (valid) {
        const affirmative = isAnswerAffirmative(answer);

        if (affirmative) {
          buildAndOrPublish(diff, quietly);
        }
      }

      next();
    });
  }, proceed);
}

module.exports = buildAndOrPublishPromptCallback;

function buildAndOrPublish(diff, quietly) {
  diff.build(quietly);

  const publishable = diff.isPublishable();

  if (publishable) {
    diff.publish(quietly);
  }
}

function buildableDiffsFromDiffs(diffs) {
  const buildableDiffs = [];

  diffs.forEach((diff) => buildableDiffsFromDiff(diff, diffs, buildableDiffs));

  return buildableDiffs;
}

function buildableDiffsFromDiff(diff, diffs, buildableDiffs) {
  const buildable = diff.isBuildable();

  if (buildable) { ///
    const buildableDiff = diff, ///
          buildableDiffsIncludesBuildableDiff = buildableDiffs.includes(buildableDiff);

    if (!buildableDiffsIncludesBuildableDiff) {
      const predecessorDiffs = predecessorDiffsFromBuildableDiff(buildableDiff, diffs);

      predecessorDiffs.forEach((predecessorDiff) => {
        const diff = predecessorDiff; ///

        buildableDiffsFromDiff(diff, diffs, buildableDiffs);
      });

      buildableDiffs.push(buildableDiff);
    }
  }
}

function predecessorDiffsFromBuildableDiff(buildableDiff, diffs) {
  const predecessorDiffs = [],
        updatedDependencyNames = buildableDiff.getUpdatedDependencyNames(),
        updatedDevDependencyNames = buildableDiff.getUpdatedDevDependencyNames(),
        predecessorNames = [
          ...updatedDependencyNames,
          ...updatedDevDependencyNames
        ];

  diffs.forEach((diff) => {
    const name = diff.getName(),
          predecessorNamesIncludesName = predecessorNames.includes(name);

    if (predecessorNamesIncludesName) {
      const predecessorDiff = diff; ///

      predecessorDiffs.push(predecessorDiff);
    }
  });

  return predecessorDiffs;
}

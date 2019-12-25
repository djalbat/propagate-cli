'use strict';

const necessary = require('necessary');

const messages = require('../../messages'),
      promptUtilities = require('../../utilities/prompt'),
      validateUtilities = require('../../utilities/validate');

const { arrayUtilities, miscellaneousUtilities } = necessary,
      { prune } = arrayUtilities,
      { prompt } = miscellaneousUtilities,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { BUILD_THEN_PUBLISH_MESSAGE, INVALID_ANSWER_MESSAGE, RELEASE_NOT_BUILDABLE_MESSAGE } = messages;

function buildThenPublishPromptCallback(proceed, abort, context) {
  const { forced, quietly, diffs } = context;

  if (forced) {
    const success = buildThenPublish(diffs, quietly);

    success ?
      proceed() :
        abort();

    return;
  }

  const description = 'Build then publish packages? (y)es (n)o: ',
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
        const success = buildThenPublish(diffs, quietly);

        success ?
          proceed() :
            abort();

        return;
      }
    }

    abort();
  });
}

module.exports = buildThenPublishPromptCallback;

function buildThenPublish(diffs, quietly) {
  console.log(BUILD_THEN_PUBLISH_MESSAGE);

  const unbuiltDiffs = [],
        success = diffs.every((diff) => {
          const success = buildThenPublishDiff(diff, diffs, quietly, unbuiltDiffs);

          return success;
        });

  return success;
}

function buildThenPublishDiff(diff, diffs, quietly, unbuiltDiffs) {
  let success = true;

  const buildable = diff.isBuildable();

  if (buildable) {
    const built = diff.isBuilt();

    if (!built) {
      const unbuiltDiffsIncludesDiff = unbuiltDiffs.includes(diff);

      if (unbuiltDiffsIncludesDiff) {
        console.log(RELEASE_NOT_BUILDABLE_MESSAGE);

        success = false;
      } else {
        const unbuiltDiff = diff; ///

        unbuiltDiffs.push(unbuiltDiff);

        const changedDevDependencyNames = diff.getChangedDevDependencyNames(),
              changedDevDependencyDiffs = changedDevDependencyNames.map((changedDevDependencyName) => {
                const changedDevDependencyDiff = diffs.find((diff) => {
                  const name = diff.getName();

                  if (name === changedDevDependencyName) {
                    return true;
                  }
                });

                return changedDevDependencyDiff;
              });

        success = changedDevDependencyDiffs.every((changedDevDependencyDiff) => {
          const diff = changedDevDependencyDiff,  ///
                success = buildThenPublishDiff(diff, diffs, quietly, unbuiltDiffs);

          return success;
        });
      }

      if (success) {
        diff.build(quietly);

        const publishable = diff.isPublishable();

        if (publishable) {
          diff.publish(quietly);
        }

        prune(unbuiltDiffs, (unbuiltDiff) => {
          if (unbuiltDiff !== diff) {
            return true;
          }
        });
      }
    }
  }

  return success;
}

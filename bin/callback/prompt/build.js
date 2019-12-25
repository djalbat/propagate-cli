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
      { BUILDING_MESSAGE, INVALID_ANSWER_MESSAGE, RELEASE_NOT_BUILDABLE_MESSAGE } = messages;

function buildPromptCallback(proceed, abort, context) {
  const { forced, quietly, diffs } = context;

  if (forced) {
    const success = build(diffs, quietly);

    success ?
      proceed() :
        abort();

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
        const success = build(diffs, quietly);

        success ?
          proceed() :
            abort();

        return;
      }
    }

    abort();
  });
}

module.exports = buildPromptCallback;

function build(diffs, quietly) {
  console.log(BUILDING_MESSAGE);

  const unbuiltDiffs = [],
        success = diffs.every((diff) => {
          const success = buildDiff(diff, diffs, quietly, unbuiltDiffs);

          return success;
        });

  return success;
}

function buildDiff(diff, diffs, quietly, unbuiltDiffs) {
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
                success = buildDiff(diff, diffs, quietly, unbuiltDiffs);

          return success;
        });
      }

      if (success) {
        diff.build(quietly);

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

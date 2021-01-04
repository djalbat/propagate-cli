"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      constants = require("../../constants"),
      promptUtilities = require("../../utilities/prompt"),
      consoleUtilities = require("../../utilities/console"),
      validateUtilities = require("../../utilities/validate"),
      propagateUtilities = require("../../utilities/propagate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { YES } = constants,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages,
      { consoleLogUnpublishedDiffs } = consoleUtilities,
      { removeDependencies, removeDevDependencies } = propagateUtilities;

function savePromptCallback(proceed, abort, context) {
  const { yes, diff, diffs } = context,
        diffString = diff.asString();

  console.log(diffString);

  const answer = yes ?
                   ((diffs.indexOf(diff) === 1) ? "no" : YES) :// YES :
                     null,
        description = "Save updates? (y)es (n)o: ",
        errorMessage = INVALID_ANSWER_MESSAGE,
        validationFunction = validateAnswer,  ///
        options = {
          answer,
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const valid = (answer !== null);

    if (valid) {
      const affirmative = isAnswerAffirmative(answer);

      if (affirmative) {
        diff.save();

        proceed();
      } else {
        const { releaseMap, releaseGraph } = context;

        removeDevDependencies(diff, diffs, releaseMap, releaseGraph);

        removeDependencies(diff, diffs, releaseMap, releaseGraph);

        abort();
      }

      return;
    }

    consoleLogUnpublishedDiffs(diff, diffs);

    process.exit(1);
  });
}

module.exports = savePromptCallback;

"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      constants = require("../../constants"),
      diffUtilities = require("../../utilities/diff"),
      promptUtilities = require("../../utilities/prompt"),
      consoleUtilities = require("../../utilities/console"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { YES } = constants,
      { eliminateDiff } = diffUtilities,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages,
      { consoleLogUnpublishedDiffs } = consoleUtilities;

function savePromptCallback(proceed, abort, context) {
  const { yes, diff, diffs } = context,
        diffString = diff.asString();

  console.log(diffString);

  const answer = yes ?
                   YES :
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
        const { diffs } = context;

        // eliminateDiff(diff, diffs);

        abort();
      }

      return;
    }

    consoleLogUnpublishedDiffs(diff, diffs);

    process.exit(1);
  });
}

module.exports = savePromptCallback;

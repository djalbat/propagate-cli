"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      diffUtilities = require("../../utilities/diff"),
      promptUtilities = require("../../utilities/prompt"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { eliminateDiff } = diffUtilities,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages;

function savePromptCallback(proceed, abort, context) {
  const { diff, force } = context,
        diffString = diff.asString();

  console.log(diffString);

  const answer = force ?
                   "yes" :
                     undefined,
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

        eliminateDiff(diff, diffs);

        abort();
      }

      return;
    }

    process.exit();
  });
}

module.exports = savePromptCallback;

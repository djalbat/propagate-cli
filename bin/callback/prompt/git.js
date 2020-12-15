"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      promptUtilities = require("../../utilities/prompt"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { FAILED_GIT_MESSAGE, INVALID_ANSWER_MESSAGE } = messages;

function gitPromptCallback(proceed, abort, context) {
  const { diff, quietly, force } = context;

  if (force) {
    diff.git(quietly, (success) => {
      if (!success) {
        console.log(FAILED_GIT_MESSAGE);

        process.exit();
      }

      proceed();
    });

    return;
  }

  const answer = "yes",
        description = "Add, commit and push with Git? (y)es (n)o: ",
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

      if (!affirmative) {
        proceed();

        return;
      }

      diff.git(quietly, (success) => {
        if (!success) {
          console.log(FAILED_GIT_MESSAGE);

          process.exit();
        }

        proceed();
      });

      return;
    }

    process.exit();
  });
}

module.exports = gitPromptCallback;

"use strict";

const necessary = require("necessary");

const messages = require("../../messages"),
      constants = require("../../constants"),
      promptUtilities = require("../../utilities/prompt"),
      validateUtilities = require("../../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { YES } = constants,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { FAILED_BUILD_MESSAGE, INVALID_ANSWER_MESSAGE } = messages;

function buildPromptCallback(proceed, abort, context) {
  const { yes, diff, quietly } = context;

  const answer = yes ?
                   YES :
                     null,
        description = "Build? (y)es (n)o: ",
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

      diff.build(quietly, (success) => {
        if (!success) {
          console.log(FAILED_BUILD_MESSAGE);

          process.exit();
        }

        proceed();
      });

      return;
    }

    process.exit();
  });
}

module.exports = buildPromptCallback;

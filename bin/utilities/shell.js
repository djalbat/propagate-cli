"use strict";

const necessary = require("necessary"),
      childProcess = require("child_process");

const messages = require("../messages"),
      constants = require("../constants"),
      promptUtilities = require("../utilities/prompt"),
      validateUtilities = require("../utilities/validate");

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { UTF8 } = constants,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages;

function execute(shellCommands, quietly, callback) {
  const success = execSync(shellCommands, quietly);

  if (success) {
    callback(success);

    return;
  }

  const description = "The script has failed. Would you like to try again? (y)es (n)o: ",
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
      const affirmative = isAnswerAffirmative(answer),
            success = affirmative ?
                        execSync(shellCommands, quietly) :
                          true; ///

      callback(success);

      return;
    }

    process.exit();
  });
}

module.exports = {
  execute
};

function execSync(shellCommands, quietly) {
  let success;

  try {
    const encoding = UTF8,  ///
          options = {
            encoding
          },
          output = childProcess.execSync(shellCommands, options);

    if (!quietly) {
      process.stdout.write(output);
    }

    success = true;
  } catch (error) {
    success = false;
  }

  return success;
}

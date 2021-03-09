"use strict";

const necessary = require("necessary"),
      childProcess = require("child_process");

const messages = require("../messages"),
      constants = require("../constants"),
      descriptions = require("../descriptions"),
      promptUtilities = require("../utilities/prompt"),
      validateUtilities = require("../utilities/validate");

const { shellUtilities } = necessary,
      { prompt } = shellUtilities,
      { UTF8 } = constants,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages,
      { FAILED_SCRIPT_DESCRIPTION } = descriptions;

function execute(shellCommands, quietly, callback) {
  const success = execSync(shellCommands, quietly);

  if (success) {
    callback(success);

    return;
  }

  const description = FAILED_SCRIPT_DESCRIPTION,
        errorMessage = INVALID_ANSWER_MESSAGE,
        validationFunction = validateAnswer,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    let success;

    const valid = (answer !== null);

    if (valid) {
      const affirmative = isAnswerAffirmative(answer);

      success = affirmative ?
                  execSync(shellCommands, quietly) :
                    true; ///
    } else {
      success = false;
    }

    callback(success);
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

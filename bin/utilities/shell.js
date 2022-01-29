"use strict";

const childProcess = require("child_process");

const { encodings, shellUtilities } = require("necessary");

const { validateAnswer } = require("../utilities/validate"),
      { isAnswerAffirmative } = require("../utilities/prompt"),
      { INVALID_ANSWER_MESSAGE } = require("../messages"),
      { FAILED_SCRIPT_DESCRIPTION } = require("../descriptions");

const { prompt } = shellUtilities,
      { UTF_8_ENCODING } = encodings;

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
    const encoding = UTF_8_ENCODING,  ///
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

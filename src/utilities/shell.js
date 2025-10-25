"use strict";

import childProcess from "child_process";

import { encodings, shellUtilities } from "necessary";

import { validateAnswer } from "../utilities/validate";
import { isAnswerAffirmative } from "../utilities/prompt";
import { INVALID_ANSWER_MESSAGE } from "../messages";
import { FAILED_SCRIPT_DESCRIPTION } from "../descriptions";

const { prompt } = shellUtilities,
      { UTF_8_ENCODING } = encodings;

export function execute(shellCommands, quietly, callback) {
  const success = execSync(shellCommands, quietly);

  if (success) {
    callback(success);

    return;
  }

  const attempts = Infinity,
        description = FAILED_SCRIPT_DESCRIPTION,
        errorMessage = INVALID_ANSWER_MESSAGE,
        validationFunction = validateAnswer,  ///
        options = {
          attempts,
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

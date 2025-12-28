"use strict";

import childProcess from "child_process";

import { encodings, shellUtilities, asynchronousUtilities } from "necessary";

import { validateAnswer } from "../utilities/validate";
import { isAnswerAffirmative } from "../utilities/prompt";
import { INVALID_ANSWER_MESSAGE } from "../messages";
import { FAILED_SCRIPT_DESCRIPTION } from "../descriptions";
import { REPEATED_DELAY, PROMPT_ATTEMPTS, REPEATED_ATTEMPTS } from "../constants";

const { prompt } = shellUtilities,
      { whilst } = asynchronousUtilities,
      { UTF_8_ENCODING } = encodings;

export function executePromptly(shellCommands, quietly, callback) {
  const success = execSync(shellCommands, quietly);

  if (success) {
    callback(success);

    return;
  }

  const attempts = PROMPT_ATTEMPTS,
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

export function executeRepeatedly(shellCommands, quietly, callback) {
  let success = false;

  const delay = REPEATED_DELAY,
        attempts = REPEATED_ATTEMPTS,
        operation = (next, done, context, index) => {
          if (index === attempts) {
            done();

            return;
          }

          execAsync(shellCommands, quietly, (error, output) => {
            if (!error) {
              success = true;

              done();

              return;
            }

            setTimeout(next, delay);
          });
        };

  whilst(operation, () => {
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

function execAsync(shellCommands, quietly, callback) {
  const encoding = UTF_8_ENCODING,  ///
        options = {
          encoding
        };

  childProcess.exec(shellCommands, options, (error, stdout, stderr) => {
    const output = error ?
                     stderr :
                       stdout;

    if (!quietly) {
      process.stdout.write(output);
    }

    callback(error, output)
  });
}

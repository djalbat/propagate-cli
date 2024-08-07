"use strict";

const { shellUtilities } = require("necessary");

const { EMPTY_STRING } = require("../../constants"),
      { validateShellCommands } = require("../../utilities/validate"),
      { DEFAULT_BUILD_SHELL_COMMANDS } = require("../../defaults"),
      { BUILD_SHELL_COMMANDS_DESCRIPTION } = require("../../descriptions");

const { prompt } = shellUtilities;

function setBuildShellCommandsPromptOperation(proceed, abort, context) {
  const { shellCommands } = context,
        { build } = shellCommands,
        buildShellCommands = build, ///
        attempts = Infinity,
        description = BUILD_SHELL_COMMANDS_DESCRIPTION,
        initialAnswer = buildShellCommands, //
        validationFunction = validateShellCommands,  ///
        options = {
          attempts,
          description,
          initialAnswer,
          validationFunction
        };

  prompt(options, (answer) => {
    const buildShellCommands = answer,  ///
          build = (buildShellCommands !== EMPTY_STRING) ?
                    buildShellCommands :
                      DEFAULT_BUILD_SHELL_COMMANDS;

    Object.assign(shellCommands, {
      build
    });

    proceed();
  });
}

module.exports = setBuildShellCommandsPromptOperation;

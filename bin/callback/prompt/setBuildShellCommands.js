"use strict";

const necessary = require("necessary");

const constants = require("../../constants"),
      validateUtilities = require("../../utilities/validate");

const { validateShellCommands } = validateUtilities,
      { DEFAULT_BUILD_SHELL_COMMANDS } = constants;

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities;

function setBuildShellCommandsPromptCallback(proceed, abort, context) {
  const { shellCommands } = context,
        { build } = shellCommands,
        buildShellCommands = build, ///
        initialAnswer = buildShellCommands, //
        validationFunction = validateShellCommands,  ///
        description = "Build shell commands (leave blank for default): ",
        options = {
          description,
          initialAnswer,
          validationFunction
        };

  prompt(options, (answer) => {
    const buildShellCommands = answer,  ///
          build = (buildShellCommands !== "") ?
                    buildShellCommands :
                      DEFAULT_BUILD_SHELL_COMMANDS;

    Object.assign(shellCommands, {
      build
    });

    proceed();
  });
}

module.exports = setBuildShellCommandsPromptCallback;

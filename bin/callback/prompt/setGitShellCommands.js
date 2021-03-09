"use strict";

const necessary = require("necessary");

const constants = require("../../constants"),
      descriptions = require("../../descriptions"),
      validateUtilities = require("../../utilities/validate");

const { validateShellCommands } = validateUtilities,
      { DEFAULT_GIT_SHELL_COMMANDS } = constants,
      { GIT_SHELL_COMMANDS_DESCRIPTION } = descriptions;

const { shellUtilities } = necessary,
      { prompt } = shellUtilities;

function setGitShellCommandsPromptCallback(proceed, abort, context) {
  const { shellCommands } = context,
        { git } = shellCommands,
        gitShellCommands = git, ///
        initialAnswer = gitShellCommands, ///
        validationFunction = validateShellCommands,  ///
        description = GIT_SHELL_COMMANDS_DESCRIPTION,
        options = {
          description,
          initialAnswer,
          validationFunction
        };

  prompt(options, (answer) => {
    const gitShellCommands = answer,  ///
          git = (gitShellCommands !== "") ?
                  gitShellCommands :
                    DEFAULT_GIT_SHELL_COMMANDS;

    Object.assign(shellCommands, {
      git
    });

    proceed();
  });
}

module.exports = setGitShellCommandsPromptCallback;

"use strict";

const { shellUtilities } = require("necessary");

const { EMPTY_STRING } = require("../../constants"),
      { validateShellCommands } = require("../../utilities/validate"),
      { DEFAULT_GIT_SHELL_COMMANDS } = require("../../defaults"),
      { GIT_SHELL_COMMANDS_DESCRIPTION } = require("../../descriptions");

const { prompt } = shellUtilities;

function setGitShellCommandsPromptOperation(proceed, abort, context) {
  const { shellCommands } = context,
        { git } = shellCommands,
        gitShellCommands = git, ///
        attempts = Infinity,
        description = GIT_SHELL_COMMANDS_DESCRIPTION,
        initialAnswer = gitShellCommands, ///
        validationFunction = validateShellCommands,  ///
        options = {
          attempts,
          description,
          initialAnswer,
          validationFunction
        };

  prompt(options, (answer) => {
    const gitShellCommands = answer,  ///
          git = (gitShellCommands !== EMPTY_STRING) ?
                  gitShellCommands :
                    DEFAULT_GIT_SHELL_COMMANDS;

    Object.assign(shellCommands, {
      git
    });

    proceed();
  });
}

module.exports = setGitShellCommandsPromptOperation;

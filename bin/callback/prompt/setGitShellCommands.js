"use strict";

const { shellUtilities } = require("necessary");

const { validateShellCommands } = require("../../utilities/validate"),
      { DEFAULT_GIT_SHELL_COMMANDS } = require("../../defaults"),
      { GIT_SHELL_COMMANDS_DESCRIPTION } = require("../../descriptions");

const { prompt } = shellUtilities;

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

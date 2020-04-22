"use strict";

const necessary = require("necessary");

const constants = require("../../constants"),
      validateUtilities = require("../../utilities/validate");

const { validateShellCommands } = validateUtilities,
      { DEFAULT_GIT_SHELL_COMMANDS } = constants;

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities;

function setGitShellCommandsPromptCallback(proceed, abort, context) {
  const { shellCommands } = context,
        { git } = shellCommands,
        gitShellCommands = git, ///
        initialValue = gitShellCommands, ///
        validationFunction = validateShellCommands,  ///
        description = "Git shell commands (leave blank for default): ",
        options = {
          description,
          initialValue,
          validationFunction
        };

  prompt(options, (gitShellCommands) => {
    const git = (gitShellCommands !== "") ?
                  gitShellCommands :
                    DEFAULT_GIT_SHELL_COMMANDS;

    Object.assign(shellCommands, {
      git
    });

    proceed();
  });
}

module.exports = setGitShellCommandsPromptCallback;

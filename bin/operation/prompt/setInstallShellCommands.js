"use strict";

const { shellUtilities } = require("necessary");

const { EMPTY_STRING } = require("../../constants"),
      { validateShellCommands } = require("../../utilities/validate"),
      { DEFAULT_INSTALL_SHELL_COMMANDS } = require("../../defaults"),
      { INSTALL_SHELL_COMMANDS_DESCRIPTION } = require("../../descriptions");

const { prompt } = shellUtilities;

function setInstallShellCommandsPromptOperation(proceed, abort, context) {
  const { shellCommands } = context,
        { install } = shellCommands,
        installShellCommands = install, ///
        initialAnswer = installShellCommands, //
        validationFunction = validateShellCommands,  ///
        description = INSTALL_SHELL_COMMANDS_DESCRIPTION,
        options = {
          description,
          initialAnswer,
          validationFunction
        };

  prompt(options, (answer) => {
    const installShellCommands = answer,  ///
          install = (installShellCommands !== EMPTY_STRING) ?
                      installShellCommands :
                        DEFAULT_INSTALL_SHELL_COMMANDS;

    Object.assign(shellCommands, {
      install
    });

    proceed();
  });
}

module.exports = setInstallShellCommandsPromptOperation;

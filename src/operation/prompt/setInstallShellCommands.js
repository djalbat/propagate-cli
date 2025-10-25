"use strict";

import { shellUtilities } from "necessary";

import { EMPTY_STRING } from "../../constants";
import { validateShellCommands } from "../../utilities/validate";
import { DEFAULT_INSTALL_SHELL_COMMANDS } from "../../defaults";
import { INSTALL_SHELL_COMMANDS_DESCRIPTION } from "../../descriptions";

const { prompt } = shellUtilities;

export default function setInstallShellCommandsPromptOperation(proceed, abort, context) {
  const { shellCommands } = context,
        { install } = shellCommands,
        installShellCommands = install, ///
        attempts = Infinity,
        description = INSTALL_SHELL_COMMANDS_DESCRIPTION,
        initialAnswer = installShellCommands, //
        validationFunction = validateShellCommands,  ///
        options = {
          attempts,
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

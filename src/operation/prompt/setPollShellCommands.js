"use strict";

import { shellUtilities } from "necessary";

import { EMPTY_STRING } from "../../constants";
import { validateShellCommands } from "../../utilities/validate";
import { DEFAULT_POLL_SHELL_COMMANDS } from "../../defaults";
import { POLL_SHELL_COMMANDS_DESCRIPTION } from "../../descriptions";

const { prompt } = shellUtilities;

export default function setPollShellCommandsPromptOperation(proceed, abort, context) {
  const { shellCommands } = context,
        { poll } = shellCommands,
        pollShellCommands = poll, ///
        attempts = Infinity,
        description = POLL_SHELL_COMMANDS_DESCRIPTION,
        initialAnswer = pollShellCommands, ///
        validationFunction = validateShellCommands,  ///
        options = {
          attempts,
          description,
          initialAnswer,
          validationFunction
        };

  prompt(options, (answer) => {
    const pollShellCommands = answer,  ///
          poll = (pollShellCommands !== EMPTY_STRING) ?
                   pollShellCommands :
                     DEFAULT_POLL_SHELL_COMMANDS;

    Object.assign(shellCommands, {
      poll
    });

    proceed();
  });
}

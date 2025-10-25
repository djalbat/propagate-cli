"use strict";

import { shellUtilities } from "necessary";

import { EMPTY_STRING } from "../../constants";
import { validateShellCommands } from "../../utilities/validate";
import { DEFAULT_GIT_SHELL_COMMANDS } from "../../defaults";
import { GIT_SHELL_COMMANDS_DESCRIPTION } from "../../descriptions";

const { prompt } = shellUtilities;

export default function setGitShellCommandsPromptOperation(proceed, abort, context) {
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

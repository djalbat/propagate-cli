"use strict";

import { shellUtilities } from "necessary";

import { EMPTY_STRING } from "../../constants";
import { validateShellCommands } from "../../utilities/validate";
import { DEFAULT_BUILD_SHELL_COMMANDS } from "../../defaults";
import { BUILD_SHELL_COMMANDS_DESCRIPTION } from "../../descriptions";

const { prompt } = shellUtilities;

export default function setBuildShellCommandsPromptOperation(proceed, abort, context) {
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

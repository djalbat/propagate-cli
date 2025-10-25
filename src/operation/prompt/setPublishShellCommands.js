"use strict";

import { shellUtilities } from "necessary";

import { EMPTY_STRING } from "../../constants";
import { validateShellCommands } from "../../utilities/validate";
import { DEFAULT_PUBLISH_SHELL_COMMANDS } from "../../defaults";
import { PUBLISH_SHELL_COMMANDS_DESCRIPTION } from "../../descriptions";

const { prompt } = shellUtilities;

export default function setPublishShellCommandsPromptOperation(proceed, abort, context) {
  const { shellCommands } = context,
        { publish } = shellCommands,
        publishShellCommands = publish, ///
        attempts = Infinity,
        description = PUBLISH_SHELL_COMMANDS_DESCRIPTION,
        initialAnswer = publishShellCommands, ///
        validationFunction = validateShellCommands,  ///
        options = {
          attempts,
          description,
          initialAnswer,
          validationFunction
        };

  prompt(options, (answer) => {
    const publishShellCommands = answer,  ///
          publish = (publishShellCommands !== EMPTY_STRING) ?
                      publishShellCommands :
                        DEFAULT_PUBLISH_SHELL_COMMANDS;

    Object.assign(shellCommands, {
      publish
    });

    proceed();
  });
}

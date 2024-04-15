"use strict";

const { shellUtilities } = require("necessary");

const { EMPTY_STRING } = require("../../constants"),
      { validateShellCommands } = require("../../utilities/validate"),
      { DEFAULT_PUBLISH_SHELL_COMMANDS } = require("../../defaults"),
      { PUBLISH_SHELL_COMMANDS_DESCRIPTION } = require("../../descriptions");

const { prompt } = shellUtilities;

function setPublishShellCommandsPromptOperation(proceed, abort, context) {
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

module.exports = setPublishShellCommandsPromptOperation;

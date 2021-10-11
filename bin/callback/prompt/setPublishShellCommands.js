"use strict";

const { shellUtilities } = require("necessary");

const { EMPTY_STRING } = require("../../constants"),
      { validateShellCommands } = require("../../utilities/validate"),
      { DEFAULT_PUBLISH_SHELL_COMMANDS } = require("../../defaults"),
      { PUBLISH_SHELL_COMMANDS_DESCRIPTION } = require("../../descriptions");

const { prompt } = shellUtilities;

function setPublishShellCommandsPromptCallback(proceed, abort, context) {
  const { shellCommands } = context,
        { publish } = shellCommands,
        publishShellCommands = publish, ///
        initialAnswer = publishShellCommands, ///
        validationFunction = validateShellCommands,  ///
        description = PUBLISH_SHELL_COMMANDS_DESCRIPTION,
        options = {
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

module.exports = setPublishShellCommandsPromptCallback;

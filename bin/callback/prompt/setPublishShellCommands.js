"use strict";

const necessary = require("necessary");

const constants = require("../../constants"),
      descriptions = require("../../descriptions"),
      validateUtilities = require("../../utilities/validate");

const { validateShellCommands } = validateUtilities,
      { DEFAULT_PUBLISH_SHELL_COMMANDS } = constants,
      { PUBLISH_SHELL_COMMANDS_DESCRIPTION } = descriptions;

const { shellUtilities } = necessary,
      { prompt } = shellUtilities;

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
          publish = (publishShellCommands !== "") ?
                      publishShellCommands :
                        DEFAULT_PUBLISH_SHELL_COMMANDS;

    Object.assign(shellCommands, {
      publish
    });

    proceed();
  });
}

module.exports = setPublishShellCommandsPromptCallback;

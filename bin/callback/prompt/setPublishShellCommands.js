'use strict';

const necessary = require('necessary');

const constants = require('../../constants'),
      validateUtilities = require('../../utilities/validate');

const { validateShellCommands } = validateUtilities,
      { DEFAULT_PUBLISH_SHELL_COMMANDS } = constants;

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities;

function setPublishShellCommandsPromptCallback(proceed, abort, context) {
  const { shellCommands } = context,
        { publish } = shellCommands,
        initialValue = publish, ///
        validationFunction = validateShellCommands,  ///
        description = 'Publish shell commands (leave blank for default): ',
        options = {
          description,
          initialValue,
          validationFunction
        };

  prompt(options, (publish) => {
    publish = publish || DEFAULT_PUBLISH_SHELL_COMMANDS; ///

    Object.assign(shellCommands, {
      publish
    });

    proceed();
  });
}

module.exports = setPublishShellCommandsPromptCallback;

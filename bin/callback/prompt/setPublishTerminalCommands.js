'use strict';

const necessary = require('necessary');

const constants = require('../../constants'),
      validateUtilities = require('../../utilities/validate');

const { validateTerminalCommands } = validateUtilities,
      { DEFAULT_PUBLISH_TERMINAL_COMMANDS } = constants;

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities;

function setPublishTerminalCommandsPromptCallback(proceed, abort, context) {
  const { terminalCommands } = context,
        { publish } = terminalCommands,
        initialValue = publish, ///
        validationFunction = validateTerminalCommands,  ///
        description = 'Publish terminal commands (leave blank for default): ',
        options = {
          description,
          initialValue,
          validationFunction
        };

  prompt(options, (publish) => {
    publish = publish || DEFAULT_PUBLISH_TERMINAL_COMMANDS; ///

    Object.assign(terminalCommands, {
      publish
    });

    proceed();
  });
}

module.exports = setPublishTerminalCommandsPromptCallback;

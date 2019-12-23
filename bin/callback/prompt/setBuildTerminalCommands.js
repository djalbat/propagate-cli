'use strict';

const necessary = require('necessary');

const constants = require('../../constants'),
      validateUtilities = require('../../utilities/validate');

const { validateTerminalCommands } = validateUtilities,
      { DEFAULT_BUILD_TERMINAL_COMMANDS } = constants;

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities;

function setBuildTerminalCommandsPromptCallback(proceed, abort, context) {
  const { terminalCommands } = context,
        { build } = terminalCommands,
        initialValue = build, //
        validationFunction = validateTerminalCommands,  ///
        description = 'Build terminal commands (leave blank for default): ',
        options = {
          description,
          initialValue,
          validationFunction
        };

  prompt(options, (build) => {
    build = build || DEFAULT_BUILD_TERMINAL_COMMANDS; ///

    Object.assign(terminalCommands, {
      build
    });

    proceed();
  });
}

module.exports = setBuildTerminalCommandsPromptCallback;

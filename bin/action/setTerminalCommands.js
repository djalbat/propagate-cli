'use strict';

const messages = require('../messages'),
      configuration = require('../configuration'),
      callbackUtilities = require('../utilities/callback');

const { exit } = process,
      { executeCallbacks } = callbackUtilities,
      { defaultTerminalCommands, retrieveTerminalCommands, updateTerminalCommands } = configuration,
      { DEFAULT_TERMINAL_COMMANDS_MESSAGE,
        CURRENT_TERMINAL_COMMANDS_MESSAGE,
        FAILED_SET_TERMINAL_COMMANDS_MESSAGE,
        SUCCESSFUL_SET_TERMINAL_COMMANDS_MESSAGE } = messages;

function setTerminalCommands(quietly) {
  const callbacks = [
          ///
        ],
        terminalCommands = retrieveTerminalCommands(),
        context = {};

  if (!quietly) {
    console.log(DEFAULT_TERMINAL_COMMANDS_MESSAGE);

    logTerminalCommands(defaultTerminalCommands);

    console.log(CURRENT_TERMINAL_COMMANDS_MESSAGE);

    logTerminalCommands(terminalCommands);
  }

  executeCallbacks(callbacks, (completed) => {
    if (!completed) {
      console.log(FAILED_SET_TERMINAL_COMMANDS_MESSAGE);

      exit();
    }

    const { terminalCommands } = context;

    updateTerminalCommands(terminalCommands);

    console.log(SUCCESSFUL_SET_TERMINAL_COMMANDS_MESSAGE);
  }, context);
}

module.exports = setTerminalCommands;

function logTerminalCommands(terminalCommands) {
  console.log('');

  console.log(terminalCommands);

  console.log('');
}

'use strict';

const messages = require('../messages'),
      configuration = require('../configuration'),
      callbackUtilities = require('../utilities/callback'),
      setGitTerminalCommandsPromptCallback = require('../callback/prompt/setGitTerminalCommands'),
      setBuildTerminalCommandsPromptCallback = require('../callback/prompt/setBuildTerminalCommands'),
      setPublishTerminalCommandsPromptCallback = require('../callback/prompt/setPublishTerminalCommands');

const { exit } = process,
      { executeCallbacks } = callbackUtilities,
      { retrieveTerminalCommands, updateTerminalCommands } = configuration,
      { FAILED_SET_TERMINAL_COMMANDS_MESSAGE, SUCCESSFUL_SET_TERMINAL_COMMANDS_MESSAGE } = messages;

function setTerminalCommands() {
  const callbacks = [
          setBuildTerminalCommandsPromptCallback,
          setGitTerminalCommandsPromptCallback,
          setPublishTerminalCommandsPromptCallback
        ],
        terminalCommands = retrieveTerminalCommands(),
        context = {
          terminalCommands
        };

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

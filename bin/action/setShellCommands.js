'use strict';

const messages = require('../messages'),
      configuration = require('../configuration'),
      callbackUtilities = require('../utilities/callback'),
      setGitShellCommandsPromptCallback = require('../callback/prompt/setGitShellCommands'),
      setBuildShellCommandsPromptCallback = require('../callback/prompt/setBuildShellCommands'),
      setPublishShellCommandsPromptCallback = require('../callback/prompt/setPublishShellCommands');

const { exit } = process,
      { executeCallbacks } = callbackUtilities,
      { retrieveShellCommands, updateShellCommands } = configuration,
      { FAILED_SET_SHELL_COMMANDS_MESSAGE, SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE } = messages;

function setShellCommands() {
  const callbacks = [
          setBuildShellCommandsPromptCallback,
          setGitShellCommandsPromptCallback,
          setPublishShellCommandsPromptCallback
        ],
        shellCommands = retrieveShellCommands(),
        context = {
          shellCommands
        };

  executeCallbacks(callbacks, (completed) => {
    if (!completed) {
      console.log(FAILED_SET_SHELL_COMMANDS_MESSAGE);

      exit();
    }

    const { shellCommands } = context;

    updateShellCommands(shellCommands);

    console.log(SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE);
  }, context);
}

module.exports = setShellCommands;

"use strict";

const setGitShellCommandsPromptCallback = require("../callback/prompt/setGitShellCommands"),
      setBuildShellCommandsPromptCallback = require("../callback/prompt/setBuildShellCommands"),
      setInstallShellCommandsPromptCallback = require("../callback/prompt/setInstallShellCommands"),
      setPublishShellCommandsPromptCallback = require("../callback/prompt/setPublishShellCommands");

const { executeCallbacks } = require("../utilities/callback"),
      { retrieveShellCommands, updateShellCommands } = require("../configuration"),
      { FAILED_SET_SHELL_COMMANDS_MESSAGE, SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE } = require("../messages");

function setShellCommands() {
  const callbacks = [
          setGitShellCommandsPromptCallback,
          setInstallShellCommandsPromptCallback,
          setBuildShellCommandsPromptCallback,
          setPublishShellCommandsPromptCallback,
        ],
        shellCommands = retrieveShellCommands(),
        context = {
          shellCommands
        };

  executeCallbacks(callbacks, (completed) => {
    if (!completed) {
      console.log(FAILED_SET_SHELL_COMMANDS_MESSAGE);

      return;
    }

    const { shellCommands } = context;

    updateShellCommands(shellCommands);

    console.log(SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE);
  }, context);
}

module.exports = setShellCommands;

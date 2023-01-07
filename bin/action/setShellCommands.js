"use strict";

const setGitShellCommandsPromptOperation = require("../operation/prompt/setGitShellCommands"),
      setBuildShellCommandsPromptOperation = require("../operation/prompt/setBuildShellCommands"),
      setInstallShellCommandsPromptOperation = require("../operation/prompt/setInstallShellCommands"),
      setPublishShellCommandsPromptOperation = require("../operation/prompt/setPublishShellCommands");

const { executeOperations } = require("../utilities/operation"),
      { retrieveShellCommands, updateShellCommands } = require("../configuration"),
      { FAILED_SET_SHELL_COMMANDS_MESSAGE, SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE } = require("../messages");

function setShellCommandsAction() {
  const operations = [
          setGitShellCommandsPromptOperation,
          setInstallShellCommandsPromptOperation,
          setBuildShellCommandsPromptOperation,
          setPublishShellCommandsPromptOperation
        ],
        shellCommands = retrieveShellCommands(),
        context = {
          shellCommands
        };

  executeOperations(operations, (completed) => {
    if (!completed) {
      console.log(FAILED_SET_SHELL_COMMANDS_MESSAGE);

      return;
    }

    const { shellCommands } = context;

    updateShellCommands(shellCommands);

    console.log(SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE);
  }, context);
}

module.exports = setShellCommandsAction;

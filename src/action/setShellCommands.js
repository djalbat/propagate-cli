"use strict";

import setGitShellCommandsPromptOperation from "../operation/prompt/setGitShellCommands";
import setBuildShellCommandsPromptOperation from "../operation/prompt/setBuildShellCommands";
import setInstallShellCommandsPromptOperation from "../operation/prompt/setInstallShellCommands";
import setPublishShellCommandsPromptOperation from "../operation/prompt/setPublishShellCommands";

import { executeOperations } from "../utilities/operation";
import { retrieveShellCommands, updateShellCommands } from "../configuration";
import { FAILED_SET_SHELL_COMMANDS_MESSAGE, SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE } from "../messages";

export default function setShellCommandsAction() {
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

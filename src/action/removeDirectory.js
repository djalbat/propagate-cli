"use strict";

import listDirectories from "../action/listDirectories";
import removeDirectoryPromptOperation from "../operation/prompt/removeDirectory";

import { executeOperations } from "../utilities/operation";
import { updateDirectories, retrieveDirectories } from "../configuration";
import { FAILED_REMOVE_DIRECTORY_MESSAGE, SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE } from "../messages";

export default function removeDirectoryAction() {
  const operations = [
          removeDirectoryPromptOperation
        ],
        directoryNumbers = listDirectories(),
        directoryNumbersLength = directoryNumbers.length;

  if (directoryNumbersLength === 0) {
    return;
  }

  const context = {
          directoryNumbers
        };

  executeOperations(operations, (completed) => {
    if (!completed) {
      console.log(FAILED_REMOVE_DIRECTORY_MESSAGE);

      return;
    }

    const { directoryNumber } = context,
          start = directoryNumber - 1,
          deleteCount = 1,
          directories = retrieveDirectories();

    directories.splice(start, deleteCount);

    updateDirectories(directories);

    console.log(SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE);
  }, context);
}

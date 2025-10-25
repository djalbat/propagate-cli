"use strict";

import addDirectoryPromptOperation from "../operation/prompt/addDirectory";

import { executeOperations } from "../utilities/operation";
import { retrieveDirectories, updateDirectories } from "../configuration";
import { FAILED_ADD_DIRECTORY_MESSAGE, SUCCESSFUL_ADD_DIRECTORY_MESSAGE, DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE } from "../messages";

export default function addDirectoryAction() {
  const operations = [
          addDirectoryPromptOperation
        ],
        context = {};

  executeOperations(operations, (completed) => {
    if (!completed) {
      console.log(FAILED_ADD_DIRECTORY_MESSAGE);

      return;
    }

    const directories = retrieveDirectories(),
          { directory } = context;

    const directoriesIncludesDirectory = directories.includes(directory);

    if (directoriesIncludesDirectory) {
      console.log(DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE);
    } else {
      directories.push(directory);

      updateDirectories(directories);

      console.log(SUCCESSFUL_ADD_DIRECTORY_MESSAGE);
    }
  }, context);
}

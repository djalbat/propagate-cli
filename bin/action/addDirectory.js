"use strict";

const addDirectoryPromptOperation = require("../operation/prompt/addDirectory");

const { executeOperations } = require("../utilities/operation"),
      { retrieveDirectories, updateDirectories } = require("../configuration"),
      { FAILED_ADD_DIRECTORY_MESSAGE, SUCCESSFUL_ADD_DIRECTORY_MESSAGE, DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE } = require("../messages");

function addDirectoryAction() {
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

module.exports = addDirectoryAction;

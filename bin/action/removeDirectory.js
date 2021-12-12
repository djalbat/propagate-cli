"use strict";

const listDirectories = require("../action/listDirectories"),
      removeDirectoryPromptOperation = require("../operation/prompt/removeDirectory");

const { executeOperations } = require("../utilities/operation"),
      { updateDirectories, retrieveDirectories } = require("../configuration"),
      { FAILED_REMOVE_DIRECTORY_MESSAGE, SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE } = require("../messages");

function removeDirectory() {
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

module.exports = removeDirectory;

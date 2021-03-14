"use strict";

const listDirectories = require("../action/listDirectories"),
      removeDirectoryPromptCallback = require("../callback/prompt/removeDirectory");

const { executeCallbacks } = require("../utilities/callback"),
      { updateDirectories, retrieveDirectories } = require("../configuration"),
      { FAILED_REMOVE_DIRECTORY_MESSAGE, SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE } = require("../messages");

function removeDirectory() {
  const callbacks = [
          removeDirectoryPromptCallback
        ],
        directoryNumbers = listDirectories(),
        directoryNumbersLength = directoryNumbers.length;

  if (directoryNumbersLength === 0) {
    return;
  }

  const context = {
          directoryNumbers
        };

  executeCallbacks(callbacks, (completed) => {
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

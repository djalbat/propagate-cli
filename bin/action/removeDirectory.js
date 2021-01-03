"use strict";

const messages = require("../messages"),
      configuration = require("../configuration"),
      listDirectories = require("../action/listDirectories"),
      callbackUtilities = require("../utilities/callback"),
      removeDirectoryPromptCallback = require("../callback/prompt/removeDirectory");

const { executeCallbacks } = callbackUtilities,
      { updateDirectories, retrieveDirectories } = configuration,
      { FAILED_REMOVE_DIRECTORY_MESSAGE, SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE } = messages;

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

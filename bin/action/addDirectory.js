"use strict";

const addDirectoryPromptCallback = require("../callback/prompt/addDirectory");

const { executeCallbacks } = require("../utilities/callback"),
      { retrieveDirectories, updateDirectories } = require("../configuration"),
      { FAILED_ADD_DIRECTORY_MESSAGE, SUCCESSFUL_ADD_DIRECTORY_MESSAGE, DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE } = require("../messages");

function addDirectory() {
  const callbacks = [
          addDirectoryPromptCallback
        ],
        context = {};

  executeCallbacks(callbacks, (completed) => {
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

module.exports = addDirectory;

'use strict';

const messages = require('../messages'),
      configuration = require('../configuration'),
      callbackUtilities = require('../utilities/callback'),
      removeDirectoryPromptCallback = require('../callback/prompt/removeDirectory');

const { exit } = process,
      { executeCallbacks } = callbackUtilities,
      { retrieveDirectories, updateDirectories } = configuration,
      { FAILED_REMOVE_DIRECTORY_MESSAGE, SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE, NO_DIRECTORIES_TO_REMOVE_MESSAGE } = messages;

function removeDirectory() {
  const callbacks = [
          removeDirectoryPromptCallback
        ],
        directories = retrieveDirectories(),
        directoriesLength = directories.length;

  if (directoriesLength === 0) {
    console.log(NO_DIRECTORIES_TO_REMOVE_MESSAGE);

    return;
  }

  console.log('');

  const directoryNumbers = directories.map((directory, index) => {
          const directoryNumber = index + 1;

          console.log(` ${directoryNumber}: '${directory}'`);

          return directoryNumber;
        }),
        context = {
          directoryNumbers
        };

  console.log('');

  executeCallbacks(callbacks, (completed) => {
    if (!completed) {
      console.log(FAILED_REMOVE_DIRECTORY_MESSAGE);

      exit();
    }

    const { directoryNumber } = context,
          start = directoryNumber - 1,
          deleteCount = 1;

    directories. splice(start, deleteCount);

    updateDirectories(directories);

    console.log(SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE);
  }, context);
}

module.exports = removeDirectory;

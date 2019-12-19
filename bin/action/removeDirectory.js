'use strict';

const messages = require('../messages'),
      callbackUtilities = require('../utilities/callback');

const { exit } = process,
      { executeCallbacks } = callbackUtilities,
      { FAILED_REMOVE_DIRECTORY_MESSAGE, SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE } = messages;

function removeDirectory() {
  const callbacks = [
          ///
        ],
        context = {};

  executeCallbacks(callbacks, (completed) => {
    if (!completed) {
      console.log(FAILED_REMOVE_DIRECTORY_MESSAGE);

      exit();
    }

    console.log(SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE);
  }, context);
}

module.exports = removeDirectory;

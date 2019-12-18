'use strict';

const messages = require('../messages'),
      callbackUtilities = require('../utilities/callback');

const { exit } = process,
      { executeCallbacks } = callbackUtilities,
      { FAILED_ADD_DIRECTORY_MESSAGE, SUCCESSFUL_ADD_DIRECTORY_MESSAGE } = messages;

function addDirectory() {
  const callbacks = [
          ///
        ],
        context = {};

  executeCallbacks(callbacks, function(completed) {
    if (!completed) {
      console.log(FAILED_ADD_DIRECTORY_MESSAGE);

      exit();
    }

    console.log(SUCCESSFUL_ADD_DIRECTORY_MESSAGE);
  }, context);
}

module.exports = addDirectory;

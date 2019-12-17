'use strict';

const messages = require('../messages'),
      configuration = require('../configuration'),
      callbackUtilities = require('../utilities/callback');

const { exit } = process,
      { updateOptions } = configuration,
			{ executeCallbacks } = callbackUtilities,
      { FAILED_SET_OPTIONS_MESSAGE, SUCCESSFUL_SET_OPTIONS_MESSAGE } = messages;

function setOptions() {
  const callbacks = [
          ///
        ],
        context = {};

  executeCallbacks(callbacks, function(completed) {
    if (!completed) {
      console.log(FAILED_SET_OPTIONS_MESSAGE);

      exit();
    }

    const options = {};

    updateOptions(options);

    console.log(SUCCESSFUL_SET_OPTIONS_MESSAGE);
  }, context);
}

module.exports = setOptions;

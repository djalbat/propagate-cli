'use strict';

const messages = require('../messages'),
      callbackUtilities = require('../utilities/callback'),
      createDiffsCallback = require('../callback/createDiffs'),
      buildPromptCallback = require('../callback/prompt/build'),
      publishPromptCallback = require('../callback/prompt/publish'),
      checkArgumentCallback = require('../callback/checkArgument'),
      createReleaseCallback = require('../callback/createRelease'),
      createReleaseMapCallback = require('../callback/createReleaseMap'),
      propagateReleaseCallback = require('../callback/propagateRelease'),
      applyDiffsPromptCallback = require('../callback/prompt/applyDiffs'),
      createReleaseGraphCallback = require('../callback/createReleaseGraph');

const { exit } = process,
      { executeCallbacks } = callbackUtilities,
      { FAILED_PROPAGATE_MESSAGE, SUCCESSFUL_PROPAGATE_MESSAGE } = messages;

function propagate(argument, quietly, forced) {
  const callbacks = [
          checkArgumentCallback,
          createReleaseMapCallback,
          createReleaseCallback,
          createReleaseGraphCallback,
          propagateReleaseCallback,
          createDiffsCallback,
          applyDiffsPromptCallback,
          publishPromptCallback,
          buildPromptCallback
        ],
        context = {
          argument,
          quietly,
          forced
        };

  executeCallbacks(callbacks, (completed) => {
    if (!completed) {
      console.log(FAILED_PROPAGATE_MESSAGE);

      exit();
    }

    console.log(SUCCESSFUL_PROPAGATE_MESSAGE);
  }, context);

}

module.exports = propagate;

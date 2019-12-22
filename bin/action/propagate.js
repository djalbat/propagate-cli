'use strict';

const messages = require('../messages'),
      callbackUtilities = require('../utilities/callback'),
      checkArgumentCallback = require('../callback/checkArgument'),
      createReleaseCallback = require('../callback/createRelease'),
      applyDiffsPromptCallback = require('../callback/prompt/applyDiffs'),
      createReleaseMapCallback = require('../callback/createReleaseMap'),
      propagateReleaseCallback = require('../callback/propagateRelease'),
      createDependencyGraphCallback = require('../callback/createDependencyGraph');

const { exit } = process,
      { executeCallbacks } = callbackUtilities,
      { FAILED_PROPAGATE_MESSAGE, SUCCESSFUL_PROPAGATE_MESSAGE } = messages;

function propagate(argument, quietly, forced) {
  const callbacks = [
          checkArgumentCallback,
          createReleaseMapCallback,
          createReleaseCallback,
          createDependencyGraphCallback,
          propagateReleaseCallback,
          applyDiffsPromptCallback
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

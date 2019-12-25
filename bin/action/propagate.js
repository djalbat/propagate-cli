'use strict';

const messages = require('../messages'),
      callbackUtilities = require('../utilities/callback'),
      createDiffsCallback = require('../callback/createDiffs'),
      publishPromptCallback = require('../callback/prompt/publish'),
      checkArgumentCallback = require('../callback/checkArgument'),
      createReleaseCallback = require('../callback/createRelease'),
      createReleaseMapCallback = require('../callback/createReleaseMap'),
      propagateReleaseCallback = require('../callback/propagateRelease'),
      applyDiffsPromptCallback = require('../callback/prompt/applyDiffs'),
      createDependencyGraphCallback = require('../callback/createDependencyGraph'),
      buildThenPublishPromptCallback = require('../callback/prompt/buildThenPublish');

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
          createDiffsCallback
          applyDiffsPromptCallback,
          publishPromptCallback
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

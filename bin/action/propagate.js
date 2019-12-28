'use strict';

const messages = require('../messages'),
      callbackUtilities = require('../utilities/callback'),
      createDiffsCallback = require('../callback/createDiffs'),
      gitPromptCallback = require('../callback/prompt/git'),
      publishPromptCallback = require('../callback/prompt/publish'),
      createReleaseCallback = require('../callback/createRelease'),
      createReleaseMapCallback = require('../callback/createReleaseMap'),
      propagateReleaseCallback = require('../callback/propagateRelease'),
      applyDiffsPromptCallback = require('../callback/prompt/applyDiffs'),
      createReleaseGraphCallback = require('../callback/createReleaseGraph'),
      createSubDirectoryPathCallback = require('../callback/createSubDirectoryPath'),
      buildAndOrPublishPromptCallback = require('../callback/prompt/buildAndOrPublish');

const { exit } = process,
      { executeCallbacks } = callbackUtilities,
      { FAILED_PROPAGATE_MESSAGE, SUCCESSFUL_PROPAGATE_MESSAGE } = messages;

function propagate(argument, quietly, forced) {
  const callbacks = [
          createSubDirectoryPathCallback,
          createReleaseMapCallback,
          createReleaseCallback,
          createReleaseGraphCallback,
          propagateReleaseCallback,
          createDiffsCallback,
          applyDiffsPromptCallback,
          publishPromptCallback,
          buildAndOrPublishPromptCallback,
          gitPromptCallback
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

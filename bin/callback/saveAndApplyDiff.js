'use strict';

const callbackUtilities = require('../utilities/callback'),
      gitPromptCallback = require('../callback/prompt/git'),
      savePromptCallback = require('../callback/prompt/save'),
      buildPromptCallback = require('../callback/prompt/build'),
      publishPromptCallback = require('../callback/prompt/publish');

const { executeCallbacks } = callbackUtilities;

function saveAndApplyDiff(diff, proceed, abort, context) {
  const callbacks = [
          savePromptCallback,
          buildPromptCallback,
          gitPromptCallback,
          publishPromptCallback
        ];

  Object.assign(context, {
    diff
  });

  executeCallbacks(callbacks, (completed) => {
    delete context.diff;

    proceed();
  }, context);
}

module.exports = saveAndApplyDiff;

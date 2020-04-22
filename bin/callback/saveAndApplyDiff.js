"use strict";

const callbackUtilities = require("../utilities/callback"),
      gitPromptCallback = require("../callback/prompt/git"),
      savePromptCallback = require("../callback/prompt/save"),
      buildPromptCallback = require("../callback/prompt/build"),
      publishPromptCallback = require("../callback/prompt/publish");

const { executeCallbacks } = callbackUtilities;

function saveAndApplyDiff(diff, proceed, abort, context) {
  if (diff === null) {
    proceed();

    return;
  }

  Object.assign(context, {
    diff
  });

  const callbacks = [
          savePromptCallback,
          buildPromptCallback,
          gitPromptCallback,
          publishPromptCallback
        ];

  console.log("");

  executeCallbacks(callbacks, (completed) => {
    delete context.diff;

    proceed();
  }, context);
}

module.exports = saveAndApplyDiff;

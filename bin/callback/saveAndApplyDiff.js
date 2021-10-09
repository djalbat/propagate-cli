"use strict";

const gitPromptCallback = require("../callback/prompt/git"),
      savePromptCallback = require("../callback/prompt/save"),
      buildPromptCallback = require("../callback/prompt/build"),
      publishPromptCallback = require("../callback/prompt/publish");

const { EMPTY_STRING } = require("../constants"),
      { executeCallbacks } = require("../utilities/callback");

function saveAndApplyDiffCallback(diff, proceed, abort, context) {
  const { diffs } = context,
        index = diffs.indexOf(diff);

  if (index > 0) {
    const dependencyMapDiffEmpty = diff.isDependencyMapDiffEmpty(),
          devDependencyMapDiffEmpty = diff.isDevDependencyMapDiffEmpty();

    if (dependencyMapDiffEmpty && devDependencyMapDiffEmpty) {
      proceed();

      return;
    }
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

  console.log(EMPTY_STRING);

  executeCallbacks(callbacks, (completed) => {
    delete context.diff;

    proceed();
  }, context);
}

module.exports = saveAndApplyDiffCallback;

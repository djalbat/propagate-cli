"use strict";

const gitPromptOperation = require("../operation/prompt/git"),
      savePromptOperation = require("../operation/prompt/save"),
      buildPromptOperation = require("../operation/prompt/build"),
      installPromptOperation = require("../operation/prompt/install"),
      publishPromptOperation = require("../operation/prompt/publish");

const { EMPTY_STRING } = require("../constants"),
      { executeOperations } = require("../utilities/operation");

function saveAndApplyDiffOperation(diff, proceed, abort, context) {
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

  const operations = [
          savePromptOperation,
          installPromptOperation,
          buildPromptOperation,
          gitPromptOperation,
          publishPromptOperation
        ];

  console.log(EMPTY_STRING);

  executeOperations(operations, (completed) => {
    delete context.diff;

    proceed();
  }, context);
}

module.exports = saveAndApplyDiffOperation;

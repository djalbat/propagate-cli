"use strict";

const saveAndApplyDiffCallback = require("../callback/saveAndApplyDiff");

const { executeCallback } = require("../utilities/callback");

function saveAndApplyDiffsCallback(proceed, abort, context) {
  const { diffs, dryRun } = context;

  if (dryRun) {
    proceed();

    return;
  }

  executeCallback(diffs, saveAndApplyDiffCallback, proceed, abort, context);
}

module.exports = saveAndApplyDiffsCallback;

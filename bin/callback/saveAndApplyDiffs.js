"use strict";

const saveAndApplyDiffCallback = require("../callback/saveAndApplyDiff");

const { executeCallback } = require("../utilities/callback");

function saveAndApplyDiffsCallback(proceed, abort, context) {
  const { diffs } = context;

  executeCallback(diffs, saveAndApplyDiffCallback, proceed, abort, context);
}

module.exports = saveAndApplyDiffsCallback;

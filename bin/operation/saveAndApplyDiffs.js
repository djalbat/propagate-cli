"use strict";

const saveAndApplyDiffOperation = require("../operation/saveAndApplyDiff");

const { executeOperation } = require("../utilities/operation");

function saveAndApplyDiffsOperation(proceed, abort, context) {
  const { diffs, dryRun } = context;

  if (dryRun) {
    proceed();

    return;
  }

  executeOperation(diffs, saveAndApplyDiffOperation, proceed, abort, context);
}

module.exports = saveAndApplyDiffsOperation;

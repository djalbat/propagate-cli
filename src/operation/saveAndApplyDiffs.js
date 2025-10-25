"use strict";

import saveAndApplyDiffOperation from "../operation/saveAndApplyDiff";

import { executeOperation } from "../utilities/operation";

export default function saveAndApplyDiffsOperation(proceed, abort, context) {
  const { diffs, dryRun } = context;

  if (dryRun) {
    proceed();

    return;
  }

  executeOperation(diffs, saveAndApplyDiffOperation, proceed, abort, context);
}

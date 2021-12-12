"use strict";

function dryRunOperation(proceed, abort, context) {
  const { diffs, dryRun } = context;

  if (dryRun) {
    diffs.forEach((diff) => {
      const diffString = diff.asString();

      console.log(diffString);
    });
  }

  proceed();
}

module.exports = dryRunOperation;

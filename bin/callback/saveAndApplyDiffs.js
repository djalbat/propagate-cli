'use strict';

const callbackUtilities = require('../utilities/callback'),
      saveAndApplyDiffCallback = require('../callback/saveAndApplyDiff');

const { executeCallback } = callbackUtilities;

function saveAndApplyDiffsCallback(proceed, abort, context) {
  const { diffs } = context;

  executeCallback(diffs, saveAndApplyDiffCallback, proceed, context);
}

module.exports = saveAndApplyDiffsCallback;

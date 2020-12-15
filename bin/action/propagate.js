"use strict";

const messages = require("../messages"),
      dryRunCallback = require("../callback/dryRun"),
      callbackUtilities = require("../utilities/callback"),
      createDiffsCallback = require("../callback/createDiffs"),
      createReleaseCallback = require("../callback/createRelease"),
      eliminateDiffsCallback = require("../callback/eliminateDiffs"),
      createReleaseMapCallback = require("../callback/createReleaseMap"),
      propagateReleaseCallback = require("../callback/propagateRelease"),
      saveAndApplyDiffsCallback = require("../callback/saveAndApplyDiffs"),
      createReleaseGraphCallback = require("../callback/createReleaseGraph"),
      createSubDirectoryPathCallback = require("../callback/createSubDirectoryPath");

const { executeCallbacks } = callbackUtilities,
      { FAILED_PROPAGATE_MESSAGE, SUCCESSFUL_PROPAGATE_MESSAGE } = messages;

function propagate(argument, quietly, dryRun, force) {
  const callbacks = [
          createSubDirectoryPathCallback,
          createReleaseMapCallback,
          createReleaseCallback,
          createReleaseGraphCallback,
          propagateReleaseCallback,
          createDiffsCallback,
          eliminateDiffsCallback,
          dryRunCallback,
          saveAndApplyDiffsCallback
        ],
        context = {
          argument,
          quietly,
          dryRun,
          force
        };

  executeCallbacks(callbacks, (completed) => {
    if (!completed) {
      console.log(FAILED_PROPAGATE_MESSAGE);

      process.exit();
    }

    console.log(SUCCESSFUL_PROPAGATE_MESSAGE);
  }, context);
}

module.exports = propagate;

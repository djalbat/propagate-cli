"use strict";

const dryRunCallback = require("../callback/dryRun"),
      createDiffsCallback = require("../callback/createDiffs"),
      retrieveReleaseCallback = require("../callback/retrieveRelease"),
      createReleaseMapCallback = require("../callback/createReleaseMap"),
      propagateReleaseCallback = require("../callback/propagateRelease"),
      saveAndApplyDiffsCallback = require("../callback/saveAndApplyDiffs"),
      createReleaseGraphCallback = require("../callback/createReleaseGraph"),
      createSubDirectoryPathCallback = require("../callback/createSubDirectoryPath");

const { executeCallbacks } = require("../utilities/callback"),
      { FAILED_PROPAGATE_MESSAGE, SUCCESSFUL_PROPAGATE_MESSAGE } = require("../messages");

function propagate(argument, quietly, dryRun, yes) {
  const callbacks = [
          createSubDirectoryPathCallback,
          createReleaseMapCallback,
          retrieveReleaseCallback,
          createReleaseGraphCallback,
          propagateReleaseCallback,
          createDiffsCallback,
          dryRunCallback,
          saveAndApplyDiffsCallback
        ],
        context = {
          argument,
          quietly,
          dryRun,
          yes
        };

  executeCallbacks(callbacks, (completed) => {
    completed ?
      console.log(SUCCESSFUL_PROPAGATE_MESSAGE) :
        console.log(FAILED_PROPAGATE_MESSAGE);
  }, context);
}

module.exports = propagate;

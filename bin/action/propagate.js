"use strict";

const dryRunOperation = require("../operation/dryRun"),
      createDiffsOperation = require("../operation/createDiffs"),
      retrieveReleaseOperation = require("../operation/retrieveRelease"),
      createReleaseMapOperation = require("../operation/createReleaseMap"),
      propagateReleaseOperation = require("../operation/propagateRelease"),
      saveAndApplyDiffsOperation = require("../operation/saveAndApplyDiffs"),
      createReleaseGraphOperation = require("../operation/createReleaseGraph"),
      checkDevDependenciesOperation = require("../operation/checkDevDependencies"),
      createSubDirectoryMapOperation = require("../operation/createSubDirectoryMap"),
      createSubDirectoryPathOperation = require("../operation/createSubDirectoryPath");

const { executeOperations } = require("../utilities/operation"),
      { FAILED_PROPAGATE_MESSAGE, SUCCESSFUL_PROPAGATE_MESSAGE } = require("../messages");

function propagateAction(argument, quietly, dryRun, yes) {
  const operations = [
          createSubDirectoryPathOperation,
          createSubDirectoryMapOperation,
          createReleaseMapOperation,
          retrieveReleaseOperation,
          createReleaseGraphOperation,
          propagateReleaseOperation,
          createDiffsOperation,
          dryRunOperation,
          checkDevDependenciesOperation,
          saveAndApplyDiffsOperation
        ],
        context = {
          argument,
          quietly,
          dryRun,
          yes
        };

  executeOperations(operations, (completed) => {
    if (!completed) {
      console.log(FAILED_PROPAGATE_MESSAGE);

      return;
    }

    if (!dryRun) {
      console.log(SUCCESSFUL_PROPAGATE_MESSAGE);
    }
  }, context);
}

module.exports = propagateAction;

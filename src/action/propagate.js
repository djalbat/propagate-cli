"use strict";

import dryRunOperation from "../operation/dryRun";
import createDiffsOperation from "../operation/createDiffs";
import retrieveReleaseOperation from "../operation/retrieveRelease";
import createReleaseMapOperation from "../operation/createReleaseMap";
import propagateReleaseOperation from "../operation/propagateRelease";
import saveAndApplyDiffsOperation from "../operation/saveAndApplyDiffs";
import createReleaseGraphOperation from "../operation/createReleaseGraph";
import checkDevDependenciesOperation from "../operation/checkDevDependencies";
import createSubDirectoryMapOperation from "../operation/createSubDirectoryMap";
import createSubDirectoryPathOperation from "../operation/createSubDirectoryPath";

import { executeOperations } from "../utilities/operation";
import { FAILED_PROPAGATE_MESSAGE, SUCCESSFUL_PROPAGATE_MESSAGE } from "../messages";

export default function propagateAction(subDirectoryName, quietly, dryRun, yes) {
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
          subDirectoryName,
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

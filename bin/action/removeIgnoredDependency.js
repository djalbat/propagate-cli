"use strict";

const listIgnoredDependencies = require("../action/listIgnoredDependencies"),
      removeIgnoredDependencyPromptOperation = require("../operation/prompt/removeIgnoredDependency");

const { executeOperations } = require("../utilities/operation"),
      { updateIgnoredDependencies, retrieveIgnoredDependencies } = require("../configuration"),
      { FAILED_REMOVE_IGNORED_DEPENDENCY_MESSAGE, SUCCESSFUL_REMOVE_IGNORED_DEPENDENCY_MESSAGE } = require("../messages");

function removeIgnoredDependencyAction() {
  const operations = [
          removeIgnoredDependencyPromptOperation
        ],
        ignoredDependencyNumbers = listIgnoredDependencies(),
        ignoredDependencyNumbersLength = ignoredDependencyNumbers.length;

  if (ignoredDependencyNumbersLength === 0) {
    return;
  }

  const context = {
          ignoredDependencyNumbers
        };

  executeOperations(operations, (completed) => {
    if (!completed) {
      console.log(FAILED_REMOVE_IGNORED_DEPENDENCY_MESSAGE);

      return;
    }

    const { ignoredDependencyNumber } = context,
          start = ignoredDependencyNumber - 1,
          deleteCount = 1,
          ignoredDependencies = retrieveIgnoredDependencies();

    ignoredDependencies.splice(start, deleteCount);

    updateIgnoredDependencies(ignoredDependencies);

    console.log(SUCCESSFUL_REMOVE_IGNORED_DEPENDENCY_MESSAGE);
  }, context);
}

module.exports = removeIgnoredDependencyAction;

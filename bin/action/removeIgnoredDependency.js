"use strict";

const listIgnoredDependencies = require("../action/listIgnoredDependencies"),
      removeIgnoredDependencyPromptCallback = require("../callback/prompt/removeIgnoredDependency");

const { executeCallbacks } = require("../utilities/callback"),
      { updateIgnoredDependencies, retrieveIgnoredDependencies } = require("../configuration"),
      { FAILED_REMOVE_IGNORED_DEPENDENCY_MESSAGE, SUCCESSFUL_REMOVE_IGNORED_DEPENDENCY_MESSAGE } = require("../messages");

function removeIgnoredDependency() {
  const callbacks = [
          removeIgnoredDependencyPromptCallback
        ],
        ignoredDependencyNumbers = listIgnoredDependencies(),
        ignoredDependencyNumbersLength = ignoredDependencyNumbers.length;

  if (ignoredDependencyNumbersLength === 0) {
    return;
  }

  const context = {
          ignoredDependencyNumbers
        };

  executeCallbacks(callbacks, (completed) => {
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

module.exports = removeIgnoredDependency;

"use strict";

const messages = require("../messages"),
      configuration = require("../configuration"),
      callbackUtilities = require("../utilities/callback"),
      addIgnoredDependencyPromptCallback = require("../callback/prompt/addIgnoredDependency");

const { executeCallbacks } = callbackUtilities,
      { retrieveIgnoredDependencies, updateIgnoredDependencies } = configuration,
      { FAILED_ADD_IGNORED_DEPENDENCY_MESSAGE, SUCCESSFUL_ADD_IGNORED_DEPENDENCY_MESSAGE, IGNORED_DEPENDENCIES_INCLUDES_IGNORED_DEPENDENCY_MESSAGE } = messages;

function addIgnoredDependency() {
  const callbacks = [
          addIgnoredDependencyPromptCallback
        ],
        context = {};

  executeCallbacks(callbacks, (completed) => {
    if (!completed) {
      console.log(FAILED_ADD_IGNORED_DEPENDENCY_MESSAGE);

      return;
    }

    const ignoredDependencies = retrieveIgnoredDependencies(),
          { ignoredDependency } = context;

    const ignoredDependenciesIncludesIgnoredDependency = ignoredDependencies.includes(ignoredDependency);

    if (ignoredDependenciesIncludesIgnoredDependency) {
      console.log(IGNORED_DEPENDENCIES_INCLUDES_IGNORED_DEPENDENCY_MESSAGE);
    } else {
      ignoredDependencies.push(ignoredDependency);

      updateIgnoredDependencies(ignoredDependencies);

      console.log(SUCCESSFUL_ADD_IGNORED_DEPENDENCY_MESSAGE);
    }
  }, context);
}

module.exports = addIgnoredDependency;

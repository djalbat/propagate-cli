"use strict";

const addIgnoredDependencyPromptOperation = require("../operation/prompt/addIgnoredDependency");

const { executeOperations } = require("../utilities/operation"),
      { retrieveIgnoredDependencies, updateIgnoredDependencies } = require("../configuration"),
      { FAILED_ADD_IGNORED_DEPENDENCY_MESSAGE,
        SUCCESSFUL_ADD_IGNORED_DEPENDENCY_MESSAGE,
        IGNORED_DEPENDENCIES_INCLUDE_IGNORED_DEPENDENCY_MESSAGE } = require("../messages");

function addIgnoredDependencyAction() {
  const operations = [
          addIgnoredDependencyPromptOperation
        ],
        context = {};

  executeOperations(operations, (completed) => {
    if (!completed) {
      console.log(FAILED_ADD_IGNORED_DEPENDENCY_MESSAGE);

      return;
    }

    const { ignoredDependency } = context,
          ignoredDependencies = retrieveIgnoredDependencies(),
          ignoredDependenciesIncludesIgnoredDependency = ignoredDependencies.includes(ignoredDependency);

    if (ignoredDependenciesIncludesIgnoredDependency) {
      console.log(IGNORED_DEPENDENCIES_INCLUDE_IGNORED_DEPENDENCY_MESSAGE);
    } else {
      ignoredDependencies.push(ignoredDependency);

      updateIgnoredDependencies(ignoredDependencies);

      console.log(SUCCESSFUL_ADD_IGNORED_DEPENDENCY_MESSAGE);
    }
  }, context);
}

module.exports = addIgnoredDependencyAction;

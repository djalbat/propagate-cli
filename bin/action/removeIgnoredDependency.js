'use strict';

const messages = require('../messages'),
      configuration = require('../configuration'),
      callbackUtilities = require('../utilities/callback'),
      listIgnoredDependencies = require('../action/listIgnoredDependencies'),
      removeIgnoredDependencyPromptCallback = require('../callback/prompt/removeIgnoredDependency');

const { exit } = process,
      { executeCallbacks } = callbackUtilities,
      { updateIgnoredDependencies, retrieveIgnoredDependencies } = configuration,
      { FAILED_REMOVE_IGNORED_DEPENDENCY_MESSAGE, SUCCESSFUL_REMOVE_IGNORED_DEPENDENCY_MESSAGE } = messages;

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

      exit();
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

'use strict';

const necessary = require('necessary');

const messages = require('../../messages'),
      configuration = require('../../configuration'),
      shellUtilities = require('../../utilities/shell'),
      promptUtilities = require('../../utilities/prompt'),
      validateUtilities = require('../../utilities/validate');

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities,
      { execute } = shellUtilities,
      { cwd, chdir } = process,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages,
      { retrieveShellCommands } = configuration;

function executeBuildShellCommandsPromptCallback(proceed, abort, context) {
  const { forced, quietly, diffs } = context,
        shellCommands = retrieveShellCommands(),
        { build } = shellCommands,
        buildShellCommands = build;  ///

  if (forced) {
    executeBuildShellCommands(diffs, buildShellCommands, quietly);

    proceed();

    return;
  }

  const description = 'Build packages? (y)es (n)o: ',
        errorMessage = INVALID_ANSWER_MESSAGE,
        validationFunction = validateAnswer,  ///
        options = {
          description,
          errorMessage,
          validationFunction
        };

  prompt(options, (answer) => {
    const valid = (answer !== null);

    if (valid) {
      const affirmative = isAnswerAffirmative(answer);

      if (affirmative) {
        executeBuildShellCommands(diffs, buildShellCommands, quietly);

        proceed();

        return;
      }
    }

    abort();
  });
}

module.exports = executeBuildShellCommandsPromptCallback;

function executeBuildShellCommands(diffs, buildShellCommands, quietly) {
  diffs.forEach((diff) => {
    const devDependenciesChanged = diff.haveDevDependenciesChanged();

    if (devDependenciesChanged) {
      const subDirectoryPath = diff.getSubDirectoryPath(),
            currentWorkingDirectoryPath = cwd();

      chdir(subDirectoryPath);

      const output = execute(buildShellCommands, quietly);

      if (!quietly) {
        console.log(` Building './${subDirectoryPath}': ${output}`)
      }

      chdir(currentWorkingDirectoryPath);
    }
  });
}

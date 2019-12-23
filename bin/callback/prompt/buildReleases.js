'use strict';

const necessary = require('necessary');

const messages = require('../../messages'),
      configuration = require('../../configuration'),
      shellUtilities = require('../../utilities/shell'),
      promptUtilities = require('../../utilities/prompt'),
      validateUtilities = require('../../utilities/validate');

const { miscellaneousUtilities } = necessary,
      { exec } = shellUtilities,
      { prompt } = miscellaneousUtilities,
      { cwd, chdir } = process,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages,
      { retrieveShellCommands } = configuration;

function buildReleasesPromptCallback(proceed, abort, context) {
  const { forced, quietly, releaseMap } = context,
        releases = releaseMap.getReleases(),
        shellCommands = retrieveShellCommands(),
        { build } = shellCommands,
        buildShellCommands = build;  ///

  if (forced) {
    buildReleases(releases, buildShellCommands, quietly);

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
        buildReleases(releases, buildShellCommands, quietly);

        proceed();

        return;
      }
    }

    abort();
  });
}

module.exports = buildReleasesPromptCallback;

function buildReleases(releases, buildShellCommands, quietly) {
  releases.forEach((release) => buildRelease(release, buildShellCommands, quietly));
}

function buildRelease(release, buildShellCommands, quietly) {
  const subDirectoryPath = release.getSubDirectoryPath(),
        currentWorkingDirectoryPath = cwd();

  chdir(subDirectoryPath);

  const output = exec(buildShellCommands, quietly);

  if (!quietly) {
    console.log(` Building './${subDirectoryPath}': ${output}`)
  }

  chdir(currentWorkingDirectoryPath);
}

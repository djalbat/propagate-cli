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

function publishReleasesPromptCallback(proceed, abort, context) {
  const { forced, quietly, releaseMap } = context,
        releases = releaseMap.getReleases(),
        shellCommands = retrieveShellCommands(),
        { publish } = shellCommands,
        publishShellCommands = publish;  ///

  if (forced) {
    publishReleases(releases, publishShellCommands, quietly);

    proceed();

    return;
  }

  const description = 'Publish packages? (y)es (n)o: ',
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
        publishReleases(releases, publishShellCommands, quietly);

        proceed();

        return;
      }
    }

    abort();
  });
}

module.exports = publishReleasesPromptCallback;

function publishReleases(releases, publishShellCommands, quietly) {
  releases.forEach((release) => publishRelease(release, publishShellCommands, quietly));
}

function publishRelease(release, publishShellCommands, quietly) {
  const publishable = release.isPublishable();

  if (publishable) {
    const subDirectoryPath = release.getSubDirectoryPath(),
          currentWorkingDirectoryPath = cwd();

    chdir(subDirectoryPath);

    const output = execute(publishShellCommands, quietly);

    if (!quietly) {
      console.log(` Publishing './${subDirectoryPath}' ("${name}"): ${output}`)
    }

    chdir(currentWorkingDirectoryPath);
  }
}

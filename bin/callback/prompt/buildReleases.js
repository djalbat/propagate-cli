'use strict';

const necessary = require('necessary'),
      childProcess = require('child_process');

const messages = require('../../messages'),
      constants = require('../../constants'),
      configuration = require('../../configuration'),
      promptUtilities = require('../../utilities/prompt'),
      validateUtilities = require('../../utilities/validate');

const { miscellaneousUtilities } = necessary,
      { UTF8 } = constants,
      { prompt } = miscellaneousUtilities,
      { cwd, chdir } = process,
      { validateAnswer } = validateUtilities,
      { isAnswerAffirmative } = promptUtilities,
      { INVALID_ANSWER_MESSAGE } = messages,
      { retrieveTerminalCommands } = configuration;

function buildReleasesPromptCallback(proceed, abort, context) {
  const { forced, quietly, releaseMap } = context,
        releases = releaseMap.getReleases(),
        terminalCommands = retrieveTerminalCommands(),
        { build } = terminalCommands,
        buildTerminalCommands = build,  ///
        currentWorkingDirectoryPath = cwd();

  if (forced) {
    buildReleases(releases, buildTerminalCommands, currentWorkingDirectoryPath, quietly);

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
        buildReleases(releases, buildTerminalCommands, currentWorkingDirectoryPath, quietly);

        proceed();

        return;
      }
    }

    abort();
  });
}

module.exports = buildReleasesPromptCallback;

function buildReleases(releases, buildTerminalCommands, currentWorkingDirectoryPath, quietly) {
  releases.forEach((release) => buildRelease(release, buildTerminalCommands, currentWorkingDirectoryPath, quietly));
}

function buildRelease(release, buildTerminalCommands, currentWorkingDirectoryPath, quietly) {
  const releaseSubDirectoryPath = release.getSubDirectoryPath();

  chdir(releaseSubDirectoryPath);

  const encoding = UTF8,  ///
        options = {
          encoding
        },
        output = childProcess.execSync(buildTerminalCommands, options);

  if (!quietly) {
    console.log(output);
  }

  chdir(currentWorkingDirectoryPath);
}

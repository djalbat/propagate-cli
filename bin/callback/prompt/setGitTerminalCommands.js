'use strict';

const necessary = require('necessary');

const constants = require('../../constants'),
      validateUtilities = require('../../utilities/validate');

const { validateTerminalCommands } = validateUtilities,
      { DEFAULT_GIT_TERMINAL_COMMANDS } = constants;

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities;

function setGitTerminalCommandsPromptCallback(proceed, abort, context) {
  const { terminalCommands } = context,
        { git } = terminalCommands,
        initialValue = git, ///
        validationFunction = validateTerminalCommands,  ///
        description = 'Git terminal commands (leave blank for default): ',
        options = {
          description,
          initialValue,
          validationFunction
        };

  prompt(options, (git) => {
    git = git || DEFAULT_GIT_TERMINAL_COMMANDS; ///

    Object.assign(terminalCommands, {
      git
    });

    proceed();
  });
}

module.exports = setGitTerminalCommandsPromptCallback;

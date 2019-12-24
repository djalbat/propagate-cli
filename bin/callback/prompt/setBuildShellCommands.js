'use strict';

const necessary = require('necessary');

const constants = require('../../constants'),
      validateUtilities = require('../../utilities/validate');

const { validateSHELLCommands } = validateUtilities,
      { DEFAULT_BUILD_SHELL_COMMANDS } = constants;

const { miscellaneousUtilities } = necessary,
      { prompt } = miscellaneousUtilities;

function setBuildShellCommandsPromptCallback(proceed, abort, context) {
  const { shellCommands } = context,
        { build } = shellCommands,
        initialValue = build, //
        validationFunction = validateSHELLCommands,  ///
        description = 'Build shell commands (leave blank for default): ',
        options = {
          description,
          initialValue,
          validationFunction
        };

  prompt(options, (build) => {
    build = build || DEFAULT_BUILD_SHELL_COMMANDS; ///

    Object.assign(shellCommands, {
      build
    });

    proceed();
  });
}

module.exports = setBuildShellCommandsPromptCallback;
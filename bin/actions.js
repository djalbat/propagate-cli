'use strict';

const commands = require('./commands'),
      options = require('./options'),
      help = require('./action/help'),
      version = require('./action/version'),
      propagate = require('./action/propagate'),
      initialise = require('./action/initialise'),
      setOptions = require('./action/setOptions');

const { HELP_OPTION, VERSION_OPTION } = options,
      { HELP_COMMAND,
        VERSION_COMMAND,
        PROPAGATE_COMMAND,
        INITIALISE_COMMAND,
        SET_OPTIONS_COMMAND } = commands;

function actions(command, argument, options) {
  const commandMissing = (command === null),
        helpOptionPresent = options.hasOwnProperty(HELP_OPTION),
        versionOptionPresent = options.hasOwnProperty(VERSION_OPTION);

  if (false) {
    ///
  } else if (versionOptionPresent) {
    command = VERSION_COMMAND;
  } else if (helpOptionPresent) {
    command = HELP_COMMAND;
  } else if (commandMissing) {
    command = PROPAGATE_COMMAND;
  }

  switch (command) {
    case HELP_COMMAND: help(); break;
    case VERSION_COMMAND: version(); break;
    case PROPAGATE_COMMAND: propagate(argument); break;
    case INITIALISE_COMMAND: initialise(); break;
    case SET_OPTIONS_COMMAND: setOptions(); break;

    default:
      argument = command;  ///

      propagate(argument);
      break;
  }
}

module.exports = actions;

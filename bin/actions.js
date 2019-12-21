'use strict';

const commands = require('./commands'),
      options = require('./options'),
      help = require('./action/help'),
      version = require('./action/version'),
      propagate = require('./action/propagate'),
      initialise = require('./action/initialise'),
      addDirectory = require('./action/addDirectory'),
      removeDirectory = require('./action/removeDirectory'),
      listDirectories = require('./action/listDirectories');

const { HELP_OPTION,
        VERSION_OPTION,
        QUIETLY_OPTION  } = options,
      { HELP_COMMAND,
        VERSION_COMMAND,
        PROPAGATE_COMMAND,
        INITIALISE_COMMAND,
        ADD_DIRECTORY_COMMAND,
        REMOVE_DIRECTORY_COMMAND,
        LIST_DIRECTORIES_COMMAND } = commands;

function actions(command, argument, options) {
  const commandMissing = (command === null),
        helpOptionPresent = options.hasOwnProperty(HELP_OPTION),
        versionOptionPresent = options.hasOwnProperty(VERSION_OPTION),
        quietlyOptionPresent = options.hasOwnProperty(QUIETLY_OPTION),
        quietly = quietlyOptionPresent; ///

  if (false) {
    ///
  } else if (versionOptionPresent) {
    command = VERSION_COMMAND;
  } else if (helpOptionPresent) {
    command = HELP_COMMAND;
  } else if (commandMissing) {
    command = PROPAGATE_COMMAND;
  }

  if (  (command !== HELP_COMMAND)
     && (command !== VERSION_COMMAND)
     && (command !== PROPAGATE_COMMAND)
     && (command !== INITIALISE_COMMAND)
     && (command !== ADD_DIRECTORY_COMMAND)
     && (command !== REMOVE_DIRECTORY_COMMAND)
     && (command !== LIST_DIRECTORIES_COMMAND) ) {

    argument = command; ///

    command = PROPAGATE_COMMAND;
  }

  switch (command) {
    case HELP_COMMAND : help(); break;
    case VERSION_COMMAND : version(); break;
    case PROPAGATE_COMMAND : propagate(argument, quietly); break;
    case INITIALISE_COMMAND : initialise(); break;
    case ADD_DIRECTORY_COMMAND : addDirectory(); break;
    case REMOVE_DIRECTORY_COMMAND : removeDirectory(); break;
    case LIST_DIRECTORIES_COMMAND : listDirectories(); break;

    default :
      argument = command;  ///

      propagate(argument);

      break;
  }
}

module.exports = actions;

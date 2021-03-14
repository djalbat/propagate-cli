"use strict";

const help = require("./action/help"),
      version = require("./action/version"),
      propagate = require("./action/propagate"),
      initialise = require("./action/initialise"),
      addDirectory = require("./action/addDirectory"),
      removeDirectory = require("./action/removeDirectory"),
      listDirectories = require("./action/listDirectories"),
      setShellCommands = require("./action/setShellCommands"),
      addIgnoredDependency = require("./action/addIgnoredDependency"),
      removeIgnoredDependency = require("./action/removeIgnoredDependency"),
      listIgnoredDependencies = require("./action/listIgnoredDependencies");

const { isOptionPresent } = require("./utilities/option"),
      { YES_OPTION, HELP_OPTION, VERSION_OPTION, QUIETLY_OPTION, DRY_RUN_OPTION  } = require("./options"),
      { HELP_COMMAND,
        VERSION_COMMAND,
        PROPAGATE_COMMAND,
        INITIALISE_COMMAND,
        ADD_DIRECTORY_COMMAND,
        REMOVE_DIRECTORY_COMMAND,
        LIST_DIRECTORIES_COMMAND,
        SET_SHELL_COMMANDS_COMMAND,
        ADD_IGNORED_DEPENDENCY_COMMAND,
        REMOVE_IGNORED_DEPENDENCY_COMMAND,
        LIST_IGNORED_DEPENDENCIES_COMMAND } = require("./commands");

function actions(command, argument, options) {
  const commandMissing = (command === null),
        yesOptionPresent = isOptionPresent(YES_OPTION, options),
        helpOptionPresent = isOptionPresent(HELP_OPTION, options),
        dryRunOptionPresent = isOptionPresent(DRY_RUN_OPTION, options),
        versionOptionPresent = isOptionPresent(VERSION_OPTION, options),
        quietlyOptionPresent = isOptionPresent(QUIETLY_OPTION, options),
        quietly = quietlyOptionPresent, ///
        dryRun = dryRunOptionPresent, ///
        yes = yesOptionPresent; ///

  if (false) {
    ///
  } else if (versionOptionPresent) {
    command = VERSION_COMMAND;
  } else if (helpOptionPresent) {
    command = HELP_COMMAND;
  } else if (commandMissing) {
    command = HELP_COMMAND;
  }

  if (  (command !== HELP_COMMAND)
     && (command !== VERSION_COMMAND)
     && (command !== PROPAGATE_COMMAND)
     && (command !== INITIALISE_COMMAND)
     && (command !== ADD_DIRECTORY_COMMAND)
     && (command !== REMOVE_DIRECTORY_COMMAND)
     && (command !== LIST_DIRECTORIES_COMMAND)
     && (command !== SET_SHELL_COMMANDS_COMMAND)
     && (command !== ADD_IGNORED_DEPENDENCY_COMMAND)
     && (command !== REMOVE_IGNORED_DEPENDENCY_COMMAND)
     && (command !== LIST_IGNORED_DEPENDENCIES_COMMAND) ) {

    argument = command; ///

    command = PROPAGATE_COMMAND;
  }

  switch (command) {
    case HELP_COMMAND : help(); break;
    case VERSION_COMMAND : version(); break;
    case PROPAGATE_COMMAND : propagate(argument, quietly, dryRun, yes); break;
    case INITIALISE_COMMAND : initialise(); break;
    case ADD_DIRECTORY_COMMAND : addDirectory(); break;
    case REMOVE_DIRECTORY_COMMAND : removeDirectory(); break;
    case LIST_DIRECTORIES_COMMAND : listDirectories(); break;
    case SET_SHELL_COMMANDS_COMMAND : setShellCommands(); break;
    case ADD_IGNORED_DEPENDENCY_COMMAND : addIgnoredDependency(); break;
    case REMOVE_IGNORED_DEPENDENCY_COMMAND : removeIgnoredDependency(); break;
    case LIST_IGNORED_DEPENDENCIES_COMMAND : listIgnoredDependencies(); break;
  }
}

module.exports = actions;

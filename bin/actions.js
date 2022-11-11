"use strict";

const helpAction = require("./action/help"),
      versionAction = require("./action/version"),
      propagateAction = require("./action/propagate"),
      initialiseAction = require("./action/initialise"),
      addDirectoryAction = require("./action/addDirectory"),
      removeDirectoryAction = require("./action/removeDirectory"),
      listDirectoriesAction = require("./action/listDirectories"),
      setShellCommandsAction = require("./action/setShellCommands"),
      addIgnoredDependencyAction = require("./action/addIgnoredDependency"),
      listIgnoredDependenciesAction = require("./action/listIgnoredDependencies"),
      removeIgnoredDependencyAction = require("./action/removeIgnoredDependency"),
      addForcedDependencyRelationAction = require("./action/addForcedDependencyRelation"),
      listForcedDependencyRelationsAction = require("./action/listForcedDependencyRelations"),
      removeForcedDependencyRelationAction = require("./action/removeForcedDependencyRelation");

const { DEFAULT_YES, DEFAULT_QUIETLY, DEFAULT_DRY_RUN, DEFAULT_HELP, DEFAULT_VERSION} = require("./defaults"),
      { HELP_COMMAND,
        VERSION_COMMAND,
        PROPAGATE_COMMAND,
        INITIALISE_COMMAND,
        ADD_DIRECTORY_COMMAND,
        REMOVE_DIRECTORY_COMMAND,
        LIST_DIRECTORIES_COMMAND,
        SET_SHELL_COMMANDS_COMMAND,
        ADD_IGNORED_DEPENDENCY_COMMAND,
        LIST_IGNORED_DEPENDENCIES_COMMAND,
        REMOVE_IGNORED_DEPENDENCY_COMMAND,
        ADD_FORCED_DEPENDENCY_RELATION_COMMAND,
        LIST_FORCED_DEPENDENCY_RELATIONS_COMMAND,
        REMOVE_FORCED_DEPENDENCY_RELATION_COMMAND } = require("./commands");

function actions(command, argument, options) {
  const commandMissing = (command === null),
        { yes = DEFAULT_YES,
          help = DEFAULT_HELP,
          dryRun = DEFAULT_DRY_RUN,
          version = DEFAULT_VERSION,
          quietly = DEFAULT_QUIETLY } = options;

  if (false) {
    ///
  } else if (help) {
    command = HELP_COMMAND;
  } else if (version) {
    command = VERSION_COMMAND;
  } else if (commandMissing) {
    command = HELP_COMMAND;
  }

  switch (command) {
    case HELP_COMMAND : helpAction(); break;
    case VERSION_COMMAND : versionAction(); break;
    case PROPAGATE_COMMAND : propagateAction(argument, quietly, dryRun, yes); break;
    case INITIALISE_COMMAND : initialiseAction(); break;
    case ADD_DIRECTORY_COMMAND : addDirectoryAction(); break;
    case REMOVE_DIRECTORY_COMMAND : removeDirectoryAction(); break;
    case LIST_DIRECTORIES_COMMAND : listDirectoriesAction(); break;
    case SET_SHELL_COMMANDS_COMMAND : setShellCommandsAction(); break;
    case ADD_IGNORED_DEPENDENCY_COMMAND : addIgnoredDependencyAction(); break;
    case LIST_IGNORED_DEPENDENCIES_COMMAND : listIgnoredDependenciesAction(); break;
    case REMOVE_IGNORED_DEPENDENCY_COMMAND : removeIgnoredDependencyAction(); break;
    case ADD_FORCED_DEPENDENCY_RELATION_COMMAND : addForcedDependencyRelationAction(); break;
    case LIST_FORCED_DEPENDENCY_RELATIONS_COMMAND : listForcedDependencyRelationsAction(); break;
    case REMOVE_FORCED_DEPENDENCY_RELATION_COMMAND : removeForcedDependencyRelationAction(); break;

    default:
      argument = command; ///

      propagateAction(argument, quietly, dryRun, yes);
  }
}

module.exports = actions;

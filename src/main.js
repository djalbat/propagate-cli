"use strict";

import helpAction from "./action/help";
import versionAction from "./action/version";
import propagateAction from "./action/propagate";
import initialiseAction from "./action/initialise";
import addDirectoryAction from "./action/addDirectory";
import removeDirectoryAction from "./action/removeDirectory";
import listDirectoriesAction from "./action/listDirectories";
import setShellCommandsAction from "./action/setShellCommands";
import addIgnoredDependencyAction from "./action/addIgnoredDependency";
import listIgnoredDependenciesAction from "./action/listIgnoredDependencies";
import removeIgnoredDependencyAction from "./action/removeIgnoredDependency";
import addForcedDependencyRelationAction from "./action/addForcedDependencyRelation";
import listForcedDependencyRelationsAction from "./action/listForcedDependencyRelations";
import removeForcedDependencyRelationAction from "./action/removeForcedDependencyRelation";

import { NO_ARGUMENT_GIVEN_MESSAGE, COMMAND_NOT_RECOGNISED_MESSAGE } from "./messages";
import { DEFAULT_YES, DEFAULT_QUIETLY, DEFAULT_DRY_RUN } from "./defaults";
import { HELP_COMMAND,
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
        REMOVE_FORCED_DEPENDENCY_RELATION_COMMAND } from "./commands";

export default function main(command, argument, options) {
  const { yes = DEFAULT_YES,
          dryRun = DEFAULT_DRY_RUN,
          quietly = DEFAULT_QUIETLY } = options;

  switch (command) {
    case HELP_COMMAND: {
      helpAction();

      break;
    }

    case VERSION_COMMAND: {
      versionAction();

      break;
    }

    case INITIALISE_COMMAND: {
      initialiseAction();

      break;
    }

    case PROPAGATE_COMMAND: {
      if (argument === null) {
        console.log(NO_ARGUMENT_GIVEN_MESSAGE);
      } else {
        const subDirectoryName = argument;  ///

        propagateAction(subDirectoryName, quietly, dryRun, yes);
      }

      break;
    }

    case ADD_DIRECTORY_COMMAND: {
      addDirectoryAction();

      break;
    }

    case REMOVE_DIRECTORY_COMMAND: {
      removeDirectoryAction();

      break;
    }

    case LIST_DIRECTORIES_COMMAND: {
      listDirectoriesAction();

      break;
    }

    case SET_SHELL_COMMANDS_COMMAND: {
      setShellCommandsAction();

      break;
    }

    case ADD_IGNORED_DEPENDENCY_COMMAND: {
      addIgnoredDependencyAction();

      break;
    }

    case LIST_IGNORED_DEPENDENCIES_COMMAND: {
      listIgnoredDependenciesAction();

      break;
    }

    case REMOVE_IGNORED_DEPENDENCY_COMMAND: {
      removeIgnoredDependencyAction();

      break;
    }

    case ADD_FORCED_DEPENDENCY_RELATION_COMMAND: {
      addForcedDependencyRelationAction();

      break;
    }

    case LIST_FORCED_DEPENDENCY_RELATIONS_COMMAND: {
      listForcedDependencyRelationsAction();

      break;
    }

    case REMOVE_FORCED_DEPENDENCY_RELATION_COMMAND: {
      removeForcedDependencyRelationAction();

      break;
    }

    default: {
      console.log(COMMAND_NOT_RECOGNISED_MESSAGE);

      break;
    }
  }
}

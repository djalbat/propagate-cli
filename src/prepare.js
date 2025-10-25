"use strict";

import changeDirectory from "./changeDirectory";

import { DEFAULT_HELP, DEFAULT_VERSION } from "./defaults";
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

export function prepare(command, argument, options, main) {
  const { help = DEFAULT_HELP, version = DEFAULT_VERSION } = options;

  if (false) {
    ///
  } else if (help) {
    command = HELP_COMMAND;
  } else if (version) {
    command = VERSION_COMMAND;
  }

  if ((command === HELP_COMMAND) ||
      (command === VERSION_COMMAND) ||
      (command === INITIALISE_COMMAND)) {

    main(command, argument, options);

    return;
  }

  const directoryName = changeDirectory();

  if (directoryName !== null) {
    argument = directoryName; ///
  }

  if (argument === null) {
    if ((command !== ADD_DIRECTORY_COMMAND) &&
        (command !== REMOVE_DIRECTORY_COMMAND) &&
        (command !== LIST_DIRECTORIES_COMMAND) &&
        (command !== SET_SHELL_COMMANDS_COMMAND) &&
        (command !== ADD_IGNORED_DEPENDENCY_COMMAND) &&
        (command !== LIST_IGNORED_DEPENDENCIES_COMMAND) &&
        (command !== REMOVE_IGNORED_DEPENDENCY_COMMAND) &&
        (command !== ADD_FORCED_DEPENDENCY_RELATION_COMMAND) &&
        (command !== LIST_FORCED_DEPENDENCY_RELATIONS_COMMAND) &&
        (command !== REMOVE_FORCED_DEPENDENCY_RELATION_COMMAND)) {

      argument = command; ///

      command = PROPAGATE_COMMAND;
    }
  }

  if (command === null) {
    command = PROPAGATE_COMMAND;
  }

  main(command, argument, options);
}

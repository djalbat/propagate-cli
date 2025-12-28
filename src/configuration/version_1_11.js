"use strict";

import { VERSION_1_11 } from "../versions";
import { DEFAULT_GIT_SHELL_COMMANDS, DEFAULT_POLL_SHELL_COMMANDS, DEFAULT_INSTALL_SHELL_COMMANDS, DEFAULT_BUILD_SHELL_COMMANDS, DEFAULT_PUBLISH_SHELL_COMMANDS } from "../defaults";

export function createConfiguration() {
  const git = DEFAULT_GIT_SHELL_COMMANDS,
        poll = DEFAULT_POLL_SHELL_COMMANDS,
        build = DEFAULT_BUILD_SHELL_COMMANDS,
        install = DEFAULT_INSTALL_SHELL_COMMANDS,
        publish = DEFAULT_PUBLISH_SHELL_COMMANDS,
        version = VERSION_1_11,
        directories = [],
        shellCommands = {
          git,
          poll,
          build,
          install,
          publish
        },
        ignoredBuilds = [],
        ignoredPublishes = [],
        ignoredDependencies = [],
        forcedDependencyRelations = [],
        configuration = {
          version,
          directories,
          shellCommands,
          ignoredBuilds,
          ignoredPublishes,
          ignoredDependencies,
          forcedDependencyRelations
        };

  return configuration;
}

export function migrateConfigurationToVersion_1_11(configuration) {
  const version = VERSION_1_11;

  let { shellCommands } = configuration;

  const poll = DEFAULT_POLL_SHELL_COMMANDS;

  shellCommands = Object.assign(shellCommands, {
    poll
  });

  configuration = Object.assign(configuration, {
    version,
    shellCommands
  });

  return configuration;
}

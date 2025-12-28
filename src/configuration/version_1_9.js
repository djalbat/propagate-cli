"use strict";

import { VERSION_1_9 } from "../versions";
import { DEFAULT_INSTALL_SHELL_COMMANDS } from "../defaults";

export function migrateConfigurationToVersion_1_9(configuration) {
  const version = VERSION_1_9;

  let { shellCommands } = configuration;

  const install = DEFAULT_INSTALL_SHELL_COMMANDS;

  shellCommands = Object.assign(shellCommands, {
    install
  });

  configuration = Object.assign(configuration, {
    version,
    shellCommands
  });

  return configuration;
}

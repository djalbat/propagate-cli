"use strict";

const { VERSION_1_9 } = require("../versions"),
      { DEFAULT_INSTALL_SHELL_COMMANDS } = require("../defaults");

function migrateConfigurationToVersion_1_9(configuration) {
  const version = VERSION_1_9;

  let { shellCommands } = configuration;

  const install = DEFAULT_INSTALL_SHELL_COMMANDS;  ///

  shellCommands = Object.assign(shellCommands, {
    install
  });

  configuration = Object.assign(configuration, {
    version,
    shellCommands
  });

  return configuration;
}

module.exports = {
  migrateConfigurationToVersion_1_9
};

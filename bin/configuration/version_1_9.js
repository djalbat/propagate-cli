"use strict";

const { VERSION_1_9 } = require("../versions"),
      { DEFAULT_GIT_SHELL_COMMANDS, DEFAULT_INSTALL_SHELL_COMMANDS, DEFAULT_BUILD_SHELL_COMMANDS, DEFAULT_PUBLISH_SHELL_COMMANDS } = require("../defaults"),
      git = DEFAULT_GIT_SHELL_COMMANDS,  ///
      build = DEFAULT_BUILD_SHELL_COMMANDS,  ///
      install = DEFAULT_INSTALL_SHELL_COMMANDS,  ///
      publish = DEFAULT_PUBLISH_SHELL_COMMANDS,  ///
      defaultShellCommands = {
        git,
        build,
        install,
        publish
      };

function createConfiguration() {
  const version = VERSION_1_9,  ///
        directories = [],
        shellCommands = defaultShellCommands, ///
        ignoredDependencies = [],
        forcedDependencyRelations = [],
        configuration = {
          version,
          directories,
          shellCommands,
          ignoredDependencies,
          forcedDependencyRelations
        };

  return configuration;
}

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
  createConfiguration,
  migrateConfigurationToVersion_1_9
};

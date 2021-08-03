"use strict";

const { VERSION_1_7 } = require("../versions"),
      { DEFAULT_GIT_SHELL_COMMANDS, DEFAULT_BUILD_SHELL_COMMANDS, DEFAULT_PUBLISH_SHELL_COMMANDS } = require("../constants"),
      git = DEFAULT_GIT_SHELL_COMMANDS,  ///
      build = DEFAULT_BUILD_SHELL_COMMANDS,  ///
      publish = DEFAULT_PUBLISH_SHELL_COMMANDS,  ///
      defaultShellCommands = {
        git,
        build,
        publish
      };

function createConfiguration() {
  const version = VERSION_1_7,  ///
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
        } ;

  return configuration;
}

function migrateConfigurationToVersion_1_7(configuration) {
  const version = VERSION_1_7,
        forcedDependencyRelations = [];

  configuration = Object.assign(configuration, {
    version,
    forcedDependencyRelations
  });

  return configuration;
}

module.exports = {
  createConfiguration,
  migrateConfigurationToVersion_1_7
};

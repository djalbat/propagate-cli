"use strict";

const { VERSION_1_3 } = require("../versions"),
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
  const version = VERSION_1_3,  ///
        directories = [],
        shellCommands = defaultShellCommands, ///
        ignoredDependencies = [],
        configuration = {
          version,
          directories,
          shellCommands,
          ignoredDependencies
        } ;

  return configuration;
}

function migrateConfigurationToVersion_1_3(configuration) {
  const version = VERSION_1_3,
        ignoredDependencies = [];

  configuration = Object.assign(configuration, {
    version,
    ignoredDependencies
  });

  return configuration;
}

module.exports = {
  createConfiguration,
  migrateConfigurationToVersion_1_3
};

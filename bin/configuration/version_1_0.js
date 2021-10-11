"use strict";

const { VERSION_1_0 } = require("../versions"),
      { DEFAULT_GIT_SHELL_COMMANDS, DEFAULT_BUILD_SHELL_COMMANDS, DEFAULT_PUBLISH_SHELL_COMMANDS } = require("../defaults"),
      git = DEFAULT_GIT_SHELL_COMMANDS,  ///
      build = DEFAULT_BUILD_SHELL_COMMANDS,  ///
      publish = DEFAULT_PUBLISH_SHELL_COMMANDS,  ///
      defaultShellCommands = {
        git,
        build,
        publish
      };

function createConfiguration() {
  const version = VERSION_1_0,  ///
        directories = [],
        shellCommands = defaultShellCommands, ///
        configuration = {
          version,
          directories,
          shellCommands
        } ;

  return configuration;
}

function migrateConfigurationToVersion_1_0(configuration) {
  const version = VERSION_1_0;

  configuration = Object.assign(configuration, {
    version
  });

  return configuration;
}

module.exports = {
  createConfiguration,
  migrateConfigurationToVersion_1_0
};

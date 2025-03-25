"use strict";

const { VERSION_1_10 } = require("../versions"),
      { DEFAULT_GIT_SHELL_COMMANDS, DEFAULT_INSTALL_SHELL_COMMANDS, DEFAULT_BUILD_SHELL_COMMANDS, DEFAULT_PUBLISH_SHELL_COMMANDS } = require("../defaults");

function createConfiguration() {
  const git = DEFAULT_GIT_SHELL_COMMANDS,  ///
        build = DEFAULT_BUILD_SHELL_COMMANDS,  ///
        install = DEFAULT_INSTALL_SHELL_COMMANDS,  ///
        publish = DEFAULT_PUBLISH_SHELL_COMMANDS,  ///
        version = VERSION_1_10,  ///
        directories = [],
        shellCommands = {
          git,
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

function migrateConfigurationToVersion_1_10(configuration) {
  const version = VERSION_1_10,  ///
        ignoredBuilds = [],
        ignoredPublishes = [];

  configuration = Object.assign(configuration, {
    version,
    ignoredBuilds,
    ignoredPublishes
  });

  return configuration;
}

module.exports = {
  createConfiguration,
  migrateConfigurationToVersion_1_10
};

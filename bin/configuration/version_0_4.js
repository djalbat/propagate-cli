'use strict';

const versions = require('../versions'),
      constants = require('../constants');

const { VERSION_0_4 } = versions,
      { DEFAULT_GIT_SHELL_COMMANDS, DEFAULT_BUILD_SHELL_COMMANDS, DEFAULT_PUBLISH_SHELL_COMMANDS } = constants,
      git = DEFAULT_GIT_SHELL_COMMANDS,  ///
      build = DEFAULT_BUILD_SHELL_COMMANDS,  ///
      publish = DEFAULT_PUBLISH_SHELL_COMMANDS,  ///
      defaultShellCommands = {
        git,
        build,
        publish
      };

function createConfiguration() {
  const version = VERSION_0_4,  ///
        directories = [],
        shellCommands = defaultShellCommands, ///
        configuration = {
          version,
          directories,
          shellCommands
        } ;

  return configuration;
}

function migrateConfigurationToVersion_0_4(configuration) {
  const { directories, terminalCommands } = configuration;

  const version = VERSION_0_4,  ///
        shellCommands = terminalCommands; ///

  configuration = {
    version,
    directories,
    shellCommands
  };

  return configuration;
}


module.exports = {
  createConfiguration,
  migrateConfigurationToVersion_0_4
};

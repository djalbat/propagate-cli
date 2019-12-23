'use strict';

const versions = require('../versions'),
      constants = require('../constants');

const { VERSION_0_3 } = versions,
      { DEFAULT_GIT_TERMINAL_COMMANDS, DEFAULT_BUILD_TERMINAL_COMMANDS, DEFAULT_PUBLISH_TERMINAL_COMMANDS } = constants,
      git = DEFAULT_GIT_TERMINAL_COMMANDS,  ///
      build = DEFAULT_BUILD_TERMINAL_COMMANDS,  ///
      publish = DEFAULT_PUBLISH_TERMINAL_COMMANDS,  ///
      defaultTerminalCommands = {
        git,
        build,
        publish
      };

function createConfiguration() {
  const version = VERSION_0_3,  ///
        directories = [],
        terminalCommands = defaultTerminalCommands, ///
        configuration = {
          version,
          directories,
          terminalCommands
        } ;

  return configuration;
}

function migrateConfigurationToVersion_0_3(configuration) {
  const { directories } = configuration;

  const version = VERSION_0_3,  ///
        terminalCommands = defaultTerminalCommands; ///

  configuration = {
    version,
    directories,
    terminalCommands
  };

  return configuration;
}


module.exports = {
  createConfiguration,
  migrateConfigurationToVersion_0_3
};

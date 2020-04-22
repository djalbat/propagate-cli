"use strict";

const versions = require("../versions"),
      constants = require("../constants");

const { VERSION_1_0 } = versions,
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

module.exports = {
  createConfiguration
};

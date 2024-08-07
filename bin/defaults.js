"use strict";

const DEFAULT_YES = false,
      DEFAULT_HELP = false,
      DEFAULT_VERSION = false,
      DEFAULT_DRY_RUN = false,
      DEFAULT_QUIETLY = false,
      DEFAULT_DIRECTORY_NAME = ".",
      DEFAULT_GIT_SHELL_COMMANDS = "git add .; git commit -m \"Propagated.\"; git push",
      DEFAULT_BUILD_SHELL_COMMANDS = "npm run build",
      DEFAULT_INSTALL_SHELL_COMMANDS = "npm install",
      DEFAULT_PUBLISH_SHELL_COMMANDS = "npm publish";

module.exports = {
  DEFAULT_YES,
  DEFAULT_HELP,
  DEFAULT_VERSION,
  DEFAULT_DRY_RUN,
  DEFAULT_QUIETLY,
  DEFAULT_DIRECTORY_NAME,
  DEFAULT_GIT_SHELL_COMMANDS,
  DEFAULT_BUILD_SHELL_COMMANDS,
  DEFAULT_INSTALL_SHELL_COMMANDS,
  DEFAULT_PUBLISH_SHELL_COMMANDS
};

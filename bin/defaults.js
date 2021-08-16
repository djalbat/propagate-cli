"use strict";

const DEFAULT_DIRECTORY_NAME = ".",
      DEFAULT_GIT_SHELL_COMMANDS = "git add .; git commit -m \"Propagated.\"; git push",
      DEFAULT_BUILD_SHELL_COMMANDS = "npm install; npm run build",
      DEFAULT_PUBLISH_SHELL_COMMANDS = "npm publish";

module.exports = {
  DEFAULT_DIRECTORY_NAME,
  DEFAULT_GIT_SHELL_COMMANDS,
  DEFAULT_BUILD_SHELL_COMMANDS,
  DEFAULT_PUBLISH_SHELL_COMMANDS
};

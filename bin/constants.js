"use strict";

const YES = "yes",
      UTF8 = "utf-8",
      PROPAGATE_CLI = "Propagate-CLI",
      RC_BASE_EXTENSION = "propagate",
      DEPENDENCIES_NAME = "dependencies",
      DEV_DEPENDENCIES_NAME = "devDependencies",
      DEFAULT_DIRECTORY_NAME = ".",
      PACKAGE_JSON_FILE_NAME = "package.json",
      DEFAULT_GIT_SHELL_COMMANDS = "git add .; git commit -m \"Propagated.\"; git push",
      DEFAULT_BUILD_SHELL_COMMANDS = "npm install; npm run build",
      DEFAULT_PUBLISH_SHELL_COMMANDS = "npm publish";

module.exports = {
  YES,
  UTF8,
  PROPAGATE_CLI,
  RC_BASE_EXTENSION,
  DEPENDENCIES_NAME,
  DEV_DEPENDENCIES_NAME,
  DEFAULT_DIRECTORY_NAME,
  PACKAGE_JSON_FILE_NAME,
  DEFAULT_GIT_SHELL_COMMANDS,
  DEFAULT_BUILD_SHELL_COMMANDS,
  DEFAULT_PUBLISH_SHELL_COMMANDS
};

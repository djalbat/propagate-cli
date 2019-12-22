'use strict';

const PROPAGATE_CLI = 'Propagate-CLI',
      RC_BASE_EXTENSION = 'propagate',
      DEPENDENCIES_NAME = 'dependencies',
      DEV_DEPENDENCIES_NAME = 'devDependencies',
      PACKAGE_JSON_FILE_NAME = 'package.json',
      DEFAULT_GIT_TERMINAL_COMMANDS = 'git add .; git commit -m "Propagated."; git push',
      DEFAULT_BUILD_TERMINAL_COMMANDS = 'npm install; npm run build',
      DEFAULT_PUBLISH_TERMINAL_COMMANDS = 'npm publish';

module.exports = {
  PROPAGATE_CLI,
  RC_BASE_EXTENSION,
  DEPENDENCIES_NAME,
  DEV_DEPENDENCIES_NAME,
  PACKAGE_JSON_FILE_NAME,
  DEFAULT_GIT_TERMINAL_COMMANDS,
  DEFAULT_BUILD_TERMINAL_COMMANDS,
  DEFAULT_PUBLISH_TERMINAL_COMMANDS
};

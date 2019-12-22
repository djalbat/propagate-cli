'use strict';

const PROPAGATE_CLI = 'Propagate-CLI',
      RC_BASE_EXTENSION = 'propagate',
      DEPENDENCIES_NAME = 'dependencies',
      DEFAULT_GIT_COMMANDS = 'git add . ; git commit -m "Propagated." ; git push',
      DEV_DEPENDENCIES_NAME = 'devDependencies',
      DEFAULT_BUILD_COMMANDS = 'npm install ; npm run build',
      PACKAGE_JSON_FILE_NAME = 'package.json';

module.exports = {
  PROPAGATE_CLI,
  RC_BASE_EXTENSION,
  DEPENDENCIES_NAME,
  DEFAULT_GIT_COMMANDS,
  DEV_DEPENDENCIES_NAME,
  DEFAULT_BUILD_COMMANDS,
  PACKAGE_JSON_FILE_NAME
};

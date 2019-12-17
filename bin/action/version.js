'use strict';

const constants = require('../constants'),
      packageUtilities = require('../utilities/package');

const { PROPAGATE_CLI } = constants,
      { getPackageVersion } = packageUtilities;

function version() {
  const packageVersion = getPackageVersion(),
        version = packageVersion; ///

  console.log(`${PROPAGATE_CLI} version ${version}`);
}

module.exports = version;

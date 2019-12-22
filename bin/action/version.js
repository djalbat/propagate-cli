'use strict';

const constants = require('../constants'),
      packageJSONUtilities = require('../utilities/packageJSON');

const { PROPAGATE_CLI } = constants,
      { getPackageVersion } = packageJSONUtilities;

function version() {
  const packageVersion = getPackageVersion(),
        version = packageVersion; ///

  console.log(`${PROPAGATE_CLI} version ${version}`);
}

module.exports = version;

"use strict";

const { PROPAGATE_CLI } = require("../constants"),
      { getPackageVersion } = require("../utilities/packageJSON");

function version() {
  const packageVersion = getPackageVersion(),
        version = packageVersion; ///

  console.log(`${PROPAGATE_CLI} version ${version}`);
}

module.exports = version;

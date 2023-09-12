"use strict";

const { packageUtilities } = require("necessary");

const { PROPAGATE_CLI } = require("../constants");

const { getVersion } = packageUtilities;

function versionAction() {
  const version = getVersion(); ///

  console.log(`${PROPAGATE_CLI} version ${version}`);
}

module.exports = versionAction;

"use strict";

const path = require("path");

function absolutePathFromName(name) {
  const currentWorkingDirectoryPath = process.cwd(), ///
        absolutePath = path.join(currentWorkingDirectoryPath, name);

  return absolutePath;
}

module.exports = {
  absolutePathFromName
};

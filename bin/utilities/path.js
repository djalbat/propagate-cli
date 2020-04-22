"use strict";

const path = require("path");

const { cwd } = process;

function absolutePathFromName(name) {
  const currentWorkingDirectoryPath = cwd(), ///
        absolutePath = path.join(currentWorkingDirectoryPath, name);

  return absolutePath;
}

module.exports = {
  absolutePathFromName
};

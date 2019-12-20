'use strict';

const path = require('path');

const { cwd } = process,
      { join } = path;

function absolutePathFromName(name) {
  const currentWorkingDirectoryPath = cwd(), ///
        absolutePath = join(currentWorkingDirectoryPath, name);

  return absolutePath;
}

module.exports = {
  absolutePathFromName
};

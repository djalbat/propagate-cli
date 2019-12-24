'use strict';

const childProcess = require('child_process');

const constants = require('../constants');

const { UTF8 } = constants;

function execute(shellCommands) {
  const encoding = UTF8,  ///
        options = {
          encoding
        },
        output = childProcess.execSync(shellCommands, options);

  return output;
}

module.exports = {
  execute
};

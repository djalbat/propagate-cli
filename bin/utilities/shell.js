"use strict";

const childProcess = require("child_process");

const constants = require("../constants");

const { UTF8 } = constants,
      { stdout } = process;

function execute(shellCommands, quietly) {
  const encoding = UTF8,  ///
        options = {
          encoding
        },
        output = childProcess.execSync(shellCommands, options);

  if (!quietly) {
    stdout.write(output);
  }
}

module.exports = {
  execute
};

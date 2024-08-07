#!/usr/bin/env node

const { parseArgv } = require("argumentative"),
      { arrayUtilities } = require("necessary");

const main = require("./bin/main"),
      prepare = require("./bin/prepare"),
      abbreviations = require("./bin/abbreviations");

const { first, second } = arrayUtilities;

const { commands, options } = parseArgv(process.argv, abbreviations),
      firstCommand = first(commands),
      secondCommand = second(commands),
      command = firstCommand || null, ///
      argument = secondCommand || null; ///

prepare(command, argument, options, main);

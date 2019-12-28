'use strict';

const options = require('./options');

const { HELP_OPTION, FORCE_OPTION, VERSION_OPTION, QUIETLY_OPTION } = options;

module.exports = {
  'h' : HELP_OPTION,
  'f' : FORCE_OPTION,
  'v' : VERSION_OPTION,
  'q' : QUIETLY_OPTION
};

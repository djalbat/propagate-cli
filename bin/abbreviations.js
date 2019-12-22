'use strict';

const options = require('./options');

const { HELP_OPTION, FORCED_OPTION, VERSION_OPTION, QUIETLY_OPTION } = options;

module.exports = {
  'h' : HELP_OPTION,
  'f' : FORCED_OPTION,
  'v' : VERSION_OPTION,
  'q' : QUIETLY_OPTION
};

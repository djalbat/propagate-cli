"use strict";

const { YES_OPTION, HELP_OPTION, VERSION_OPTION, QUIETLY_OPTION, DRY_RUN_OPTION } = require("./options");

module.exports = {
  "y": YES_OPTION,
  "h": HELP_OPTION,
  "v": VERSION_OPTION,
  "q": QUIETLY_OPTION,
  "d": DRY_RUN_OPTION
};

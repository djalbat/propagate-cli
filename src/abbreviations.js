"use strict";

import { YES_OPTION, HELP_OPTION, VERSION_OPTION, QUIETLY_OPTION, DRY_RUN_OPTION } from "./options";

const y = YES_OPTION,
      h = HELP_OPTION,
      v = VERSION_OPTION,
      q = QUIETLY_OPTION,
      d = DRY_RUN_OPTION;

const abbreviations = {
  y,
  h,
  v,
  q,
  d
};

export default abbreviations;

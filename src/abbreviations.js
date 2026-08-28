"use strict";

import { YES_OPTION, HELP_OPTION, DELAY_OPTION, VERSION_OPTION, QUIETLY_OPTION, DRY_RUN_OPTION, ATTEMPTS_OPTION } from "./options";

const y = YES_OPTION,
      h = HELP_OPTION,
      w = DELAY_OPTION,
      v = VERSION_OPTION,
      q = QUIETLY_OPTION,
      d = DRY_RUN_OPTION,
      a = ATTEMPTS_OPTION;

const abbreviations = {
  y,
  h,
  w,
  v,
  q,
  d,
  a
};

export default abbreviations;

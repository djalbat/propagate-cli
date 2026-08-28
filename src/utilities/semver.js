"use strict";

import { EMPTY_STRING } from "../constants";

export function trimRangeModifier(semver) {
  semver = semver.replace(/^[=v<>~^]+/g, EMPTY_STRING);

  return semver;
}

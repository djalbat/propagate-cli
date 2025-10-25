"use strict";

export function nextDiffsFromDiff(diff, diffs) {
  const index = diffs.indexOf(diff),
        beginIndex = index + 1,
        nextDiffs = diffs.slice(beginIndex);

  return nextDiffs;
}

export function previousDiffsFromDiff(diff, diffs) {
  const index = diffs.indexOf(diff),
        endIndex = index, ///
        beginIndex = 0,
        previousDiffs = diffs.slice(beginIndex, endIndex);

  return previousDiffs;
}

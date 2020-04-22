"use strict";

function eliminateDiff(diff, diffs) {
  removeDiff(diff, diffs);

  const publishable = diff.isPublishable();

  if (publishable) {
    const name = diff.getName();

    diffs.forEach((diff, index) => {
      if (index > 0) {
        if (diff !== null) {
          diff.removeDependency(name);

          diff.removeDevDependency(name);

          const empty = diff.isEmpty();

          if (empty) {
            eliminateDiff(diff, diffs);
          }
        }
      }
    });
  }
}

module.exports = {
  eliminateDiff
};

function removeDiff(diff, diffs) {
  const index = diffs.indexOf(diff),
        start = index,  ///
        deleteCount = 1;

  diffs.splice(start, deleteCount, null);
}

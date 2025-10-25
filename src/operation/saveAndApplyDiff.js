"use strict";

import gitPromptOperation from "../operation/prompt/git";
import savePromptOperation from "../operation/prompt/save";
import buildPromptOperation from "../operation/prompt/build";
import installPromptOperation from "../operation/prompt/install";
import publishPromptOperation from "../operation/prompt/publish";

import { EMPTY_STRING } from "../constants";
import { executeOperations } from "../utilities/operation";

export default function saveAndApplyDiffOperation(diff, proceed, abort, context) {
  const { diffs } = context,
        index = diffs.indexOf(diff);

  if (index > 0) {
    const dependencyMapDiffEmpty = diff.isDependencyMapDiffEmpty(),
          devDependencyMapDiffEmpty = diff.isDevDependencyMapDiffEmpty();

    if (dependencyMapDiffEmpty && devDependencyMapDiffEmpty) {
      proceed();

      return;
    }
  }

  Object.assign(context, {
    diff
  });

  const operations = [
          savePromptOperation,
          installPromptOperation,
          buildPromptOperation,
          gitPromptOperation,
          publishPromptOperation
        ];

  console.log(EMPTY_STRING);

  executeOperations(operations, (completed) => {
    delete context.diff;

    proceed();
  }, context);
}

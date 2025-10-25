"use strict";

import path from "path";

export function absolutePathFromName(name) {
  const currentWorkingDirectoryPath = process.cwd(), ///
        absolutePath = path.join(currentWorkingDirectoryPath, name);

  return absolutePath;
}

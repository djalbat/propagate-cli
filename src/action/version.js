"use strict";

import { packageUtilities } from "necessary";

import { PROPAGATE_CLI } from "../constants";

const { getVersion } = packageUtilities;

export default function versionAction() {
  const version = getVersion(); ///

  console.log(`${PROPAGATE_CLI} version ${version}`);
}

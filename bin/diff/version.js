"use strict";

const Version = require("../version");

class VersionDiff {
  constructor(version, releaseVersion) {
    this.version = version;
    this.releaseVersion = releaseVersion;
  }

  isEmpty() {
    let empty = true;

    if (this.version !== null) {
      const versionEqualToReleaseVersion = this.version.isEqualTo(this.releaseVersion);

      empty = versionEqualToReleaseVersion; ///
    }

    return empty;
  }

  getVersion() {
    return this.version;
  }

  getReleaseVersion() {
    return this.releaseVersion;
  }

  save(packageJSON) {
    const releaseVersionString = this.releaseVersion.asString(),
          version = releaseVersionString; ///

    Object.assign(packageJSON, {
      version
    });
  }

  asString() {
    const versionString = this.version.asString(),
          releaseVersionString = this.releaseVersion.asString(),
          string = `"${versionString}" -> "${releaseVersionString}"`;

    return string;
  }

  static fromVersionStringAndReleaseVersion(versionString, releaseVersion) {
    const version = Version.fromVersionString(versionString),
          versionDiff = new VersionDiff(version, releaseVersion);

    return versionDiff;
  }
}

module.exports = VersionDiff;

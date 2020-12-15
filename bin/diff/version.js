"use strict";

class VersionDiff {
  constructor(version, releaseVersion) {
    this.version = version;
    this.releaseVersion = releaseVersion;
  }

  isEmpty() {
    const empty = (this.version === this.releaseVersion); ///

    return empty;
  }

  getVersion() {
    return this.version;
  }

  getReleaseVersion() {
    return this.releaseVersion;
  }

  save(packageJSON) {
    const version = this.releaseVersion;  ///

    Object.assign(packageJSON, {
      version
    });
  }

  asString() {
    const string = `"${this.version}" -> "${this.releaseVersion}"`;

    return string;
  }

  static fromVersionAndReleaseVersion(version, releaseVersion) {
    const versionDiff = new VersionDiff(version, releaseVersion);

    return versionDiff;
  }
}

module.exports = VersionDiff;

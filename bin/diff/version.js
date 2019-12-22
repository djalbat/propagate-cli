'use strict';

class VersionDiff {
  constructor(version, releaseVersion) {
    this.version = version;
    this.releaseVersion = releaseVersion;
  }

  getVersion() {
    return this.version;
  }

  getReleaseVersion() {
    return this.releaseVersion;
  }

  asString() {
    const string = `\n  Version: ${this.version} -> ${this.releaseVersion}\n`;

    return string;
  }

  static fromVersionAndReleaseVersion(version, releaseVersion) {
    let versionDiff = null;

    if (version !== releaseVersion) {
      versionDiff = new VersionDiff(version, releaseVersion);
    }

    return versionDiff;
  }
}

module.exports = VersionDiff;

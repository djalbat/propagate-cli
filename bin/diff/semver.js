'use strict';

class SemverDiff {
  constructor(name, semver, releaseSemver) {
    this.name = name;
    this.semver = semver;
    this.releaseSemver = releaseSemver;
  }

  getName() {
    return this.name;
  }

  getSemver() {
    return this.semver;
  }

  getReleaseSemver() {
    return this.releaseSemver;
  }

  save(packageJSON) {
    const semver = this.releaseSemver;

    packageJSON[this.name] = semver;
  }

  asString(last) {
    let string = `     "${this.name}": "${this.semver}" -> "${this.releaseSemver}"`;

    if (!last) {
      string = `${string},\n`;
    }

    return string;
  }

  static fromNameSemverAndReleaseSemver(name, semver, releaseSemver) {
    let semverDiff = null;

    if (semver !== releaseSemver) {
      semverDiff = new SemverDiff(name, semver, releaseSemver);
    }

    return semverDiff;
  }
}

module.exports = SemverDiff;

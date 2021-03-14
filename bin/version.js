"use strict";

const { arrayUtilities } = require("necessary");

const { first, second } = arrayUtilities;

class Version {
  constructor(majorNumber, minorNumber, patchNumber) {
    this.majorNumber = majorNumber;
    this.minorNumber = minorNumber;
    this.patchNumber = patchNumber;
  }

  getMajorNumber() {
    return this.majorNumber;
  }

  getMinorNumber() {
    return this.minorNumber;
  }

  getPatchNumber() {
    return this.patchNumber;
  }

  isEqualTo(version) {
    const number = this.asNumber(),
          versionNumber = version.asNumber(),
          equalTo = (number === versionNumber);

    return equalTo;
  }

  isGreaterThan(version) {
    const number = this.asNumber(),
          versionNumber = version.asNumber(),
          greaterThan = (number > versionNumber);

    return greaterThan;
  }

  asString() {
    const string = `${this.majorNumber}.${this.minorNumber}.${this.patchNumber}`;

    return string;
  }

  asNumber() {
    const number = this.patchNumber * 1e0 + this.minorNumber * 1e6 + this.majorNumber * 1e12; ///

    return number;
  }

  updateSemver(semver) {
    const matches = semver.match(/(^[^\d]*)/),
          firstMatch = first(matches),
          modifier = firstMatch,  ///
          string = this.asString();

    semver = `${modifier}${string}`;

    return semver;
  }

  bumpPatchNumber() {
    this.patchNumber += 1;  ///
  }

  static fromString(string) {
    let version = null;

    const match = /\d+\.\d+\.\d+$/.test(string);

    if (match) {
      const majorNumber = majorNumberFromString(string),
            minorNumber = minorNumberFromString(string),
            patchNumber = patchNumberFromString(string);

      version = new Version(majorNumber, minorNumber, patchNumber);
    }

    return version;
  }

  static fromVersionString(versionString) {
    let version = null;

    if (versionString !== null) {
      const string = versionString; ///

      version = Version.fromString(string);
    }

    return version;
  }
}

module.exports = Version;

function majorNumberFromString(string) {
  const matches = string.match(/(\d+)\.\d+\.\d+$/),
        secondMatch = second(matches),
        majorNumber = Number(secondMatch);

  return majorNumber;
}

function minorNumberFromString(string) {
  const matches = string.match(/\d+\.(\d+)\.\d+$/),
        secondMatch = second(matches),
        minorNumber = Number(secondMatch);

  return minorNumber;
}

function patchNumberFromString(string) {
  const matches = string.match(/\d+\.\d+\.(\d+)$/),
        secondMatch = second(matches),
        patchNumber = Number(secondMatch);

  return patchNumber;
}

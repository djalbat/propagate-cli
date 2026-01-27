"use strict";

import { arrayUtilities } from "necessary";

import SemverDiff from "../diff/semver";

import { EMPTY_STRING } from "../constants";

const { filter } = arrayUtilities;

export default class MapDiff {
  constructor(semverDiffs) {
    this.semverDiffs = semverDiffs;
  }

  getSemverDiffs() {
    return this.semverDiffs;
  }

  isEmpty() {
    const names = Object.keys(this.semverDiffs),  ///
          namesLength = names.length,
          empty = (namesLength === 0);

    return empty;
  }

  save(packageJSON, name) {
    packageJSON = packageJSON[name];  ///

    this.forEachSemverDiff((semverDiff) => {
      semverDiff.save(packageJSON);
    });
  }

  someSemverDiff(callback) { return this.semverDiffs.some(callback); }

  reduceSemverDiff(callback, initialValue) { return this.semverDiffs.reduce(callback, initialValue); }

  forEachSemverDiff(callback) { this.semverDiffs.forEach(callback); }

  removeSemverDiff(name) {
    filter(this.semverDiffs, (semverDiff) => {
      const semverDiffName = semverDiff.getName();

      if (semverDiffName !== name) {
        return true;
      }
    });
  }

  getSpecifiers(specifiers) {
    this.forEachSemverDiff((semverDiff) => {
      const specifier = semverDiff.getSpecifier();

      specifiers.push(specifier);
    });

    return specifiers;
  }

  asString() {
    const semverDiffsLength = this.semverDiffs.length,
          lastIndex = semverDiffsLength - 1,
          semverDiffsString = this.reduceSemverDiff((semverDiffsString, semverDiff, index) => {
            const last = (index === lastIndex),
                  semverDiffString = semverDiff.asString(last);

            semverDiffsString = `${semverDiffsString}${semverDiffString}`;

            return semverDiffsString;
          }, EMPTY_STRING),
          string = `{\n${semverDiffsString}\n   }`;

    return string;
  }

  static fromMapAndReleaseMap(map, releaseMap) {
    const names = Object.keys(map),
          semverDiffs = [];

    names.forEach((name) => {
      const semver = map[name],
            releaseSemver = releaseMap[name],
            semverDiff = SemverDiff.fromNameSemverAndReleaseSemver(name, semver, releaseSemver);

      if (semverDiff !== null) {
        semverDiffs.push(semverDiff);
      }
    });

    const mapDiff = new MapDiff(semverDiffs);

    return mapDiff;
  }
}

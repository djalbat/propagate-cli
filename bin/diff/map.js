'use strict';

const necessary = require('necessary');

const SemverDiff = require('../diff/semver');

const { arrayUtilities } = necessary,
      { filter } = arrayUtilities;

class MapDiff {
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

    this.semverDiffs.forEach((semverDiff) => semverDiff.save(packageJSON))
  }

  removeSemverDiff(name) {
    filter(this.semverDiffs, (semverDiff) => {
      const semverDiffName = semverDiff.getName();

      if (semverDiffName !== name) {
        return true;
      }
    });
  }

  asString() {
    const semverDiffsLength = this.semverDiffs.length,
          lastIndex = semverDiffsLength - 1,
          semverDiffsString = this.semverDiffs.reduce((semverDiffsString, semverDiff, index) => {
            const last = (index === lastIndex),
                  semverDiffString = semverDiff.asString(last);

            semverDiffsString = `${semverDiffsString}${semverDiffString}`;

            return semverDiffsString;
          }, ''),
          string = `{\n${semverDiffsString}\n   }`;

    return string;
  }

  static fromMapAndReleaseMap(map, releaseMap) {
    let mapDiff = null;

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

    const semverDiffsLength = semverDiffs.length;

    if (semverDiffsLength > 0) {
      mapDiff = new MapDiff(semverDiffs);
    }

    return mapDiff;
  }
}

module.exports = MapDiff;

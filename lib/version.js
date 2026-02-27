"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Version;
    }
});
const _necessary = require("necessary");
const { first, second } = _necessary.arrayUtilities;
class Version {
    constructor(majorNumber, minorNumber, patchNumber){
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
        const number = this.asNumber(), versionNumber = version.asNumber(), equalTo = number === versionNumber;
        return equalTo;
    }
    isGreaterThan(version) {
        const number = this.asNumber(), versionNumber = version.asNumber(), greaterThan = number > versionNumber;
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
        const matches = semver.match(/(^[^\d]*)/), firstMatch = first(matches), modifier = firstMatch, string = this.asString();
        semver = `${modifier}${string}`;
        return semver;
    }
    bumpPatchNumber() {
        this.patchNumber += 1; ///
    }
    static fromString(string) {
        let version = null;
        const match = /\d+\.\d+\.\d+$/.test(string);
        if (match) {
            const majorNumber = majorNumberFromString(string), minorNumber = minorNumberFromString(string), patchNumber = patchNumberFromString(string);
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
function majorNumberFromString(string) {
    const matches = string.match(/(\d+)\.\d+\.\d+$/), secondMatch = second(matches), majorNumber = Number(secondMatch);
    return majorNumber;
}
function minorNumberFromString(string) {
    const matches = string.match(/\d+\.(\d+)\.\d+$/), secondMatch = second(matches), minorNumber = Number(secondMatch);
    return minorNumber;
}
function patchNumberFromString(string) {
    const matches = string.match(/\d+\.\d+\.(\d+)$/), secondMatch = second(matches), patchNumber = Number(secondMatch);
    return patchNumber;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92ZXJzaW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuY29uc3QgeyBmaXJzdCwgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyc2lvbiB7XG4gIGNvbnN0cnVjdG9yKG1ham9yTnVtYmVyLCBtaW5vck51bWJlciwgcGF0Y2hOdW1iZXIpIHtcbiAgICB0aGlzLm1ham9yTnVtYmVyID0gbWFqb3JOdW1iZXI7XG4gICAgdGhpcy5taW5vck51bWJlciA9IG1pbm9yTnVtYmVyO1xuICAgIHRoaXMucGF0Y2hOdW1iZXIgPSBwYXRjaE51bWJlcjtcbiAgfVxuXG4gIGdldE1ham9yTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLm1ham9yTnVtYmVyO1xuICB9XG5cbiAgZ2V0TWlub3JOdW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubWlub3JOdW1iZXI7XG4gIH1cblxuICBnZXRQYXRjaE51bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wYXRjaE51bWJlcjtcbiAgfVxuXG4gIGlzRXF1YWxUbyh2ZXJzaW9uKSB7XG4gICAgY29uc3QgbnVtYmVyID0gdGhpcy5hc051bWJlcigpLFxuICAgICAgICAgIHZlcnNpb25OdW1iZXIgPSB2ZXJzaW9uLmFzTnVtYmVyKCksXG4gICAgICAgICAgZXF1YWxUbyA9IChudW1iZXIgPT09IHZlcnNpb25OdW1iZXIpO1xuXG4gICAgcmV0dXJuIGVxdWFsVG87XG4gIH1cblxuICBpc0dyZWF0ZXJUaGFuKHZlcnNpb24pIHtcbiAgICBjb25zdCBudW1iZXIgPSB0aGlzLmFzTnVtYmVyKCksXG4gICAgICAgICAgdmVyc2lvbk51bWJlciA9IHZlcnNpb24uYXNOdW1iZXIoKSxcbiAgICAgICAgICBncmVhdGVyVGhhbiA9IChudW1iZXIgPiB2ZXJzaW9uTnVtYmVyKTtcblxuICAgIHJldHVybiBncmVhdGVyVGhhbjtcbiAgfVxuXG4gIGFzU3RyaW5nKCkge1xuICAgIGNvbnN0IHN0cmluZyA9IGAke3RoaXMubWFqb3JOdW1iZXJ9LiR7dGhpcy5taW5vck51bWJlcn0uJHt0aGlzLnBhdGNoTnVtYmVyfWA7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgYXNOdW1iZXIoKSB7XG4gICAgY29uc3QgbnVtYmVyID0gdGhpcy5wYXRjaE51bWJlciAqIDFlMCArIHRoaXMubWlub3JOdW1iZXIgKiAxZTYgKyB0aGlzLm1ham9yTnVtYmVyICogMWUxMjsgLy8vXG5cbiAgICByZXR1cm4gbnVtYmVyO1xuICB9XG5cbiAgdXBkYXRlU2VtdmVyKHNlbXZlcikge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBzZW12ZXIubWF0Y2goLyheW15cXGRdKikvKSxcbiAgICAgICAgICBmaXJzdE1hdGNoID0gZmlyc3QobWF0Y2hlcyksXG4gICAgICAgICAgbW9kaWZpZXIgPSBmaXJzdE1hdGNoLCAgLy8vXG4gICAgICAgICAgc3RyaW5nID0gdGhpcy5hc1N0cmluZygpO1xuXG4gICAgc2VtdmVyID0gYCR7bW9kaWZpZXJ9JHtzdHJpbmd9YDtcblxuICAgIHJldHVybiBzZW12ZXI7XG4gIH1cblxuICBidW1wUGF0Y2hOdW1iZXIoKSB7XG4gICAgdGhpcy5wYXRjaE51bWJlciArPSAxOyAgLy8vXG4gIH1cblxuICBzdGF0aWMgZnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgICBsZXQgdmVyc2lvbiA9IG51bGw7XG5cbiAgICBjb25zdCBtYXRjaCA9IC9cXGQrXFwuXFxkK1xcLlxcZCskLy50ZXN0KHN0cmluZyk7XG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIGNvbnN0IG1ham9yTnVtYmVyID0gbWFqb3JOdW1iZXJGcm9tU3RyaW5nKHN0cmluZyksXG4gICAgICAgICAgICBtaW5vck51bWJlciA9IG1pbm9yTnVtYmVyRnJvbVN0cmluZyhzdHJpbmcpLFxuICAgICAgICAgICAgcGF0Y2hOdW1iZXIgPSBwYXRjaE51bWJlckZyb21TdHJpbmcoc3RyaW5nKTtcblxuICAgICAgdmVyc2lvbiA9IG5ldyBWZXJzaW9uKG1ham9yTnVtYmVyLCBtaW5vck51bWJlciwgcGF0Y2hOdW1iZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB2ZXJzaW9uO1xuICB9XG5cbiAgc3RhdGljIGZyb21WZXJzaW9uU3RyaW5nKHZlcnNpb25TdHJpbmcpIHtcbiAgICBsZXQgdmVyc2lvbiA9IG51bGw7XG5cbiAgICBpZiAodmVyc2lvblN0cmluZyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc3RyaW5nID0gdmVyc2lvblN0cmluZzsgLy8vXG5cbiAgICAgIHZlcnNpb24gPSBWZXJzaW9uLmZyb21TdHJpbmcoc3RyaW5nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVyc2lvbjtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWpvck51bWJlckZyb21TdHJpbmcoc3RyaW5nKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBzdHJpbmcubWF0Y2goLyhcXGQrKVxcLlxcZCtcXC5cXGQrJC8pLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKSxcbiAgICAgICAgbWFqb3JOdW1iZXIgPSBOdW1iZXIoc2Vjb25kTWF0Y2gpO1xuXG4gIHJldHVybiBtYWpvck51bWJlcjtcbn1cblxuZnVuY3Rpb24gbWlub3JOdW1iZXJGcm9tU3RyaW5nKHN0cmluZykge1xuICBjb25zdCBtYXRjaGVzID0gc3RyaW5nLm1hdGNoKC9cXGQrXFwuKFxcZCspXFwuXFxkKyQvKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyksXG4gICAgICAgIG1pbm9yTnVtYmVyID0gTnVtYmVyKHNlY29uZE1hdGNoKTtcblxuICByZXR1cm4gbWlub3JOdW1iZXI7XG59XG5cbmZ1bmN0aW9uIHBhdGNoTnVtYmVyRnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHN0cmluZy5tYXRjaCgvXFxkK1xcLlxcZCtcXC4oXFxkKykkLyksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpLFxuICAgICAgICBwYXRjaE51bWJlciA9IE51bWJlcihzZWNvbmRNYXRjaCk7XG5cbiAgcmV0dXJuIHBhdGNoTnVtYmVyO1xufVxuIl0sIm5hbWVzIjpbIlZlcnNpb24iLCJmaXJzdCIsInNlY29uZCIsImFycmF5VXRpbGl0aWVzIiwibWFqb3JOdW1iZXIiLCJtaW5vck51bWJlciIsInBhdGNoTnVtYmVyIiwiZ2V0TWFqb3JOdW1iZXIiLCJnZXRNaW5vck51bWJlciIsImdldFBhdGNoTnVtYmVyIiwiaXNFcXVhbFRvIiwidmVyc2lvbiIsIm51bWJlciIsImFzTnVtYmVyIiwidmVyc2lvbk51bWJlciIsImVxdWFsVG8iLCJpc0dyZWF0ZXJUaGFuIiwiZ3JlYXRlclRoYW4iLCJhc1N0cmluZyIsInN0cmluZyIsInVwZGF0ZVNlbXZlciIsInNlbXZlciIsIm1hdGNoZXMiLCJtYXRjaCIsImZpcnN0TWF0Y2giLCJtb2RpZmllciIsImJ1bXBQYXRjaE51bWJlciIsImZyb21TdHJpbmciLCJ0ZXN0IiwibWFqb3JOdW1iZXJGcm9tU3RyaW5nIiwibWlub3JOdW1iZXJGcm9tU3RyaW5nIiwicGF0Y2hOdW1iZXJGcm9tU3RyaW5nIiwiZnJvbVZlcnNpb25TdHJpbmciLCJ2ZXJzaW9uU3RyaW5nIiwic2Vjb25kTWF0Y2giLCJOdW1iZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQU1BOzs7ZUFBcUJBOzs7MkJBSlU7QUFFL0IsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLE1BQU0sRUFBRSxHQUFHQyx5QkFBYztBQUV6QixNQUFNSDtJQUNuQixZQUFZSSxXQUFXLEVBQUVDLFdBQVcsRUFBRUMsV0FBVyxDQUFFO1FBQ2pELElBQUksQ0FBQ0YsV0FBVyxHQUFHQTtRQUNuQixJQUFJLENBQUNDLFdBQVcsR0FBR0E7UUFDbkIsSUFBSSxDQUFDQyxXQUFXLEdBQUdBO0lBQ3JCO0lBRUFDLGlCQUFpQjtRQUNmLE9BQU8sSUFBSSxD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
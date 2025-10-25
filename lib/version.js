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
var _necessary = require("necessary");
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var first = _necessary.arrayUtilities.first, second = _necessary.arrayUtilities.second;
var Version = /*#__PURE__*/ function() {
    function Version(majorNumber, minorNumber, patchNumber) {
        _class_call_check(this, Version);
        this.majorNumber = majorNumber;
        this.minorNumber = minorNumber;
        this.patchNumber = patchNumber;
    }
    _create_class(Version, [
        {
            key: "getMajorNumber",
            value: function getMajorNumber() {
                return this.majorNumber;
            }
        },
        {
            key: "getMinorNumber",
            value: function getMinorNumber() {
                return this.minorNumber;
            }
        },
        {
            key: "getPatchNumber",
            value: function getPatchNumber() {
                return this.patchNumber;
            }
        },
        {
            key: "isEqualTo",
            value: function isEqualTo(version) {
                var number = this.asNumber(), versionNumber = version.asNumber(), equalTo = number === versionNumber;
                return equalTo;
            }
        },
        {
            key: "isGreaterThan",
            value: function isGreaterThan(version) {
                var number = this.asNumber(), versionNumber = version.asNumber(), greaterThan = number > versionNumber;
                return greaterThan;
            }
        },
        {
            key: "asString",
            value: function asString() {
                var string = "".concat(this.majorNumber, ".").concat(this.minorNumber, ".").concat(this.patchNumber);
                return string;
            }
        },
        {
            key: "asNumber",
            value: function asNumber() {
                var number = this.patchNumber * 1e0 + this.minorNumber * 1e6 + this.majorNumber * 1e12; ///
                return number;
            }
        },
        {
            key: "updateSemver",
            value: function updateSemver(semver) {
                var matches = semver.match(/(^[^\d]*)/), firstMatch = first(matches), modifier = firstMatch, string = this.asString();
                semver = "".concat(modifier).concat(string);
                return semver;
            }
        },
        {
            key: "bumpPatchNumber",
            value: function bumpPatchNumber() {
                this.patchNumber += 1; ///
            }
        }
    ], [
        {
            key: "fromString",
            value: function fromString(string) {
                var version = null;
                var match = /\d+\.\d+\.\d+$/.test(string);
                if (match) {
                    var majorNumber = majorNumberFromString(string), minorNumber = minorNumberFromString(string), patchNumber = patchNumberFromString(string);
                    version = new Version(majorNumber, minorNumber, patchNumber);
                }
                return version;
            }
        },
        {
            key: "fromVersionString",
            value: function fromVersionString(versionString) {
                var version = null;
                if (versionString !== null) {
                    var string = versionString; ///
                    version = Version.fromString(string);
                }
                return version;
            }
        }
    ]);
    return Version;
}();
function majorNumberFromString(string) {
    var matches = string.match(/(\d+)\.\d+\.\d+$/), secondMatch = second(matches), majorNumber = Number(secondMatch);
    return majorNumber;
}
function minorNumberFromString(string) {
    var matches = string.match(/\d+\.(\d+)\.\d+$/), secondMatch = second(matches), minorNumber = Number(secondMatch);
    return minorNumber;
}
function patchNumberFromString(string) {
    var matches = string.match(/\d+\.\d+\.(\d+)$/), secondMatch = second(matches), patchNumber = Number(secondMatch);
    return patchNumber;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92ZXJzaW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuY29uc3QgeyBmaXJzdCwgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyc2lvbiB7XG4gIGNvbnN0cnVjdG9yKG1ham9yTnVtYmVyLCBtaW5vck51bWJlciwgcGF0Y2hOdW1iZXIpIHtcbiAgICB0aGlzLm1ham9yTnVtYmVyID0gbWFqb3JOdW1iZXI7XG4gICAgdGhpcy5taW5vck51bWJlciA9IG1pbm9yTnVtYmVyO1xuICAgIHRoaXMucGF0Y2hOdW1iZXIgPSBwYXRjaE51bWJlcjtcbiAgfVxuXG4gIGdldE1ham9yTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLm1ham9yTnVtYmVyO1xuICB9XG5cbiAgZ2V0TWlub3JOdW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubWlub3JOdW1iZXI7XG4gIH1cblxuICBnZXRQYXRjaE51bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wYXRjaE51bWJlcjtcbiAgfVxuXG4gIGlzRXF1YWxUbyh2ZXJzaW9uKSB7XG4gICAgY29uc3QgbnVtYmVyID0gdGhpcy5hc051bWJlcigpLFxuICAgICAgICAgIHZlcnNpb25OdW1iZXIgPSB2ZXJzaW9uLmFzTnVtYmVyKCksXG4gICAgICAgICAgZXF1YWxUbyA9IChudW1iZXIgPT09IHZlcnNpb25OdW1iZXIpO1xuXG4gICAgcmV0dXJuIGVxdWFsVG87XG4gIH1cblxuICBpc0dyZWF0ZXJUaGFuKHZlcnNpb24pIHtcbiAgICBjb25zdCBudW1iZXIgPSB0aGlzLmFzTnVtYmVyKCksXG4gICAgICAgICAgdmVyc2lvbk51bWJlciA9IHZlcnNpb24uYXNOdW1iZXIoKSxcbiAgICAgICAgICBncmVhdGVyVGhhbiA9IChudW1iZXIgPiB2ZXJzaW9uTnVtYmVyKTtcblxuICAgIHJldHVybiBncmVhdGVyVGhhbjtcbiAgfVxuXG4gIGFzU3RyaW5nKCkge1xuICAgIGNvbnN0IHN0cmluZyA9IGAke3RoaXMubWFqb3JOdW1iZXJ9LiR7dGhpcy5taW5vck51bWJlcn0uJHt0aGlzLnBhdGNoTnVtYmVyfWA7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgYXNOdW1iZXIoKSB7XG4gICAgY29uc3QgbnVtYmVyID0gdGhpcy5wYXRjaE51bWJlciAqIDFlMCArIHRoaXMubWlub3JOdW1iZXIgKiAxZTYgKyB0aGlzLm1ham9yTnVtYmVyICogMWUxMjsgLy8vXG5cbiAgICByZXR1cm4gbnVtYmVyO1xuICB9XG5cbiAgdXBkYXRlU2VtdmVyKHNlbXZlcikge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBzZW12ZXIubWF0Y2goLyheW15cXGRdKikvKSxcbiAgICAgICAgICBmaXJzdE1hdGNoID0gZmlyc3QobWF0Y2hlcyksXG4gICAgICAgICAgbW9kaWZpZXIgPSBmaXJzdE1hdGNoLCAgLy8vXG4gICAgICAgICAgc3RyaW5nID0gdGhpcy5hc1N0cmluZygpO1xuXG4gICAgc2VtdmVyID0gYCR7bW9kaWZpZXJ9JHtzdHJpbmd9YDtcblxuICAgIHJldHVybiBzZW12ZXI7XG4gIH1cblxuICBidW1wUGF0Y2hOdW1iZXIoKSB7XG4gICAgdGhpcy5wYXRjaE51bWJlciArPSAxOyAgLy8vXG4gIH1cblxuICBzdGF0aWMgZnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgICBsZXQgdmVyc2lvbiA9IG51bGw7XG5cbiAgICBjb25zdCBtYXRjaCA9IC9cXGQrXFwuXFxkK1xcLlxcZCskLy50ZXN0KHN0cmluZyk7XG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIGNvbnN0IG1ham9yTnVtYmVyID0gbWFqb3JOdW1iZXJGcm9tU3RyaW5nKHN0cmluZyksXG4gICAgICAgICAgICBtaW5vck51bWJlciA9IG1pbm9yTnVtYmVyRnJvbVN0cmluZyhzdHJpbmcpLFxuICAgICAgICAgICAgcGF0Y2hOdW1iZXIgPSBwYXRjaE51bWJlckZyb21TdHJpbmcoc3RyaW5nKTtcblxuICAgICAgdmVyc2lvbiA9IG5ldyBWZXJzaW9uKG1ham9yTnVtYmVyLCBtaW5vck51bWJlciwgcGF0Y2hOdW1iZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB2ZXJzaW9uO1xuICB9XG5cbiAgc3RhdGljIGZyb21WZXJzaW9uU3RyaW5nKHZlcnNpb25TdHJpbmcpIHtcbiAgICBsZXQgdmVyc2lvbiA9IG51bGw7XG5cbiAgICBpZiAodmVyc2lvblN0cmluZyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc3RyaW5nID0gdmVyc2lvblN0cmluZzsgLy8vXG5cbiAgICAgIHZlcnNpb24gPSBWZXJzaW9uLmZyb21TdHJpbmcoc3RyaW5nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVyc2lvbjtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWpvck51bWJlckZyb21TdHJpbmcoc3RyaW5nKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBzdHJpbmcubWF0Y2goLyhcXGQrKVxcLlxcZCtcXC5cXGQrJC8pLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKSxcbiAgICAgICAgbWFqb3JOdW1iZXIgPSBOdW1iZXIoc2Vjb25kTWF0Y2gpO1xuXG4gIHJldHVybiBtYWpvck51bWJlcjtcbn1cblxuZnVuY3Rpb24gbWlub3JOdW1iZXJGcm9tU3RyaW5nKHN0cmluZykge1xuICBjb25zdCBtYXRjaGVzID0gc3RyaW5nLm1hdGNoKC9cXGQrXFwuKFxcZCspXFwuXFxkKyQvKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyksXG4gICAgICAgIG1pbm9yTnVtYmVyID0gTnVtYmVyKHNlY29uZE1hdGNoKTtcblxuICByZXR1cm4gbWlub3JOdW1iZXI7XG59XG5cbmZ1bmN0aW9uIHBhdGNoTnVtYmVyRnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHN0cmluZy5tYXRjaCgvXFxkK1xcLlxcZCtcXC4oXFxkKykkLyksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpLFxuICAgICAgICBwYXRjaE51bWJlciA9IE51bWJlcihzZWNvbmRNYXRjaCk7XG5cbiAgcmV0dXJuIHBhdGNoTnVtYmVyO1xufVxuIl0sIm5hbWVzIjpbIlZlcnNpb24iLCJmaXJzdCIsImFycmF5VXRpbGl0aWVzIiwic2Vjb25kIiwibWFqb3JOdW1iZXIiLCJtaW5vck51bWJlciIsInBhdGNoTnVtYmVyIiwiZ2V0TWFqb3JOdW1iZXIiLCJnZXRNaW5vck51bWJlciIsImdldFBhdGNoTnVtYmVyIiwiaXNFcXVhbFRvIiwidmVyc2lvbiIsIm51bWJlciIsImFzTnVtYmVyIiwidmVyc2lvbk51bWJlciIsImVxdWFsVG8iLCJpc0dyZWF0ZXJUaGFuIiwiZ3JlYXRlclRoYW4iLCJhc1N0cmluZyIsInN0cmluZyIsInVwZGF0ZVNlbXZlciIsInNlbXZlciIsIm1hdGNoZXMiLCJtYXRjaCIsImZpcnN0TWF0Y2giLCJtb2RpZmllciIsImJ1bXBQYXRjaE51bWJlciIsImZyb21TdHJpbmciLCJ0ZXN0IiwibWFqb3JOdW1iZXJGcm9tU3RyaW5nIiwibWlub3JOdW1iZXJGcm9tU3RyaW5nIiwicGF0Y2hOdW1iZXJGcm9tU3RyaW5nIiwiZnJvbVZlcnNpb25TdHJpbmciLCJ2ZXJzaW9uU3RyaW5nIiwic2Vjb25kTWF0Y2giLCJOdW1iZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2VBTXFCQTs7O3lCQUpVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUvQixJQUFRQyxRQUFrQkMseUJBQWMsQ0FBaENELE9BQU9FLFNBQVdELHlCQUFjLENBQXpCQztBQUVBLElBQUEsQUFBTUgsd0JBQU47YUFBTUEsUUFDUEksV0FBVyxFQUFFQyxXQUFXLEVBQUVDLFdBQVc7Z0NBRDlCTjtRQUVqQixJQUFJLENBQUNJLFdBQVcsR0FBR0E7UUFDbkIsSUFBSSxDQUFDQyxXQUFXLEdBQUdBO1FBQ25CLElBQUksQ0FBQ0MsV0FBVyxHQUFHQTs7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
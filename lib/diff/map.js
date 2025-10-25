"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return MapDiff;
    }
});
var _necessary = require("necessary");
var _semver = /*#__PURE__*/ _interop_require_default(require("../diff/semver"));
var _constants = require("../constants");
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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var filter = _necessary.arrayUtilities.filter;
var MapDiff = /*#__PURE__*/ function() {
    function MapDiff(semverDiffs) {
        _class_call_check(this, MapDiff);
        this.semverDiffs = semverDiffs;
    }
    _create_class(MapDiff, [
        {
            key: "getSemverDiffs",
            value: function getSemverDiffs() {
                return this.semverDiffs;
            }
        },
        {
            key: "isEmpty",
            value: function isEmpty() {
                var names = Object.keys(this.semverDiffs), namesLength = names.length, empty = namesLength === 0;
                return empty;
            }
        },
        {
            key: "save",
            value: function save(packageJSON, name) {
                packageJSON = packageJSON[name]; ///
                this.semverDiffs.forEach(function(semverDiff) {
                    return semverDiff.save(packageJSON);
                });
            }
        },
        {
            key: "someSemverDiff",
            value: function someSemverDiff(callback) {
                return this.semverDiffs.some(callback);
            }
        },
        {
            key: "removeSemverDiff",
            value: function removeSemverDiff(name) {
                filter(this.semverDiffs, function(semverDiff) {
                    var semverDiffName = semverDiff.getName();
                    if (semverDiffName !== name) {
                        return true;
                    }
                });
            }
        },
        {
            key: "asString",
            value: function asString() {
                var semverDiffsLength = this.semverDiffs.length, lastIndex = semverDiffsLength - 1, semverDiffsString = this.semverDiffs.reduce(function(semverDiffsString, semverDiff, index) {
                    var last = index === lastIndex, semverDiffString = semverDiff.asString(last);
                    semverDiffsString = "".concat(semverDiffsString).concat(semverDiffString);
                    return semverDiffsString;
                }, _constants.EMPTY_STRING), string = "{\n".concat(semverDiffsString, "\n   }");
                return string;
            }
        }
    ], [
        {
            key: "fromMapAndReleaseMap",
            value: function fromMapAndReleaseMap(map, releaseMap) {
                var names = Object.keys(map), semverDiffs = [];
                names.forEach(function(name) {
                    var semver = map[name], releaseSemver = releaseMap[name], semverDiff = _semver.default.fromNameSemverAndReleaseSemver(name, semver, releaseSemver);
                    if (semverDiff !== null) {
                        semverDiffs.push(semverDiff);
                    }
                });
                var mapDiff = new MapDiff(semverDiffs);
                return mapDiff;
            }
        }
    ]);
    return MapDiff;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL21hcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBTZW12ZXJEaWZmIGZyb20gXCIuLi9kaWZmL3NlbXZlclwiO1xuXG5pbXBvcnQgeyBFTVBUWV9TVFJJTkcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5cbmNvbnN0IHsgZmlsdGVyIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwRGlmZiB7XG4gIGNvbnN0cnVjdG9yKHNlbXZlckRpZmZzKSB7XG4gICAgdGhpcy5zZW12ZXJEaWZmcyA9IHNlbXZlckRpZmZzO1xuICB9XG5cbiAgZ2V0U2VtdmVyRGlmZnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VtdmVyRGlmZnM7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXModGhpcy5zZW12ZXJEaWZmcyksICAvLy9cbiAgICAgICAgICBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChuYW1lc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBzYXZlKHBhY2thZ2VKU09OLCBuYW1lKSB7XG4gICAgcGFja2FnZUpTT04gPSBwYWNrYWdlSlNPTltuYW1lXTsgIC8vL1xuXG4gICAgdGhpcy5zZW12ZXJEaWZmcy5mb3JFYWNoKChzZW12ZXJEaWZmKSA9PiBzZW12ZXJEaWZmLnNhdmUocGFja2FnZUpTT04pKVxuICB9XG5cbiAgc29tZVNlbXZlckRpZmYoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5zZW12ZXJEaWZmcy5zb21lKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHJlbW92ZVNlbXZlckRpZmYobmFtZSkge1xuICAgIGZpbHRlcih0aGlzLnNlbXZlckRpZmZzLCAoc2VtdmVyRGlmZikgPT4ge1xuICAgICAgY29uc3Qgc2VtdmVyRGlmZk5hbWUgPSBzZW12ZXJEaWZmLmdldE5hbWUoKTtcblxuICAgICAgaWYgKHNlbXZlckRpZmZOYW1lICE9PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXNTdHJpbmcoKSB7XG4gICAgY29uc3Qgc2VtdmVyRGlmZnNMZW5ndGggPSB0aGlzLnNlbXZlckRpZmZzLmxlbmd0aCxcbiAgICAgICAgICBsYXN0SW5kZXggPSBzZW12ZXJEaWZmc0xlbmd0aCAtIDEsXG4gICAgICAgICAgc2VtdmVyRGlmZnNTdHJpbmcgPSB0aGlzLnNlbXZlckRpZmZzLnJlZHVjZSgoc2VtdmVyRGlmZnNTdHJpbmcsIHNlbXZlckRpZmYsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gKGluZGV4ID09PSBsYXN0SW5kZXgpLFxuICAgICAgICAgICAgICAgICAgc2VtdmVyRGlmZlN0cmluZyA9IHNlbXZlckRpZmYuYXNTdHJpbmcobGFzdCk7XG5cbiAgICAgICAgICAgIHNlbXZlckRpZmZzU3RyaW5nID0gYCR7c2VtdmVyRGlmZnNTdHJpbmd9JHtzZW12ZXJEaWZmU3RyaW5nfWA7XG5cbiAgICAgICAgICAgIHJldHVybiBzZW12ZXJEaWZmc1N0cmluZztcbiAgICAgICAgICB9LCBFTVBUWV9TVFJJTkcpLFxuICAgICAgICAgIHN0cmluZyA9IGB7XFxuJHtzZW12ZXJEaWZmc1N0cmluZ31cXG4gICB9YDtcblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cblxuICBzdGF0aWMgZnJvbU1hcEFuZFJlbGVhc2VNYXAobWFwLCByZWxlYXNlTWFwKSB7XG4gICAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhtYXApLFxuICAgICAgICAgIHNlbXZlckRpZmZzID0gW107XG5cbiAgICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBjb25zdCBzZW12ZXIgPSBtYXBbbmFtZV0sXG4gICAgICAgICAgICByZWxlYXNlU2VtdmVyID0gcmVsZWFzZU1hcFtuYW1lXSxcbiAgICAgICAgICAgIHNlbXZlckRpZmYgPSBTZW12ZXJEaWZmLmZyb21OYW1lU2VtdmVyQW5kUmVsZWFzZVNlbXZlcihuYW1lLCBzZW12ZXIsIHJlbGVhc2VTZW12ZXIpO1xuXG4gICAgICBpZiAoc2VtdmVyRGlmZiAhPT0gbnVsbCkge1xuICAgICAgICBzZW12ZXJEaWZmcy5wdXNoKHNlbXZlckRpZmYpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFwRGlmZiA9IG5ldyBNYXBEaWZmKHNlbXZlckRpZmZzKTtcblxuICAgIHJldHVybiBtYXBEaWZmO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTWFwRGlmZiIsImZpbHRlciIsImFycmF5VXRpbGl0aWVzIiwic2VtdmVyRGlmZnMiLCJnZXRTZW12ZXJEaWZmcyIsImlzRW1wdHkiLCJuYW1lcyIsIk9iamVjdCIsImtleXMiLCJuYW1lc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5Iiwic2F2ZSIsInBhY2thZ2VKU09OIiwibmFtZSIsImZvckVhY2giLCJzZW12ZXJEaWZmIiwic29tZVNlbXZlckRpZmYiLCJjYWxsYmFjayIsInNvbWUiLCJyZW1vdmVTZW12ZXJEaWZmIiwic2VtdmVyRGlmZk5hbWUiLCJnZXROYW1lIiwiYXNTdHJpbmciLCJzZW12ZXJEaWZmc0xlbmd0aCIsImxhc3RJbmRleCIsInNlbXZlckRpZmZzU3RyaW5nIiwicmVkdWNlIiwiaW5kZXgiLCJsYXN0Iiwic2VtdmVyRGlmZlN0cmluZyIsIkVNUFRZX1NUUklORyIsInN0cmluZyIsImZyb21NYXBBbmRSZWxlYXNlTWFwIiwibWFwIiwicmVsZWFzZU1hcCIsInNlbXZlciIsInJlbGVhc2VTZW12ZXIiLCJTZW12ZXJEaWZmIiwiZnJvbU5hbWVTZW12ZXJBbmRSZWxlYXNlU2VtdmVyIiwicHVzaCIsIm1hcERpZmYiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2VBVXFCQTs7O3lC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
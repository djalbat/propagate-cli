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
                this.forEachSemverDiff(function(semverDiff) {
                    semverDiff.save(packageJSON);
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
            key: "reduceSemverDiff",
            value: function reduceSemverDiff(callback, initialValue) {
                return this.semverDiffs.reduce(callback, initialValue);
            }
        },
        {
            key: "forEachSemverDiff",
            value: function forEachSemverDiff(callback) {
                this.semverDiffs.forEach(callback);
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
            key: "getSpecifiers",
            value: function getSpecifiers(specifiers) {
                this.forEachSemverDiff(function(semverDiff) {
                    var specifier = semverDiff.getSpecifier();
                    specifiers.push(specifier);
                });
                return specifiers;
            }
        },
        {
            key: "asString",
            value: function asString() {
                var semverDiffsLength = this.semverDiffs.length, lastIndex = semverDiffsLength - 1, semverDiffsString = this.reduceSemverDiff(function(semverDiffsString, semverDiff, index) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL21hcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBTZW12ZXJEaWZmIGZyb20gXCIuLi9kaWZmL3NlbXZlclwiO1xuXG5pbXBvcnQgeyBFTVBUWV9TVFJJTkcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5cbmNvbnN0IHsgZmlsdGVyIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwRGlmZiB7XG4gIGNvbnN0cnVjdG9yKHNlbXZlckRpZmZzKSB7XG4gICAgdGhpcy5zZW12ZXJEaWZmcyA9IHNlbXZlckRpZmZzO1xuICB9XG5cbiAgZ2V0U2VtdmVyRGlmZnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VtdmVyRGlmZnM7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXModGhpcy5zZW12ZXJEaWZmcyksICAvLy9cbiAgICAgICAgICBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChuYW1lc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBzYXZlKHBhY2thZ2VKU09OLCBuYW1lKSB7XG4gICAgcGFja2FnZUpTT04gPSBwYWNrYWdlSlNPTltuYW1lXTsgIC8vL1xuXG4gICAgdGhpcy5mb3JFYWNoU2VtdmVyRGlmZigoc2VtdmVyRGlmZikgPT4ge1xuICAgICAgc2VtdmVyRGlmZi5zYXZlKHBhY2thZ2VKU09OKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVTZW12ZXJEaWZmKGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNlbXZlckRpZmZzLnNvbWUoY2FsbGJhY2spOyB9XG5cbiAgcmVkdWNlU2VtdmVyRGlmZihjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7IHJldHVybiB0aGlzLnNlbXZlckRpZmZzLnJlZHVjZShjYWxsYmFjaywgaW5pdGlhbFZhbHVlKTsgfVxuXG4gIGZvckVhY2hTZW12ZXJEaWZmKGNhbGxiYWNrKSB7IHRoaXMuc2VtdmVyRGlmZnMuZm9yRWFjaChjYWxsYmFjayk7IH1cblxuICByZW1vdmVTZW12ZXJEaWZmKG5hbWUpIHtcbiAgICBmaWx0ZXIodGhpcy5zZW12ZXJEaWZmcywgKHNlbXZlckRpZmYpID0+IHtcbiAgICAgIGNvbnN0IHNlbXZlckRpZmZOYW1lID0gc2VtdmVyRGlmZi5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChzZW12ZXJEaWZmTmFtZSAhPT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFNwZWNpZmllcnMoc3BlY2lmaWVycykge1xuICAgIHRoaXMuZm9yRWFjaFNlbXZlckRpZmYoKHNlbXZlckRpZmYpID0+IHtcbiAgICAgIGNvbnN0IHNwZWNpZmllciA9IHNlbXZlckRpZmYuZ2V0U3BlY2lmaWVyKCk7XG5cbiAgICAgIHNwZWNpZmllcnMucHVzaChzcGVjaWZpZXIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNwZWNpZmllcnM7XG4gIH1cblxuICBhc1N0cmluZygpIHtcbiAgICBjb25zdCBzZW12ZXJEaWZmc0xlbmd0aCA9IHRoaXMuc2VtdmVyRGlmZnMubGVuZ3RoLFxuICAgICAgICAgIGxhc3RJbmRleCA9IHNlbXZlckRpZmZzTGVuZ3RoIC0gMSxcbiAgICAgICAgICBzZW12ZXJEaWZmc1N0cmluZyA9IHRoaXMucmVkdWNlU2VtdmVyRGlmZigoc2VtdmVyRGlmZnNTdHJpbmcsIHNlbXZlckRpZmYsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gKGluZGV4ID09PSBsYXN0SW5kZXgpLFxuICAgICAgICAgICAgICAgICAgc2VtdmVyRGlmZlN0cmluZyA9IHNlbXZlckRpZmYuYXNTdHJpbmcobGFzdCk7XG5cbiAgICAgICAgICAgIHNlbXZlckRpZmZzU3RyaW5nID0gYCR7c2VtdmVyRGlmZnNTdHJpbmd9JHtzZW12ZXJEaWZmU3RyaW5nfWA7XG5cbiAgICAgICAgICAgIHJldHVybiBzZW12ZXJEaWZmc1N0cmluZztcbiAgICAgICAgICB9LCBFTVBUWV9TVFJJTkcpLFxuICAgICAgICAgIHN0cmluZyA9IGB7XFxuJHtzZW12ZXJEaWZmc1N0cmluZ31cXG4gICB9YDtcblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cblxuICBzdGF0aWMgZnJvbU1hcEFuZFJlbGVhc2VNYXAobWFwLCByZWxlYXNlTWFwKSB7XG4gICAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhtYXApLFxuICAgICAgICAgIHNlbXZlckRpZmZzID0gW107XG5cbiAgICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBjb25zdCBzZW12ZXIgPSBtYXBbbmFtZV0sXG4gICAgICAgICAgICByZWxlYXNlU2VtdmVyID0gcmVsZWFzZU1hcFtuYW1lXSxcbiAgICAgICAgICAgIHNlbXZlckRpZmYgPSBTZW12ZXJEaWZmLmZyb21OYW1lU2VtdmVyQW5kUmVsZWFzZVNlbXZlcihuYW1lLCBzZW12ZXIsIHJlbGVhc2VTZW12ZXIpO1xuXG4gICAgICBpZiAoc2VtdmVyRGlmZiAhPT0gbnVsbCkge1xuICAgICAgICBzZW12ZXJEaWZmcy5wdXNoKHNlbXZlckRpZmYpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFwRGlmZiA9IG5ldyBNYXBEaWZmKHNlbXZlckRpZmZzKTtcblxuICAgIHJldHVybiBtYXBEaWZmO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTWFwRGlmZiIsImZpbHRlciIsImFycmF5VXRpbGl0aWVzIiwic2VtdmVyRGlmZnMiLCJnZXRTZW12ZXJEaWZmcyIsImlzRW1wdHkiLCJuYW1lcyIsIk9iamVjdCIsImtleXMiLCJuYW1lc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5Iiwic2F2ZSIsInBhY2thZ2VKU09OIiwibmFtZSIsImZvckVhY2hTZW12ZXJEaWZmIiwic2VtdmVyRGlmZiIsInNvbWVTZW12ZXJEaWZmIiwiY2FsbGJhY2siLCJzb21lIiwicmVkdWNlU2VtdmVyRGlmZiIsImluaXRpYWxWYWx1ZSIsInJlZHVjZSIsImZvckVhY2giLCJyZW1vdmVTZW12ZXJEaWZmIiwic2VtdmVyRGlmZk5hbWUiLCJnZXROYW1lIiwiZ2V0U3BlY2lmaWVycyIsInNwZWNpZmllcnMiLCJzcGVjaWZpZXIiLCJnZXRTcGVjaWZpZXIiLCJwdXNoIiwiYXNTdHJpbmciLCJzZW12ZXJEaWZmc0xlbmd0aCIsImxhc3RJbmRleCIsInNlbXZlckRpZmZzU3RyaW5nIiwiaW5kZXgiLCJsYXN0Iiwic2VtdmVyRGlmZlN0cmluZyIsIkVNUFRZX1NUUklORyIsInN0cmluZyIsImZyb21NYXBBbmRSZWxlYXNlTWFwIiwibWFwIiwicmVsZWFzZU1hcCIsInNlbXZlciIsInJlbGVhc2VTZW12ZXIiLCJTZW12ZXJEaWZmIiwiZnJvbU5hbWVTZW12ZXJBbmRSZWxlYXNlU2VtdmVyIiwibWFwRGlmZiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7ZUFVcUJBOzs7eUJBUlU7NkRBRVI7eUJBRU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFN0IsSUFBTSxBQUFFQyxTQUFXQyx5QkFBYyxDQUF6QkQ7QUFFTyxJQUFBLEFBQU1ELHdCQUFOO2FBQU1BLFFBQ1BHLFdBQVc7Z0NBREpIO1FBRWpCLElBQUksQ0FBQ0csV0FBVyxHQUFHQTs7a0JBRkZIOztZQUtuQkksS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDRCxXQUFXO1lBQ3pCOzs7WUFFQUUsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLElBQU1DLFFBQVFDLE9BQU9DLElBQUksQ0FBQyxJQUFJLENBQUNMLFdBQVcsR0FDcENNLGNBQWNILE1BQU1JLE1BQU0sRUFDMUJDLFFBQVNGLGdCQUFnQjtnQkFFL0IsT0FBT0U7WUFDVDs7O1lBRUFDLEtBQUFBO21CQUFBQSxTQUFBQSxLQUFLQyxXQUFXLEVBQUVDLElBQUk7Z0JBQ3BCRCxjQUFjQSxXQUFXLENBQUNDLEtBQUssRUFBRyxHQUFHO2dCQUVyQyxJQUFJLENBQUNDLGlCQUFpQixDQUFDLFNBQUNDO29CQUN0QkEsV0FBV0osSUFBSSxDQUFDQztnQkFDbEI7WUFDRjs7O1lBRUFJLEtBQUFBO21CQUFBQSxTQUFBQSxlQUFlQyxRQUFRO2dCQUFJLE9BQU8sSUFBSSxDQUFDZixXQUFXLENBQUNnQixJQUFJLENBQUNEO1lBQVc7OztZQUVuRUUsS0FBQUE7bUJBQUFBLFNBQUFBLGlCQUFpQkYsUUFBUSxFQUFFRyxZQUFZO2dCQUFJLE9BQU8sSUFBSSxDQUFDbEIsV0FBVyxDQUFDbUIsTUFBTSxDQUFDSixVQUFVRztZQUFlOzs7WUFFbkdOLEtBQUFBO21CQUFBQSxTQUFBQSxrQkFBa0JHLFFBQVE7Z0JBQUksSUFBSSxDQUFDZixXQUFXLENBQUNvQixPQUFPLENBQUNMO1lBQVc7OztZQUVsRU0sS0FBQUE7bUJBQUFBLFNBQUFBLGlCQUFpQlYsSUFBSTtnQkFDbkJiLE9BQU8sSUFBSSxDQUFDRSxXQUFXLEVBQUUsU0FBQ2E7b0JBQ3hCLElBQU1TLGlCQUFpQlQsV0FBV1UsT0FBTztvQkFFekMsSUFBSUQsbUJBQW1CWCxNQUFNO3dCQUMzQixPQUFPO29CQUNUO2dCQUNGO1lBQ0Y7OztZQUVBYSxLQUFBQTttQkFBQUEsU0FBQUEsY0FBY0MsVUFBVTtnQkFDdEIsSUFBSSxDQUFDYixpQkFBaUIsQ0FBQyxTQUFDQztvQkFDdEIsSUFBTWEsWUFBWWIsV0FBV2MsWUFBWTtvQkFFekNGLFdBQVdHLElBQUksQ0FBQ0Y7Z0JBQ2xCO2dCQUVBLE9BQU9EO1lBQ1Q7OztZQUVBSSxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsb0JBQW9CLElBQUksQ0FBQzlCLFdBQVcsQ0FBQ08sTUFBTSxFQUMzQ3dCLFlBQVlELG9CQUFvQixHQUNoQ0Usb0JBQW9CLElBQUksQ0FBQ2YsZ0JBQWdCLENBQUMsU0FBQ2UsbUJBQW1CbkIsWUFBWW9CO29CQUN4RSxJQUFNQyxPQUFRRCxVQUFVRixXQUNsQkksbUJBQW1CdEIsV0FBV2dCLFFBQVEsQ0FBQ0s7b0JBRTdDRixvQkFBb0IsQUFBQyxHQUFzQkcsT0FBcEJILG1CQUFxQyxPQUFqQkc7b0JBRTNDLE9BQU9IO2dCQUNULEdBQUdJLHVCQUFZLEdBQ2ZDLFNBQVMsQUFBQyxNQUF1QixPQUFsQkwsbUJBQWtCO2dCQUV2QyxPQUFPSztZQUNUOzs7O1lBRU9DLEtBQUFBO21CQUFQLFNBQU9BLHFCQUFxQkMsR0FBRyxFQUFFQyxVQUFVO2dCQUN6QyxJQUFNckMsUUFBUUMsT0FBT0MsSUFBSSxDQUFDa0MsTUFDcEJ2QyxjQUFjLEVBQUU7Z0JBRXRCRyxNQUFNaUIsT0FBTyxDQUFDLFNBQUNUO29CQUNiLElBQU04QixTQUFTRixHQUFHLENBQUM1QixLQUFLLEVBQ2xCK0IsZ0JBQWdCRixVQUFVLENBQUM3QixLQUFLLEVBQ2hDRSxhQUFhOEIsZUFBVSxDQUFDQyw4QkFBOEIsQ0FBQ2pDLE1BQU04QixRQUFRQztvQkFFM0UsSUFBSTdCLGVBQWUsTUFBTTt3QkFDdkJiLFlBQVk0QixJQUFJLENBQUNmO29CQUNuQjtnQkFDRjtnQkFFQSxJQUFNZ0MsVUFBVSxJQWpGQ2hELFFBaUZXRztnQkFFNUIsT0FBTzZDO1lBQ1Q7OztXQXBGbUJoRCJ9
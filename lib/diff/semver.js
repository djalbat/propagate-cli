"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return SemverDiff;
    }
});
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
var SemverDiff = /*#__PURE__*/ function() {
    function SemverDiff(name, semver, releaseSemver) {
        _class_call_check(this, SemverDiff);
        this.name = name;
        this.semver = semver;
        this.releaseSemver = releaseSemver;
    }
    _create_class(SemverDiff, [
        {
            key: "getName",
            value: function getName() {
                return this.name;
            }
        },
        {
            key: "getSemver",
            value: function getSemver() {
                return this.semver;
            }
        },
        {
            key: "getReleaseSemver",
            value: function getReleaseSemver() {
                return this.releaseSemver;
            }
        },
        {
            key: "save",
            value: function save(packageJSON) {
                var semver = this.releaseSemver;
                packageJSON[this.name] = semver;
            }
        },
        {
            key: "getSpecifier",
            value: function getSpecifier() {
                var specifier = "".concat(this.name, "@").concat(this.releaseSemver);
                return specifier;
            }
        },
        {
            key: "asString",
            value: function asString(last) {
                var string = '     "'.concat(this.name, '": "').concat(this.semver, '" -> "').concat(this.releaseSemver, '"');
                if (!last) {
                    string = "".concat(string, ",\n");
                }
                return string;
            }
        }
    ], [
        {
            key: "fromNameSemverAndReleaseSemver",
            value: function fromNameSemverAndReleaseSemver(name, semver, releaseSemver) {
                var semverDiff = null;
                if (semver !== releaseSemver) {
                    semverDiff = new SemverDiff(name, semver, releaseSemver);
                }
                return semverDiff;
            }
        }
    ]);
    return SemverDiff;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL3NlbXZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VtdmVyRGlmZiB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHNlbXZlciwgcmVsZWFzZVNlbXZlcikge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5zZW12ZXIgPSBzZW12ZXI7XG4gICAgdGhpcy5yZWxlYXNlU2VtdmVyID0gcmVsZWFzZVNlbXZlcjtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldFNlbXZlcigpIHtcbiAgICByZXR1cm4gdGhpcy5zZW12ZXI7XG4gIH1cblxuICBnZXRSZWxlYXNlU2VtdmVyKCkge1xuICAgIHJldHVybiB0aGlzLnJlbGVhc2VTZW12ZXI7XG4gIH1cblxuICBzYXZlKHBhY2thZ2VKU09OKSB7XG4gICAgY29uc3Qgc2VtdmVyID0gdGhpcy5yZWxlYXNlU2VtdmVyO1xuXG4gICAgcGFja2FnZUpTT05bdGhpcy5uYW1lXSA9IHNlbXZlcjtcbiAgfVxuXG4gIGdldFNwZWNpZmllcigpIHtcbiAgICBjb25zdCBzcGVjaWZpZXIgPSBgJHt0aGlzLm5hbWV9QCR7dGhpcy5yZWxlYXNlU2VtdmVyfWA7XG5cbiAgICByZXR1cm4gc3BlY2lmaWVyO1xuICB9XG5cbiAgYXNTdHJpbmcobGFzdCkge1xuICAgIGxldCBzdHJpbmcgPSBgICAgICBcIiR7dGhpcy5uYW1lfVwiOiBcIiR7dGhpcy5zZW12ZXJ9XCIgLT4gXCIke3RoaXMucmVsZWFzZVNlbXZlcn1cImA7XG5cbiAgICBpZiAoIWxhc3QpIHtcbiAgICAgIHN0cmluZyA9IGAke3N0cmluZ30sXFxuYDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lU2VtdmVyQW5kUmVsZWFzZVNlbXZlcihuYW1lLCBzZW12ZXIsIHJlbGVhc2VTZW12ZXIpIHtcbiAgICBsZXQgc2VtdmVyRGlmZiA9IG51bGw7XG5cbiAgICBpZiAoc2VtdmVyICE9PSByZWxlYXNlU2VtdmVyKSB7XG4gICAgICBzZW12ZXJEaWZmID0gbmV3IFNlbXZlckRpZmYobmFtZSwgc2VtdmVyLCByZWxlYXNlU2VtdmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VtdmVyRGlmZjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlNlbXZlckRpZmYiLCJuYW1lIiwic2VtdmVyIiwicmVsZWFzZVNlbXZlciIsImdldE5hbWUiLCJnZXRTZW12ZXIiLCJnZXRSZWxlYXNlU2VtdmVyIiwic2F2ZSIsInBhY2thZ2VKU09OIiwiZ2V0U3BlY2lmaWVyIiwic3BlY2lmaWVyIiwiYXNTdHJpbmciLCJsYXN0Iiwic3RyaW5nIiwiZnJvbU5hbWVTZW12ZXJBbmRSZWxlYXNlU2VtdmVyIiwic2VtdmVyRGlmZiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7ZUFFcUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU4sSUFBQSxBQUFNQSwyQkFBTjthQUFNQSxXQUNQQyxJQUFJLEVBQUVDLE1BQU0sRUFBRUMsYUFBYTtnQ0FEcEJIO1FBRWpCLElBQUksQ0FBQ0MsSUFBSSxHQUFHQTtRQUNaLElBQUksQ0FBQ0MsTUFBTSxHQUFHQTtRQUNkLElBQUksQ0FBQ0MsYUFBYSxHQUFHQTs7a0JBSkpIOztZQU9uQkksS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDSCxJQUFJO1lBQ2xCOzs7WUFFQUksS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDSCxNQUFNO1lBQ3BCOzs7WUFFQUksS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDSCxhQUFhO1lBQzNCOzs7WUFFQUksS0FBQUE7bUJBQUFBLFNBQUFBLEtBQUtDLFdBQVc7Z0JBQ2QsSUFBTU4sU0FBUyxJQUFJLENBQUNDLGFBQWE7Z0JBRWpDSyxXQUFXLENBQUMsSUFBSSxDQUFDUCxJQUFJLENBQUMsR0FBR0M7WUFDM0I7OztZQUVBTyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsWUFBWSxBQUFDLEdBQWUsT0FBYixJQUFJLENBQUNULElBQUksRUFBQyxLQUFzQixPQUFuQixJQUFJLENBQUNFLGFBQWE7Z0JBRXBELE9BQU9PO1lBQ1Q7OztZQUVBQyxLQUFBQTttQkFBQUEsU0FBQUEsU0FBU0MsSUFBSTtnQkFDWCxJQUFJQyxTQUFTLEFBQUMsU0FBd0IsT0FBaEIsSUFBSSxDQUFDWixJQUFJLEVBQUMsUUFBMEIsT0FBcEIsSUFBSSxDQUFDQyxNQUFNLEVBQUMsVUFBMkIsT0FBbkIsSUFBSSxDQUFDQyxhQUFhLEVBQUM7Z0JBRTdFLElBQUksQ0FBQ1MsTUFBTTtvQkFDVEMsU0FBUyxBQUFDLEdBQVMsT0FBUEEsUUFBTztnQkFDckI7Z0JBRUEsT0FBT0E7WUFDVDs7OztZQUVPQyxLQUFBQTttQkFBUCxTQUFPQSwrQkFBK0JiLElBQUksRUFBRUMsTUFBTSxFQUFFQyxhQUFhO2dCQUMvRCxJQUFJWSxhQUFhO2dCQUVqQixJQUFJYixXQUFXQyxlQUFlO29CQUM1QlksYUFBYSxJQTdDRWYsV0E2Q2FDLE1BQU1DLFFBQVFDO2dCQUM1QztnQkFFQSxPQUFPWTtZQUNUOzs7V0FqRG1CZiJ9
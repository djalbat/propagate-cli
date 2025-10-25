"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return VersionDiff;
    }
});
var _version = /*#__PURE__*/ _interop_require_default(require("../version"));
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
var VersionDiff = /*#__PURE__*/ function() {
    function VersionDiff(version, releaseVersion) {
        _class_call_check(this, VersionDiff);
        this.version = version;
        this.releaseVersion = releaseVersion;
    }
    _create_class(VersionDiff, [
        {
            key: "isEmpty",
            value: function isEmpty() {
                var empty = true;
                if (this.version !== null) {
                    var versionEqualToReleaseVersion = this.version.isEqualTo(this.releaseVersion);
                    empty = versionEqualToReleaseVersion; ///
                }
                return empty;
            }
        },
        {
            key: "getVersion",
            value: function getVersion() {
                return this.version;
            }
        },
        {
            key: "getReleaseVersion",
            value: function getReleaseVersion() {
                return this.releaseVersion;
            }
        },
        {
            key: "save",
            value: function save(packageJSON) {
                if (this.version === null) {
                    return;
                }
                var releaseVersionString = this.releaseVersion.asString(), version = releaseVersionString; ///
                Object.assign(packageJSON, {
                    version: version
                });
            }
        },
        {
            key: "asString",
            value: function asString() {
                var versionString = this.version.asString(), releaseVersionString = this.releaseVersion.asString(), string = '"'.concat(versionString, '" -> "').concat(releaseVersionString, '"');
                return string;
            }
        }
    ], [
        {
            key: "fromVersionStringAndReleaseVersion",
            value: function fromVersionStringAndReleaseVersion(versionString, releaseVersion) {
                var version = _version.default.fromVersionString(versionString), versionDiff = new VersionDiff(version, releaseVersion);
                return versionDiff;
            }
        }
    ]);
    return VersionDiff;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL3ZlcnNpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBWZXJzaW9uIGZyb20gXCIuLi92ZXJzaW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcnNpb25EaWZmIHtcbiAgY29uc3RydWN0b3IodmVyc2lvbiwgcmVsZWFzZVZlcnNpb24pIHtcbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHRoaXMucmVsZWFzZVZlcnNpb24gPSByZWxlYXNlVmVyc2lvbjtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgbGV0IGVtcHR5ID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnZlcnNpb24gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHZlcnNpb25FcXVhbFRvUmVsZWFzZVZlcnNpb24gPSB0aGlzLnZlcnNpb24uaXNFcXVhbFRvKHRoaXMucmVsZWFzZVZlcnNpb24pO1xuXG4gICAgICBlbXB0eSA9IHZlcnNpb25FcXVhbFRvUmVsZWFzZVZlcnNpb247IC8vL1xuICAgIH1cblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGdldFZlcnNpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbiAgfVxuXG4gIGdldFJlbGVhc2VWZXJzaW9uKCkge1xuICAgIHJldHVybiB0aGlzLnJlbGVhc2VWZXJzaW9uO1xuICB9XG5cbiAgc2F2ZShwYWNrYWdlSlNPTikge1xuICAgIGlmICh0aGlzLnZlcnNpb24gPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZWxlYXNlVmVyc2lvblN0cmluZyA9IHRoaXMucmVsZWFzZVZlcnNpb24uYXNTdHJpbmcoKSxcbiAgICAgICAgICB2ZXJzaW9uID0gcmVsZWFzZVZlcnNpb25TdHJpbmc7IC8vL1xuXG4gICAgT2JqZWN0LmFzc2lnbihwYWNrYWdlSlNPTiwge1xuICAgICAgdmVyc2lvblxuICAgIH0pO1xuICB9XG5cbiAgYXNTdHJpbmcoKSB7XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IHRoaXMudmVyc2lvbi5hc1N0cmluZygpLFxuICAgICAgICAgIHJlbGVhc2VWZXJzaW9uU3RyaW5nID0gdGhpcy5yZWxlYXNlVmVyc2lvbi5hc1N0cmluZygpLFxuICAgICAgICAgIHN0cmluZyA9IGBcIiR7dmVyc2lvblN0cmluZ31cIiAtPiBcIiR7cmVsZWFzZVZlcnNpb25TdHJpbmd9XCJgO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVmVyc2lvblN0cmluZ0FuZFJlbGVhc2VWZXJzaW9uKHZlcnNpb25TdHJpbmcsIHJlbGVhc2VWZXJzaW9uKSB7XG4gICAgY29uc3QgdmVyc2lvbiA9IFZlcnNpb24uZnJvbVZlcnNpb25TdHJpbmcodmVyc2lvblN0cmluZyksXG4gICAgICAgICAgdmVyc2lvbkRpZmYgPSBuZXcgVmVyc2lvbkRpZmYodmVyc2lvbiwgcmVsZWFzZVZlcnNpb24pO1xuXG4gICAgcmV0dXJuIHZlcnNpb25EaWZmO1xuICB9XG59XG4iXSwibmFtZXMiOlsiVmVyc2lvbkRpZmYiLCJ2ZXJzaW9uIiwicmVsZWFzZVZlcnNpb24iLCJpc0VtcHR5IiwiZW1wdHkiLCJ2ZXJzaW9uRXF1YWxUb1JlbGVhc2VWZXJzaW9uIiwiaXNFcXVhbFRvIiwiZ2V0VmVyc2lvbiIsImdldFJlbGVhc2VWZXJzaW9uIiwic2F2ZSIsInBhY2thZ2VKU09OIiwicmVsZWFzZVZlcnNpb25TdHJpbmciLCJhc1N0cmluZyIsIk9iamVjdCIsImFzc2lnbiIsInZlcnNpb25TdHJpbmciLCJzdHJpbmciLCJmcm9tVmVyc2lvblN0cmluZ0FuZFJlbGVhc2VWZXJzaW9uIiwiVmVyc2lvbiIsImZyb21WZXJzaW9uU3RyaW5nIiwidmVyc2lvbkRpZmYiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2VBSXFCQTs7OzhEQUZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUwsSUFBQSxBQUFNQSw0QkFBTjthQUFNQSxZQUNQQyxPQUFPLEVBQUVDLGNBQWM7Z0NBRGhCRjtRQUVqQixJQUFJLENBQUNDLE9BQU8sR0FBR0E7UUFDZixJQUFJLENBQUNDLGNBQWMsR0FBR0E7O2tCQUhMRjs7WUFNbkJHLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxJQUFJQyxRQUFRO2dCQUVaLElBQUksSUFBSSxDQUFDSCxPQUFPLEtBQUssTUFBTTtvQkFDekIsSUFBTUksK0JBQStCLElBQUksQ0FBQ0osT0FBTyxDQUFDSyxTQUFTLENBQUMsSUFBSSxDQUFDSixjQUFjO29CQUUvRUUsUUFBUUMsOEJBQThCLEdBQUc7Z0JBQzNDO2dCQUVBLE9BQU9EO1lBQ1Q7OztZQUVBRyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNOLE9BQU87WUFDckI7OztZQUVBTyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNOLGNBQWM7WUFDNUI7OztZQUVBTyxLQUFBQTttQkFBQUEsU0FBQUEsS0FBS0MsV0FBVztnQkFDZCxJQUFJLElBQUksQ0FBQ1QsT0FBTyxLQUFLLE1BQU07b0JBQ3pCO2dCQUNGO2dCQUVBLElBQU1VLHVCQUF1QixJQUFJLENBQUNULGNBQWMsQ0FBQ1UsUUFBUSxJQUNuRFgsVUFBVVUsc0JBQXNCLEdBQUc7Z0JBRXpDRSxPQUFPQyxNQUFNLENBQUNKLGFBQWE7b0JBQ3pCVCxTQUFBQTtnQkFDRjtZQUNGOzs7WUFFQVcsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLElBQU1HLGdCQUFnQixJQUFJLENBQUNkLE9BQU8sQ0FBQ1csUUFBUSxJQUNyQ0QsdUJBQXVCLElBQUksQ0FBQ1QsY0FBYyxDQUFDVSxRQUFRLElBQ25ESSxTQUFTLEFBQUMsSUFBeUJMLE9BQXRCSSxlQUFjLFVBQTZCLE9BQXJCSixzQkFBcUI7Z0JBRTlELE9BQU9LO1lBQ1Q7Ozs7WUFFT0MsS0FBQUE7bUJBQVAsU0FBT0EsbUNBQW1DRixhQUFhLEVBQUViLGNBQWM7Z0JBQ3JFLElBQU1ELFVBQVVpQixnQkFBTyxDQUFDQyxpQkFBaUIsQ0FBQ0osZ0JBQ3BDSyxjQUFjLElBakRIcEIsWUFpRG1CQyxTQUFTQztnQkFFN0MsT0FBT2tCO1lBQ1Q7OztXQXBEbUJwQiJ9
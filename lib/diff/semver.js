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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL3NlbXZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VtdmVyRGlmZiB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHNlbXZlciwgcmVsZWFzZVNlbXZlcikge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5zZW12ZXIgPSBzZW12ZXI7XG4gICAgdGhpcy5yZWxlYXNlU2VtdmVyID0gcmVsZWFzZVNlbXZlcjtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldFNlbXZlcigpIHtcbiAgICByZXR1cm4gdGhpcy5zZW12ZXI7XG4gIH1cblxuICBnZXRSZWxlYXNlU2VtdmVyKCkge1xuICAgIHJldHVybiB0aGlzLnJlbGVhc2VTZW12ZXI7XG4gIH1cblxuICBzYXZlKHBhY2thZ2VKU09OKSB7XG4gICAgY29uc3Qgc2VtdmVyID0gdGhpcy5yZWxlYXNlU2VtdmVyO1xuXG4gICAgcGFja2FnZUpTT05bdGhpcy5uYW1lXSA9IHNlbXZlcjtcbiAgfVxuXG4gIGFzU3RyaW5nKGxhc3QpIHtcbiAgICBsZXQgc3RyaW5nID0gYCAgICAgXCIke3RoaXMubmFtZX1cIjogXCIke3RoaXMuc2VtdmVyfVwiIC0+IFwiJHt0aGlzLnJlbGVhc2VTZW12ZXJ9XCJgO1xuXG4gICAgaWYgKCFsYXN0KSB7XG4gICAgICBzdHJpbmcgPSBgJHtzdHJpbmd9LFxcbmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTmFtZVNlbXZlckFuZFJlbGVhc2VTZW12ZXIobmFtZSwgc2VtdmVyLCByZWxlYXNlU2VtdmVyKSB7XG4gICAgbGV0IHNlbXZlckRpZmYgPSBudWxsO1xuXG4gICAgaWYgKHNlbXZlciAhPT0gcmVsZWFzZVNlbXZlcikge1xuICAgICAgc2VtdmVyRGlmZiA9IG5ldyBTZW12ZXJEaWZmKG5hbWUsIHNlbXZlciwgcmVsZWFzZVNlbXZlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbXZlckRpZmY7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJTZW12ZXJEaWZmIiwibmFtZSIsInNlbXZlciIsInJlbGVhc2VTZW12ZXIiLCJnZXROYW1lIiwiZ2V0U2VtdmVyIiwiZ2V0UmVsZWFzZVNlbXZlciIsInNhdmUiLCJwYWNrYWdlSlNPTiIsImFzU3RyaW5nIiwibGFzdCIsInN0cmluZyIsImZyb21OYW1lU2VtdmVyQW5kUmVsZWFzZVNlbXZlciIsInNlbXZlckRpZmYiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2VBRXFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFOLElBQUEsQUFBTUEsMkJBQU47YUFBTUEsV0FDUEMsSUFBSSxFQUFFQyxNQUFNLEVBQUVDLGFBQWE7Z0NBRHBCSDtRQUVqQixJQUFJLENBQUNDLElBQUksR0FBR0E7UUFDWixJQUFJLENBQUNDLE1BQU0sR0FBR0E7UUFDZCxJQUFJLENBQUNDLGFBQWEsR0FBR0E7O2tCQUpKSDs7WUFPbkJJLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0gsSUFBSTtZQUNsQjs7O1lBRUFJLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0gsTUFBTTtZQUNwQjs7O1lBRUFJLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0gsYUFBYTtZQUMzQjs7O1lBRUFJLEtBQUFBO21CQUFBQSxTQUFBQSxLQUFLQyxXQUFXO2dCQUNkLElBQU1OLFNBQVMsSUFBSSxDQUFDQyxhQUFhO2dCQUVqQ0ssV0FBVyxDQUFDLElBQUksQ0FBQ1AsSUFBSSxDQUFDLEdBQUdDO1lBQzNCOzs7WUFFQU8sS0FBQUE7bUJBQUFBLFNBQUFBLFNBQVNDLElBQUk7Z0JBQ1gsSUFBSUMsU0FBUyxBQUFDLFNBQXdCLE9BQWhCLElBQUksQ0FBQ1YsSUFBSSxFQUFDLFFBQTBCLE9BQXBCLElBQUksQ0FBQ0MsTUFBTSxFQUFDLFVBQTJCLE9BQW5CLElBQUksQ0FBQ0MsYUFBYSxFQUFDO2dCQUU3RSxJQUFJLENBQUNPLE1BQU07b0JBQ1RDLFNBQVMsQUFBQyxHQUFTLE9BQVBBLFFBQU87Z0JBQ3JCO2dCQUVBLE9BQU9BO1lBQ1Q7Ozs7WUFFT0MsS0FBQUE7bUJBQVAsU0FBT0EsK0JBQStCWCxJQUFJLEVBQUVDLE1BQU0sRUFBRUMsYUFBYTtnQkFDL0QsSUFBSVUsYUFBYTtnQkFFakIsSUFBSVgsV0FBV0MsZUFBZTtvQkFDNUJVLGFBQWEsSUF2Q0ViLFdBdUNhQyxNQUFNQyxRQUFRQztnQkFDNUM7Z0JBRUEsT0FBT1U7WUFDVDs7O1dBM0NtQmIifQ==
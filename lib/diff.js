"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Diff;
    }
});
var _map = /*#__PURE__*/ _interop_require_default(require("./diff/map"));
var _version = /*#__PURE__*/ _interop_require_default(require("./diff/version"));
var _constants = require("./constants");
var _packageJSON = require("./utilities/packageJSON");
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
var Diff = /*#__PURE__*/ function() {
    function Diff(release, versionDiff, dependencyMapDiff, devDependencyMapDiff) {
        _class_call_check(this, Diff);
        this.release = release;
        this.versionDiff = versionDiff;
        this.dependencyMapDiff = dependencyMapDiff;
        this.devDependencyMapDiff = devDependencyMapDiff;
    }
    _create_class(Diff, [
        {
            key: "getRelease",
            value: function getRelease() {
                return this.release;
            }
        },
        {
            key: "getVersionDiff",
            value: function getVersionDiff() {
                return this.versionDiff;
            }
        },
        {
            key: "getDependencyMapDiff",
            value: function getDependencyMapDiff() {
                return this.dependencyMapDiff;
            }
        },
        {
            key: "getDevDependencyMapDiff",
            value: function getDevDependencyMapDiff() {
                return this.devDependencyMapDiff;
            }
        },
        {
            key: "getName",
            value: function getName() {
                return this.release.getName();
            }
        },
        {
            key: "isPublishable",
            value: function isPublishable() {
                return this.release.isPublishable();
            }
        },
        {
            key: "getSubDirectoryPath",
            value: function getSubDirectoryPath() {
                return this.release.getSubDirectoryPath();
            }
        },
        {
            key: "getDevDependencyNames",
            value: function getDevDependencyNames() {
                return this.release.getDevDependencyNames();
            }
        },
        {
            key: "isVersionDiffEmpty",
            value: function isVersionDiffEmpty() {
                return this.versionDiff.isEmpty();
            }
        },
        {
            key: "isDependencyMapDiffEmpty",
            value: function isDependencyMapDiffEmpty() {
                return this.dependencyMapDiff.isEmpty();
            }
        },
        {
            key: "isDevDependencyMapDiffEmpty",
            value: function isDevDependencyMapDiffEmpty() {
                return this.devDependencyMapDiff.isEmpty();
            }
        },
        {
            key: "someDevDependencySemverDiff",
            value: function someDevDependencySemverDiff(callback) {
                return this.devDependencyMapDiff.someSemverDiff(callback);
            } ///
        },
        {
            key: "save",
            value: function save() {
                var success = false;
                var subDirectoryPath = this.getSubDirectoryPath(), packageJSON = (0, _packageJSON.readPackageJSONFile)(subDirectoryPath);
                if (packageJSON !== null) {
                    this.versionDiff.save(packageJSON);
                    this.dependencyMapDiff.save(packageJSON, _constants.DEPENDENCIES);
                    this.devDependencyMapDiff.save(packageJSON, _constants.DEV_DEPENDENCIES);
                    success = (0, _packageJSON.writePackageJSONFile)(subDirectoryPath, packageJSON);
                }
                return success;
            }
        },
        {
            key: "git",
            value: function git(quietly, callback) {
                this.release.git(quietly, callback);
            }
        },
        {
            key: "install",
            value: function install(quietly, callback) {
                this.release.install(quietly, callback);
            }
        },
        {
            key: "build",
            value: function build(quietly, callback) {
                this.release.build(quietly, callback);
            }
        },
        {
            key: "publish",
            value: function publish(quietly, callback) {
                this.release.publish(quietly, callback);
            }
        },
        {
            key: "removeDependency",
            value: function removeDependency(name) {
                this.dependencyMapDiff.removeSemverDiff(name);
            }
        },
        {
            key: "removeDevDependency",
            value: function removeDevDependency(name) {
                this.devDependencyMapDiff.removeSemverDiff(name);
            }
        },
        {
            key: "asString",
            value: function asString() {
                var string = "";
                var name = this.getName(), subDirectoryPath = this.getSubDirectoryPath();
                string += name === null ? ' "'.concat(subDirectoryPath, '":\n') : ' "'.concat(subDirectoryPath, '" ("').concat(name, '"):\n');
                var versionDiffEmpty = this.isVersionDiffEmpty(), dependencyMapDiffEmpty = this.isDependencyMapDiffEmpty(), devDependencyMapDiffEmpty = this.isDevDependencyMapDiffEmpty();
                if (!versionDiffEmpty) {
                    var versionDiffString = this.versionDiff.asString();
                    string += '\n   "version": '.concat(versionDiffString, ",");
                }
                if (!dependencyMapDiffEmpty) {
                    var dependencyMapDiffString = this.dependencyMapDiff.asString();
                    string += '\n   "dependencies": '.concat(dependencyMapDiffString, ",");
                }
                if (!devDependencyMapDiffEmpty) {
                    var devDependencyMapDiffString = this.devDependencyMapDiff.asString();
                    string += '\n   "devDependencies": '.concat(devDependencyMapDiffString, ",");
                }
                string = string.replace(/,$/, "\n");
                return string;
            }
        }
    ], [
        {
            key: "fromRelease",
            value: function fromRelease(release) {
                var diff = null;
                var subDirectoryPath = release.getSubDirectoryPath(), packageJSON = (0, _packageJSON.readPackageJSONFile)(subDirectoryPath);
                if (packageJSON !== null) {
                    var _packageJSON_version = packageJSON.version, version = _packageJSON_version === void 0 ? null : _packageJSON_version, _packageJSON_dependencies = packageJSON.dependencies, dependencies = _packageJSON_dependencies === void 0 ? {} : _packageJSON_dependencies, _packageJSON_devDependencies = packageJSON.devDependencies, devDependencies = _packageJSON_devDependencies === void 0 ? {} : _packageJSON_devDependencies, versionString = version, dependencyMap = dependencies, devDependencyMap = devDependencies, releaseVersion = release.getVersion(), releaseDependencyMap = release.getDependencyMap(), releaseDevDependencyMap = release.getDevDependencyMap(), versionDiff = _version.default.fromVersionStringAndReleaseVersion(versionString, releaseVersion), dependencyMapDiff = _map.default.fromMapAndReleaseMap(dependencyMap, releaseDependencyMap), devDependencyMapDiff = _map.default.fromMapAndReleaseMap(devDependencyMap, releaseDevDependencyMap);
                    diff = new Diff(release, versionDiff, dependencyMapDiff, devDependencyMapDiff);
                }
                return diff;
            }
        }
    ]);
    return Diff;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWZmLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgTWFwRGlmZiBmcm9tIFwiLi9kaWZmL21hcFwiO1xuaW1wb3J0IFZlcnNpb25EaWZmIGZyb20gXCIuL2RpZmYvdmVyc2lvblwiO1xuXG5pbXBvcnQgeyBERVBFTkRFTkNJRVMsIERFVl9ERVBFTkRFTkNJRVMgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHJlYWRQYWNrYWdlSlNPTkZpbGUsIHdyaXRlUGFja2FnZUpTT05GaWxlIH0gZnJvbSBcIi4vdXRpbGl0aWVzL3BhY2thZ2VKU09OXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpZmYge1xuICBjb25zdHJ1Y3RvcihyZWxlYXNlLCB2ZXJzaW9uRGlmZiwgZGVwZW5kZW5jeU1hcERpZmYsIGRldkRlcGVuZGVuY3lNYXBEaWZmKSB7XG4gICAgdGhpcy5yZWxlYXNlID0gcmVsZWFzZTtcbiAgICB0aGlzLnZlcnNpb25EaWZmID0gdmVyc2lvbkRpZmY7XG4gICAgdGhpcy5kZXBlbmRlbmN5TWFwRGlmZiA9IGRlcGVuZGVuY3lNYXBEaWZmO1xuICAgIHRoaXMuZGV2RGVwZW5kZW5jeU1hcERpZmYgPSBkZXZEZXBlbmRlbmN5TWFwRGlmZjtcbiAgfVxuXG4gIGdldFJlbGVhc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVsZWFzZTtcbiAgfVxuXG4gIGdldFZlcnNpb25EaWZmKCkge1xuICAgIHJldHVybiB0aGlzLnZlcnNpb25EaWZmO1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jeU1hcERpZmYoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVwZW5kZW5jeU1hcERpZmY7XG4gIH1cblxuICBnZXREZXZEZXBlbmRlbmN5TWFwRGlmZigpIHtcbiAgICByZXR1cm4gdGhpcy5kZXZEZXBlbmRlbmN5TWFwRGlmZjtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLnJlbGVhc2UuZ2V0TmFtZSgpOyB9XG5cbiAgaXNQdWJsaXNoYWJsZSgpIHsgcmV0dXJuIHRoaXMucmVsZWFzZS5pc1B1Ymxpc2hhYmxlKCk7IH1cblxuICBnZXRTdWJEaXJlY3RvcnlQYXRoKCkgeyByZXR1cm4gdGhpcy5yZWxlYXNlLmdldFN1YkRpcmVjdG9yeVBhdGgoKTsgfVxuXG4gIGdldERldkRlcGVuZGVuY3lOYW1lcygpIHsgcmV0dXJuIHRoaXMucmVsZWFzZS5nZXREZXZEZXBlbmRlbmN5TmFtZXMoKTsgfVxuXG4gIGlzVmVyc2lvbkRpZmZFbXB0eSgpIHsgcmV0dXJuIHRoaXMudmVyc2lvbkRpZmYuaXNFbXB0eSgpOyB9XG5cbiAgaXNEZXBlbmRlbmN5TWFwRGlmZkVtcHR5KCkgeyByZXR1cm4gdGhpcy5kZXBlbmRlbmN5TWFwRGlmZi5pc0VtcHR5KCk7IH1cblxuICBpc0RldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkoKSB7IHJldHVybiB0aGlzLmRldkRlcGVuZGVuY3lNYXBEaWZmLmlzRW1wdHkoKTsgfVxuXG4gIHNvbWVEZXZEZXBlbmRlbmN5U2VtdmVyRGlmZihjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5kZXZEZXBlbmRlbmN5TWFwRGlmZi5zb21lU2VtdmVyRGlmZihjYWxsYmFjayk7IH0gLy8vXG5cbiAgc2F2ZSgpIHtcbiAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc3ViRGlyZWN0b3J5UGF0aCA9IHRoaXMuZ2V0U3ViRGlyZWN0b3J5UGF0aCgpLFxuICAgICAgICAgIHBhY2thZ2VKU09OID0gcmVhZFBhY2thZ2VKU09ORmlsZShzdWJEaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChwYWNrYWdlSlNPTiAhPT0gbnVsbCkge1xuICAgICAgdGhpcy52ZXJzaW9uRGlmZi5zYXZlKHBhY2thZ2VKU09OKTtcblxuICAgICAgdGhpcy5kZXBlbmRlbmN5TWFwRGlmZi5zYXZlKHBhY2thZ2VKU09OLCBERVBFTkRFTkNJRVMpO1xuXG4gICAgICB0aGlzLmRldkRlcGVuZGVuY3lNYXBEaWZmLnNhdmUocGFja2FnZUpTT04sIERFVl9ERVBFTkRFTkNJRVMpO1xuXG4gICAgICBzdWNjZXNzID0gd3JpdGVQYWNrYWdlSlNPTkZpbGUoc3ViRGlyZWN0b3J5UGF0aCwgcGFja2FnZUpTT04pO1xuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgZ2l0KHF1aWV0bHksIGNhbGxiYWNrKSB7IHRoaXMucmVsZWFzZS5naXQocXVpZXRseSwgY2FsbGJhY2spOyB9XG5cbiAgaW5zdGFsbChxdWlldGx5LCBjYWxsYmFjaykgeyB0aGlzLnJlbGVhc2UuaW5zdGFsbChxdWlldGx5LCBjYWxsYmFjayk7IH1cblxuICBidWlsZChxdWlldGx5LCBjYWxsYmFjaykgeyB0aGlzLnJlbGVhc2UuYnVpbGQocXVpZXRseSwgY2FsbGJhY2spOyB9XG5cbiAgcHVibGlzaChxdWlldGx5LCBjYWxsYmFjaykgeyB0aGlzLnJlbGVhc2UucHVibGlzaChxdWlldGx5LCBjYWxsYmFjayk7IH1cblxuICByZW1vdmVEZXBlbmRlbmN5KG5hbWUpIHsgdGhpcy5kZXBlbmRlbmN5TWFwRGlmZi5yZW1vdmVTZW12ZXJEaWZmKG5hbWUpOyB9XG5cbiAgcmVtb3ZlRGV2RGVwZW5kZW5jeShuYW1lKSB7IHRoaXMuZGV2RGVwZW5kZW5jeU1hcERpZmYucmVtb3ZlU2VtdmVyRGlmZihuYW1lKTsgfVxuXG4gIGFzU3RyaW5nKCkge1xuICAgIGxldCBzdHJpbmcgPSBgYDtcblxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICBzdWJEaXJlY3RvcnlQYXRoID0gdGhpcy5nZXRTdWJEaXJlY3RvcnlQYXRoKCk7XG5cbiAgICBzdHJpbmcgKz0gKG5hbWUgPT09IG51bGwpID9cbiAgICAgICAgICAgIGAgXCIke3N1YkRpcmVjdG9yeVBhdGh9XCI6XFxuYCA6XG4gICAgICAgICAgICAgIGAgXCIke3N1YkRpcmVjdG9yeVBhdGh9XCIgKFwiJHtuYW1lfVwiKTpcXG5gO1xuXG4gICAgY29uc3QgdmVyc2lvbkRpZmZFbXB0eSA9IHRoaXMuaXNWZXJzaW9uRGlmZkVtcHR5KCksXG4gICAgICAgICAgZGVwZW5kZW5jeU1hcERpZmZFbXB0eSA9IHRoaXMuaXNEZXBlbmRlbmN5TWFwRGlmZkVtcHR5KCksXG4gICAgICAgICAgZGV2RGVwZW5kZW5jeU1hcERpZmZFbXB0eSA9IHRoaXMuaXNEZXZEZXBlbmRlbmN5TWFwRGlmZkVtcHR5KCk7XG5cbiAgICBpZiAoIXZlcnNpb25EaWZmRW1wdHkpIHtcbiAgICAgIGNvbnN0IHZlcnNpb25EaWZmU3RyaW5nID0gdGhpcy52ZXJzaW9uRGlmZi5hc1N0cmluZygpO1xuXG4gICAgICBzdHJpbmcgKz0gYFxcbiAgIFwidmVyc2lvblwiOiAke3ZlcnNpb25EaWZmU3RyaW5nfSxgO1xuICAgIH1cblxuICAgIGlmICghZGVwZW5kZW5jeU1hcERpZmZFbXB0eSkge1xuICAgICAgY29uc3QgZGVwZW5kZW5jeU1hcERpZmZTdHJpbmcgPSB0aGlzLmRlcGVuZGVuY3lNYXBEaWZmLmFzU3RyaW5nKCk7XG5cbiAgICAgIHN0cmluZyArPSBgXFxuICAgXCJkZXBlbmRlbmNpZXNcIjogJHtkZXBlbmRlbmN5TWFwRGlmZlN0cmluZ30sYDtcbiAgICB9XG5cbiAgICBpZiAoIWRldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkpIHtcbiAgICAgIGNvbnN0IGRldkRlcGVuZGVuY3lNYXBEaWZmU3RyaW5nID0gdGhpcy5kZXZEZXBlbmRlbmN5TWFwRGlmZi5hc1N0cmluZygpO1xuXG4gICAgICBzdHJpbmcgKz0gYFxcbiAgIFwiZGV2RGVwZW5kZW5jaWVzXCI6ICR7ZGV2RGVwZW5kZW5jeU1hcERpZmZTdHJpbmd9LGA7XG4gICAgfVxuXG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLywkLywgXCJcXG5cIik7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgc3RhdGljIGZyb21SZWxlYXNlKHJlbGVhc2UpIHtcbiAgICBsZXQgZGlmZiA9IG51bGw7XG5cbiAgICBjb25zdCBzdWJEaXJlY3RvcnlQYXRoID0gcmVsZWFzZS5nZXRTdWJEaXJlY3RvcnlQYXRoKCksXG4gICAgICAgICAgcGFja2FnZUpTT04gPSByZWFkUGFja2FnZUpTT05GaWxlKHN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHBhY2thZ2VKU09OICE9PSBudWxsKSB7XG4gICAgICBjb25zdCB7IHZlcnNpb24gPSBudWxsLCBkZXBlbmRlbmNpZXMgPSB7fSwgZGV2RGVwZW5kZW5jaWVzID0ge30gfSA9IHBhY2thZ2VKU09OLFxuICAgICAgICAgICAgdmVyc2lvblN0cmluZyA9IHZlcnNpb24sICAvLy9cbiAgICAgICAgICAgIGRlcGVuZGVuY3lNYXAgPSBkZXBlbmRlbmNpZXMsIC8vL1xuICAgICAgICAgICAgZGV2RGVwZW5kZW5jeU1hcCA9IGRldkRlcGVuZGVuY2llcywgLy8vXG4gICAgICAgICAgICByZWxlYXNlVmVyc2lvbiA9IHJlbGVhc2UuZ2V0VmVyc2lvbigpLFxuICAgICAgICAgICAgcmVsZWFzZURlcGVuZGVuY3lNYXAgPSByZWxlYXNlLmdldERlcGVuZGVuY3lNYXAoKSxcbiAgICAgICAgICAgIHJlbGVhc2VEZXZEZXBlbmRlbmN5TWFwID0gcmVsZWFzZS5nZXREZXZEZXBlbmRlbmN5TWFwKCksXG4gICAgICAgICAgICB2ZXJzaW9uRGlmZiA9IFZlcnNpb25EaWZmLmZyb21WZXJzaW9uU3RyaW5nQW5kUmVsZWFzZVZlcnNpb24odmVyc2lvblN0cmluZywgcmVsZWFzZVZlcnNpb24pLFxuICAgICAgICAgICAgZGVwZW5kZW5jeU1hcERpZmYgPSBNYXBEaWZmLmZyb21NYXBBbmRSZWxlYXNlTWFwKGRlcGVuZGVuY3lNYXAsIHJlbGVhc2VEZXBlbmRlbmN5TWFwKSxcbiAgICAgICAgICAgIGRldkRlcGVuZGVuY3lNYXBEaWZmID0gTWFwRGlmZi5mcm9tTWFwQW5kUmVsZWFzZU1hcChkZXZEZXBlbmRlbmN5TWFwLCByZWxlYXNlRGV2RGVwZW5kZW5jeU1hcCk7XG5cbiAgICAgIGRpZmYgPSBuZXcgRGlmZihyZWxlYXNlLCB2ZXJzaW9uRGlmZiwgZGVwZW5kZW5jeU1hcERpZmYsIGRldkRlcGVuZGVuY3lNYXBEaWZmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlmZjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkRpZmYiLCJyZWxlYXNlIiwidmVyc2lvbkRpZmYiLCJkZXBlbmRlbmN5TWFwRGlmZiIsImRldkRlcGVuZGVuY3lNYXBEaWZmIiwiZ2V0UmVsZWFzZSIsImdldFZlcnNpb25EaWZmIiwiZ2V0RGVwZW5kZW5jeU1hcERpZmYiLCJnZXREZXZEZXBlbmRlbmN5TWFwRGlmZiIsImdldE5hbWUiLCJpc1B1Ymxpc2hhYmxlIiwiZ2V0U3ViRGlyZWN0b3J5UGF0aCIsImdldERldkRlcGVuZGVuY3lOYW1lcyIsImlzVmVyc2lvbkRpZmZFbXB0eSIsImlzRW1wdHkiLCJpc0RlcGVuZGVuY3lNYXBEaWZmRW1wdHkiLCJpc0RldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkiLCJzb21lRGV2RGVwZW5kZW5jeVNlbXZlckRpZmYiLCJjYWxsYmFjayIsInNvbWVTZW12ZXJEaWZmIiwic2F2ZSIsInN1Y2Nlc3MiLCJzdWJEaXJlY3RvcnlQYXRoIiwicGFja2FnZUpTT04iLCJyZWFkUGFja2FnZUpTT05GaWxlIiwiREVQRU5ERU5DSUVTIiwiREVWX0RFUEVOREVOQ0lFUyIsIndyaXRlUGFja2FnZUpTT05GaWxlIiwiZ2l0IiwicXVpZXRseSIsImluc3RhbGwiLCJidWlsZCIsInB1Ymxpc2giLCJyZW1vdmVEZXBlbmRlbmN5IiwibmFtZSIsInJlbW92ZVNlbXZlckRpZmYiLCJyZW1vdmVEZXZEZXBlbmRlbmN5IiwiYXNTdHJpbmciLCJzdHJpbmciLCJ2ZXJzaW9uRGlmZkVtcHR5IiwiZGVwZW5kZW5jeU1hcERpZmZFbXB0eSIsImRldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkiLCJ2ZXJzaW9uRGlmZlN0cmluZyIsImRlcGVuZGVuY3lNYXBEaWZmU3RyaW5nIiwiZGV2RGVwZW5kZW5jeU1hcERpZmZTdHJpbmciLCJyZXBsYWNlIiwiZnJvbVJlbGVhc2UiLCJkaWZmIiwidmVyc2lvbiIsImRlcGVuZGVuY2llcyIsImRldkRlcGVuZGVuY2llcyIsInZlcnNpb25TdHJpbmciLCJkZXBlbmRlbmN5TWFwIiwiZGV2RGVwZW5kZW5jeU1hcCIsInJlbGVhc2VWZXJzaW9uIiwiZ2V0VmVyc2lvbiIsInJlbGVhc2VEZXBlbmRlbmN5TWFwIiwiZ2V0RGVwZW5kZW5jeU1hcCIsInJlbGVhc2VEZXZEZXBlbmRlbmN5TWFwIiwiZ2V0RGV2RGVwZW5kZW5jeU1hcCIsIlZlcnNpb25EaWZmIiwiZnJvbVZlcnNpb25TdHJpbmdBbmRSZWxlYXNlVmVyc2lvbiIsIk1hcERpZmYiLCJmcm9tTWFwQW5kUmVsZWFzZU1hcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7ZUFRcUJBOzs7MERBTkQ7OERBQ0k7eUJBRXVCOzJCQUNXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTNDLElBQUEsQUFBTUEscUJBQU47YUFBTUEsS0FDUEMsT0FBTyxFQUFFQyxXQUFXLEVBQUVDLGlCQUFpQixFQUFFQyxvQkFBb0I7Z0NBRHRESjtRQUVqQixJQUFJLENBQUNDLE9BQU8sR0FBR0E7UUFDZixJQUFJLENBQUNDLFdBQVcsR0FBR0E7UUFDbkIsSUFBSSxDQUFDQyxpQkFBaUIsR0FBR0E7UUFDekIsSUFBSSxDQUFDQyxvQkFBb0IsR0FBR0E7O2tCQUxYSjs7WUFRbkJLLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0osT0FBTztZQUNyQjs7O1lBRUFLLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0osV0FBVztZQUN6Qjs7O1lBRUFLLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0osaUJBQWlCO1lBQy9COzs7WUFFQUssS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDSixvQkFBb0I7WUFDbEM7OztZQUVBSyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQVksT0FBTyxJQUFJLENBQUNS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
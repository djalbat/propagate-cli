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
            key: "poll",
            value: function poll(quietly, callback) {
                var specifiers = [];
                this.dependencyMapDiff.getSpecifiers(specifiers);
                this.devDependencyMapDiff.getSpecifiers(specifiers);
                this.release.poll(specifiers, quietly, callback);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWZmLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgTWFwRGlmZiBmcm9tIFwiLi9kaWZmL21hcFwiO1xuaW1wb3J0IFZlcnNpb25EaWZmIGZyb20gXCIuL2RpZmYvdmVyc2lvblwiO1xuXG5pbXBvcnQgeyBERVBFTkRFTkNJRVMsIERFVl9ERVBFTkRFTkNJRVMgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHJlYWRQYWNrYWdlSlNPTkZpbGUsIHdyaXRlUGFja2FnZUpTT05GaWxlIH0gZnJvbSBcIi4vdXRpbGl0aWVzL3BhY2thZ2VKU09OXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpZmYge1xuICBjb25zdHJ1Y3RvcihyZWxlYXNlLCB2ZXJzaW9uRGlmZiwgZGVwZW5kZW5jeU1hcERpZmYsIGRldkRlcGVuZGVuY3lNYXBEaWZmKSB7XG4gICAgdGhpcy5yZWxlYXNlID0gcmVsZWFzZTtcbiAgICB0aGlzLnZlcnNpb25EaWZmID0gdmVyc2lvbkRpZmY7XG4gICAgdGhpcy5kZXBlbmRlbmN5TWFwRGlmZiA9IGRlcGVuZGVuY3lNYXBEaWZmO1xuICAgIHRoaXMuZGV2RGVwZW5kZW5jeU1hcERpZmYgPSBkZXZEZXBlbmRlbmN5TWFwRGlmZjtcbiAgfVxuXG4gIGdldFJlbGVhc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVsZWFzZTtcbiAgfVxuXG4gIGdldFZlcnNpb25EaWZmKCkge1xuICAgIHJldHVybiB0aGlzLnZlcnNpb25EaWZmO1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jeU1hcERpZmYoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVwZW5kZW5jeU1hcERpZmY7XG4gIH1cblxuICBnZXREZXZEZXBlbmRlbmN5TWFwRGlmZigpIHtcbiAgICByZXR1cm4gdGhpcy5kZXZEZXBlbmRlbmN5TWFwRGlmZjtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLnJlbGVhc2UuZ2V0TmFtZSgpOyB9XG5cbiAgaXNQdWJsaXNoYWJsZSgpIHsgcmV0dXJuIHRoaXMucmVsZWFzZS5pc1B1Ymxpc2hhYmxlKCk7IH1cblxuICBnZXRTdWJEaXJlY3RvcnlQYXRoKCkgeyByZXR1cm4gdGhpcy5yZWxlYXNlLmdldFN1YkRpcmVjdG9yeVBhdGgoKTsgfVxuXG4gIGdldERldkRlcGVuZGVuY3lOYW1lcygpIHsgcmV0dXJuIHRoaXMucmVsZWFzZS5nZXREZXZEZXBlbmRlbmN5TmFtZXMoKTsgfVxuXG4gIGlzVmVyc2lvbkRpZmZFbXB0eSgpIHsgcmV0dXJuIHRoaXMudmVyc2lvbkRpZmYuaXNFbXB0eSgpOyB9XG5cbiAgaXNEZXBlbmRlbmN5TWFwRGlmZkVtcHR5KCkgeyByZXR1cm4gdGhpcy5kZXBlbmRlbmN5TWFwRGlmZi5pc0VtcHR5KCk7IH1cblxuICBpc0RldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkoKSB7IHJldHVybiB0aGlzLmRldkRlcGVuZGVuY3lNYXBEaWZmLmlzRW1wdHkoKTsgfVxuXG4gIHNvbWVEZXZEZXBlbmRlbmN5U2VtdmVyRGlmZihjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5kZXZEZXBlbmRlbmN5TWFwRGlmZi5zb21lU2VtdmVyRGlmZihjYWxsYmFjayk7IH0gLy8vXG5cbiAgc2F2ZSgpIHtcbiAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc3ViRGlyZWN0b3J5UGF0aCA9IHRoaXMuZ2V0U3ViRGlyZWN0b3J5UGF0aCgpLFxuICAgICAgICAgIHBhY2thZ2VKU09OID0gcmVhZFBhY2thZ2VKU09ORmlsZShzdWJEaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChwYWNrYWdlSlNPTiAhPT0gbnVsbCkge1xuICAgICAgdGhpcy52ZXJzaW9uRGlmZi5zYXZlKHBhY2thZ2VKU09OKTtcblxuICAgICAgdGhpcy5kZXBlbmRlbmN5TWFwRGlmZi5zYXZlKHBhY2thZ2VKU09OLCBERVBFTkRFTkNJRVMpO1xuXG4gICAgICB0aGlzLmRldkRlcGVuZGVuY3lNYXBEaWZmLnNhdmUocGFja2FnZUpTT04sIERFVl9ERVBFTkRFTkNJRVMpO1xuXG4gICAgICBzdWNjZXNzID0gd3JpdGVQYWNrYWdlSlNPTkZpbGUoc3ViRGlyZWN0b3J5UGF0aCwgcGFja2FnZUpTT04pO1xuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgcG9sbChxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHNwZWNpZmllcnMgPSBbXTtcblxuICAgIHRoaXMuZGVwZW5kZW5jeU1hcERpZmYuZ2V0U3BlY2lmaWVycyhzcGVjaWZpZXJzKTtcblxuICAgIHRoaXMuZGV2RGVwZW5kZW5jeU1hcERpZmYuZ2V0U3BlY2lmaWVycyhzcGVjaWZpZXJzKTtcblxuICAgIHRoaXMucmVsZWFzZS5wb2xsKHNwZWNpZmllcnMsIHF1aWV0bHksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGdpdChxdWlldGx5LCBjYWxsYmFjaykgeyB0aGlzLnJlbGVhc2UuZ2l0KHF1aWV0bHksIGNhbGxiYWNrKTsgfVxuXG4gIGluc3RhbGwocXVpZXRseSwgY2FsbGJhY2spIHsgdGhpcy5yZWxlYXNlLmluc3RhbGwocXVpZXRseSwgY2FsbGJhY2spOyB9XG5cbiAgYnVpbGQocXVpZXRseSwgY2FsbGJhY2spIHsgdGhpcy5yZWxlYXNlLmJ1aWxkKHF1aWV0bHksIGNhbGxiYWNrKTsgfVxuXG4gIHB1Ymxpc2gocXVpZXRseSwgY2FsbGJhY2spIHsgdGhpcy5yZWxlYXNlLnB1Ymxpc2gocXVpZXRseSwgY2FsbGJhY2spOyB9XG5cbiAgcmVtb3ZlRGVwZW5kZW5jeShuYW1lKSB7IHRoaXMuZGVwZW5kZW5jeU1hcERpZmYucmVtb3ZlU2VtdmVyRGlmZihuYW1lKTsgfVxuXG4gIHJlbW92ZURldkRlcGVuZGVuY3kobmFtZSkgeyB0aGlzLmRldkRlcGVuZGVuY3lNYXBEaWZmLnJlbW92ZVNlbXZlckRpZmYobmFtZSk7IH1cblxuICBhc1N0cmluZygpIHtcbiAgICBsZXQgc3RyaW5nID0gYGA7XG5cbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgc3ViRGlyZWN0b3J5UGF0aCA9IHRoaXMuZ2V0U3ViRGlyZWN0b3J5UGF0aCgpO1xuXG4gICAgc3RyaW5nICs9IChuYW1lID09PSBudWxsKSA/XG4gICAgICAgICAgICBgIFwiJHtzdWJEaXJlY3RvcnlQYXRofVwiOlxcbmAgOlxuICAgICAgICAgICAgICBgIFwiJHtzdWJEaXJlY3RvcnlQYXRofVwiIChcIiR7bmFtZX1cIik6XFxuYDtcblxuICAgIGNvbnN0IHZlcnNpb25EaWZmRW1wdHkgPSB0aGlzLmlzVmVyc2lvbkRpZmZFbXB0eSgpLFxuICAgICAgICAgIGRlcGVuZGVuY3lNYXBEaWZmRW1wdHkgPSB0aGlzLmlzRGVwZW5kZW5jeU1hcERpZmZFbXB0eSgpLFxuICAgICAgICAgIGRldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkgPSB0aGlzLmlzRGV2RGVwZW5kZW5jeU1hcERpZmZFbXB0eSgpO1xuXG4gICAgaWYgKCF2ZXJzaW9uRGlmZkVtcHR5KSB7XG4gICAgICBjb25zdCB2ZXJzaW9uRGlmZlN0cmluZyA9IHRoaXMudmVyc2lvbkRpZmYuYXNTdHJpbmcoKTtcblxuICAgICAgc3RyaW5nICs9IGBcXG4gICBcInZlcnNpb25cIjogJHt2ZXJzaW9uRGlmZlN0cmluZ30sYDtcbiAgICB9XG5cbiAgICBpZiAoIWRlcGVuZGVuY3lNYXBEaWZmRW1wdHkpIHtcbiAgICAgIGNvbnN0IGRlcGVuZGVuY3lNYXBEaWZmU3RyaW5nID0gdGhpcy5kZXBlbmRlbmN5TWFwRGlmZi5hc1N0cmluZygpO1xuXG4gICAgICBzdHJpbmcgKz0gYFxcbiAgIFwiZGVwZW5kZW5jaWVzXCI6ICR7ZGVwZW5kZW5jeU1hcERpZmZTdHJpbmd9LGA7XG4gICAgfVxuXG4gICAgaWYgKCFkZXZEZXBlbmRlbmN5TWFwRGlmZkVtcHR5KSB7XG4gICAgICBjb25zdCBkZXZEZXBlbmRlbmN5TWFwRGlmZlN0cmluZyA9IHRoaXMuZGV2RGVwZW5kZW5jeU1hcERpZmYuYXNTdHJpbmcoKTtcblxuICAgICAgc3RyaW5nICs9IGBcXG4gICBcImRldkRlcGVuZGVuY2llc1wiOiAke2RldkRlcGVuZGVuY3lNYXBEaWZmU3RyaW5nfSxgO1xuICAgIH1cblxuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8sJC8sIFwiXFxuXCIpO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmVsZWFzZShyZWxlYXNlKSB7XG4gICAgbGV0IGRpZmYgPSBudWxsO1xuXG4gICAgY29uc3Qgc3ViRGlyZWN0b3J5UGF0aCA9IHJlbGVhc2UuZ2V0U3ViRGlyZWN0b3J5UGF0aCgpLFxuICAgICAgICAgIHBhY2thZ2VKU09OID0gcmVhZFBhY2thZ2VKU09ORmlsZShzdWJEaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChwYWNrYWdlSlNPTiAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgeyB2ZXJzaW9uID0gbnVsbCwgZGVwZW5kZW5jaWVzID0ge30sIGRldkRlcGVuZGVuY2llcyA9IHt9IH0gPSBwYWNrYWdlSlNPTixcbiAgICAgICAgICAgIHZlcnNpb25TdHJpbmcgPSB2ZXJzaW9uLCAgLy8vXG4gICAgICAgICAgICBkZXBlbmRlbmN5TWFwID0gZGVwZW5kZW5jaWVzLCAvLy9cbiAgICAgICAgICAgIGRldkRlcGVuZGVuY3lNYXAgPSBkZXZEZXBlbmRlbmNpZXMsIC8vL1xuICAgICAgICAgICAgcmVsZWFzZVZlcnNpb24gPSByZWxlYXNlLmdldFZlcnNpb24oKSxcbiAgICAgICAgICAgIHJlbGVhc2VEZXBlbmRlbmN5TWFwID0gcmVsZWFzZS5nZXREZXBlbmRlbmN5TWFwKCksXG4gICAgICAgICAgICByZWxlYXNlRGV2RGVwZW5kZW5jeU1hcCA9IHJlbGVhc2UuZ2V0RGV2RGVwZW5kZW5jeU1hcCgpLFxuICAgICAgICAgICAgdmVyc2lvbkRpZmYgPSBWZXJzaW9uRGlmZi5mcm9tVmVyc2lvblN0cmluZ0FuZFJlbGVhc2VWZXJzaW9uKHZlcnNpb25TdHJpbmcsIHJlbGVhc2VWZXJzaW9uKSxcbiAgICAgICAgICAgIGRlcGVuZGVuY3lNYXBEaWZmID0gTWFwRGlmZi5mcm9tTWFwQW5kUmVsZWFzZU1hcChkZXBlbmRlbmN5TWFwLCByZWxlYXNlRGVwZW5kZW5jeU1hcCksXG4gICAgICAgICAgICBkZXZEZXBlbmRlbmN5TWFwRGlmZiA9IE1hcERpZmYuZnJvbU1hcEFuZFJlbGVhc2VNYXAoZGV2RGVwZW5kZW5jeU1hcCwgcmVsZWFzZURldkRlcGVuZGVuY3lNYXApO1xuXG4gICAgICBkaWZmID0gbmV3IERpZmYocmVsZWFzZSwgdmVyc2lvbkRpZmYsIGRlcGVuZGVuY3lNYXBEaWZmLCBkZXZEZXBlbmRlbmN5TWFwRGlmZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZmY7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJEaWZmIiwicmVsZWFzZSIsInZlcnNpb25EaWZmIiwiZGVwZW5kZW5jeU1hcERpZmYiLCJkZXZEZXBlbmRlbmN5TWFwRGlmZiIsImdldFJlbGVhc2UiLCJnZXRWZXJzaW9uRGlmZiIsImdldERlcGVuZGVuY3lNYXBEaWZmIiwiZ2V0RGV2RGVwZW5kZW5jeU1hcERpZmYiLCJnZXROYW1lIiwiaXNQdWJsaXNoYWJsZSIsImdldFN1YkRpcmVjdG9yeVBhdGgiLCJnZXREZXZEZXBlbmRlbmN5TmFtZXMiLCJpc1ZlcnNpb25EaWZmRW1wdHkiLCJpc0VtcHR5IiwiaXNEZXBlbmRlbmN5TWFwRGlmZkVtcHR5IiwiaXNEZXZEZXBlbmRlbmN5TWFwRGlmZkVtcHR5Iiwic29tZURldkRlcGVuZGVuY3lTZW12ZXJEaWZmIiwiY2FsbGJhY2siLCJzb21lU2VtdmVyRGlmZiIsInNhdmUiLCJzdWNjZXNzIiwic3ViRGlyZWN0b3J5UGF0aCIsInBhY2thZ2VKU09OIiwicmVhZFBhY2thZ2VKU09ORmlsZSIsIkRFUEVOREVOQ0lFUyIsIkRFVl9ERVBFTkRFTkNJRVMiLCJ3cml0ZVBhY2thZ2VKU09ORmlsZSIsInBvbGwiLCJxdWlldGx5Iiwic3BlY2lmaWVycyIsImdldFNwZWNpZmllcnMiLCJnaXQiLCJpbnN0YWxsIiwiYnVpbGQiLCJwdWJsaXNoIiwicmVtb3ZlRGVwZW5kZW5jeSIsIm5hbWUiLCJyZW1vdmVTZW12ZXJEaWZmIiwicmVtb3ZlRGV2RGVwZW5kZW5jeSIsImFzU3RyaW5nIiwic3RyaW5nIiwidmVyc2lvbkRpZmZFbXB0eSIsImRlcGVuZGVuY3lNYXBEaWZmRW1wdHkiLCJkZXZEZXBlbmRlbmN5TWFwRGlmZkVtcHR5IiwidmVyc2lvbkRpZmZTdHJpbmciLCJkZXBlbmRlbmN5TWFwRGlmZlN0cmluZyIsImRldkRlcGVuZGVuY3lNYXBEaWZmU3RyaW5nIiwicmVwbGFjZSIsImZyb21SZWxlYXNlIiwiZGlmZiIsInZlcnNpb24iLCJkZXBlbmRlbmNpZXMiLCJkZXZEZXBlbmRlbmNpZXMiLCJ2ZXJzaW9uU3RyaW5nIiwiZGVwZW5kZW5jeU1hcCIsImRldkRlcGVuZGVuY3lNYXAiLCJyZWxlYXNlVmVyc2lvbiIsImdldFZlcnNpb24iLCJyZWxlYXNlRGVwZW5kZW5jeU1hcCIsImdldERlcGVuZGVuY3lNYXAiLCJyZWxlYXNlRGV2RGVwZW5kZW5jeU1hcCIsImdldERldkRlcGVuZGVuY3lNYXAiLCJWZXJzaW9uRGlmZiIsImZyb21WZXJzaW9uU3RyaW5nQW5kUmVsZWFzZVZlcnNpb24iLCJNYXBEaWZmIiwiZnJvbU1hcEFuZFJlbGVhc2VNYXAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2VBUXFCQTs7OzBEQU5EOzhEQUNJO3lCQUV1QjsyQkFDVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUzQyxJQUFBLEFBQU1BLHFCQUFOO2FBQU1BLEtBQ1BDLE9BQU8sRUFBRUMsV0FBVyxFQUFFQyxpQkFBaUIsRUFBRUMsb0JBQW9CO2dDQUR0REo7UUFFakIsSUFBSSxDQUFDQyxPQUFPLEdBQUdBO1FBQ2YsSUFBSSxDQUFDQyxXQUFXLEdBQUdBO1FBQ25CLElBQUksQ0FBQ0MsaUJBQWlCLEdBQUdBO1FBQ3pCLElBQUksQ0FBQ0Msb0JBQW9CLEdBQUdBOztrQkFMWEo7O1lBUW5CSyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNKLE9BQU87WUFDckI7OztZQUVBSyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNKLFdBQVc7WUFDekI7OztZQUVBSyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNKLGlCQUFpQjtZQUMvQjs7O1lBRUFLLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0osb0JBQW9CO1lBQ2xDOzs7WUFFQUssS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUFZLE9BQU8sSUFBSSxDQUFDUixPQUFPLENBQUNRLE9BQU87WUFBSTs7O1lBRTNDQyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQWtCLE9BQU8sSUFBSSxDQUFDVCxPQUFPLENBQUNTLGFBQWE7WUFBSTs7O1lBRXZEQyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQXdCLE9BQU8sSUFBSSxDQUFDVixPQUFPLENBQUNVLG1CQUFtQjtZQUFJOzs7WUFFbkVDLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFBMEIsT0FBTyxJQUFJLENBQUNYLE9BQU8sQ0FBQ1cscUJBQXFCO1lBQUk7OztZQUV2RUMsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUF1QixPQUFPLElBQUksQ0FBQ1gsV0FBVyxDQUFDWSxPQUFPO1lBQUk7OztZQUUxREMsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUE2QixPQUFPLElBQUksQ0FBQ1osaUJBQWlCLENBQUNXLE9BQU87WUFBSTs7O1lBRXRFRSxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQWdDLE9BQU8sSUFBSSxDQUFDWixvQkFBb0IsQ0FBQ1UsT0FBTztZQUFJOzs7WUFFNUVHLEtBQUFBO21CQUFBQSxTQUFBQSw0QkFBNEJDLFFBQVE7Z0JBQUksT0FBTyxJQUFJLENBQUNkLG9CQUFvQixDQUFDZSxjQUFjLENBQUNEO1lBQVcsRUFBRSxHQUFHOzs7WUFFeEdFLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxJQUFJQyxVQUFVO2dCQUVkLElBQU1DLG1CQUFtQixJQUFJLENBQUNYLG1CQUFtQixJQUMzQ1ksY0FBY0MsSUFBQUEsZ0NBQW1CLEVBQUNGO2dCQUV4QyxJQUFJQyxnQkFBZ0IsTUFBTTtvQkFDeEIsSUFBSSxDQUFDckIsV0FBVyxDQUFDa0IsSUFBSSxDQUFDRztvQkFFdEIsSUFBSSxDQUFDcEIsaUJBQWlCLENBQUNpQixJQUFJLENBQUNHLGFBQWFFLHVCQUFZO29CQUVyRCxJQUFJLENBQUNyQixvQkFBb0IsQ0FBQ2dCLElBQUksQ0FBQ0csYUFBYUcsMkJBQWdCO29CQUU1REwsVUFBVU0sSUFBQUEsaUNBQW9CLEVBQUNMLGtCQUFrQkM7Z0JBQ25EO2dCQUVBLE9BQU9GO1lBQ1Q7OztZQUVBTyxLQUFBQTttQkFBQUEsU0FBQUEsS0FBS0MsT0FBTyxFQUFFWCxRQUFRO2dCQUNwQixJQUFNWSxhQUFhLEVBQUU7Z0JBRXJCLElBQUksQ0FBQzNCLGlCQUFpQixDQUFDNEIsYUFBYSxDQUFDRDtnQkFFckMsSUFBSSxDQUFDMUIsb0JBQW9CLENBQUMyQixhQUFhLENBQUNEO2dCQUV4QyxJQUFJLENBQUM3QixPQUFPLENBQUMyQixJQUFJLENBQUNFLFlBQVlELFNBQVNYO1lBQ3pDOzs7WUFFQWMsS0FBQUE7bUJBQUFBLFNBQUFBLElBQUlILE9BQU8sRUFBRVgsUUFBUTtnQkFBSSxJQUFJLENBQUNqQixPQUFPLENBQUMrQixHQUFHLENBQUNILFNBQVNYO1lBQVc7OztZQUU5RGUsS0FBQUE7bUJBQUFBLFNBQUFBLFFBQVFKLE9BQU8sRUFBRVgsUUFBUTtnQkFBSSxJQUFJLENBQUNqQixPQUFPLENBQUNnQyxPQUFPLENBQUNKLFNBQVNYO1lBQVc7OztZQUV0RWdCLEtBQUFBO21CQUFBQSxTQUFBQSxNQUFNTCxPQUFPLEVBQUVYLFFBQVE7Z0JBQUksSUFBSSxDQUFDakIsT0FBTyxDQUFDaUMsS0FBSyxDQUFDTCxTQUFTWDtZQUFXOzs7WUFFbEVpQixLQUFBQTttQkFBQUEsU0FBQUEsUUFBUU4sT0FBTyxFQUFFWCxRQUFRO2dCQUFJLElBQUksQ0FBQ2pCLE9BQU8sQ0FBQ2tDLE9BQU8sQ0FBQ04sU0FBU1g7WUFBVzs7O1lBRXRFa0IsS0FBQUE7bUJBQUFBLFNBQUFBLGlCQUFpQkMsSUFBSTtnQkFBSSxJQUFJLENBQUNsQyxpQkFBaUIsQ0FBQ21DLGdCQUFnQixDQUFDRDtZQUFPOzs7WUFFeEVFLEtBQUFBO21CQUFBQSxTQUFBQSxvQkFBb0JGLElBQUk7Z0JBQUksSUFBSSxDQUFDakMsb0JBQW9CLENBQUNrQyxnQkFBZ0IsQ0FBQ0Q7WUFBTzs7O1lBRTlFRyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBSUMsU0FBUztnQkFFYixJQUFNSixPQUFPLElBQUksQ0FBQzVCLE9BQU8sSUFDbkJhLG1CQUFtQixJQUFJLENBQUNYLG1CQUFtQjtnQkFFakQ4QixVQUFVLEFBQUNKLFNBQVMsT0FDWixBQUFDLEtBQXFCLE9BQWpCZixrQkFBaUIsVUFDcEIsQUFBQyxLQUEyQmUsT0FBdkJmLGtCQUFpQixRQUFXLE9BQUxlLE1BQUs7Z0JBRTNDLElBQU1LLG1CQUFtQixJQUFJLENBQUM3QixrQkFBa0IsSUFDMUM4Qix5QkFBeUIsSUFBSSxDQUFDNUIsd0JBQXdCLElBQ3RENkIsNEJBQTRCLElBQUksQ0FBQzVCLDJCQUEyQjtnQkFFbEUsSUFBSSxDQUFDMEIsa0JBQWtCO29CQUNyQixJQUFNRyxvQkFBb0IsSUFBSSxDQUFDM0MsV0FBVyxDQUFDc0MsUUFBUTtvQkFFbkRDLFVBQVUsQUFBQyxtQkFBb0MsT0FBbEJJLG1CQUFrQjtnQkFDakQ7Z0JBRUEsSUFBSSxDQUFDRix3QkFBd0I7b0JBQzNCLElBQU1HLDBCQUEwQixJQUFJLENBQUMzQyxpQkFBaUIsQ0FBQ3FDLFFBQVE7b0JBRS9EQyxVQUFVLEFBQUMsd0JBQStDLE9BQXhCSyx5QkFBd0I7Z0JBQzVEO2dCQUVBLElBQUksQ0FBQ0YsMkJBQTJCO29CQUM5QixJQUFNRyw2QkFBNkIsSUFBSSxDQUFDM0Msb0JBQW9CLENBQUNvQyxRQUFRO29CQUVyRUMsVUFBVSxBQUFDLDJCQUFxRCxPQUEzQk0sNEJBQTJCO2dCQUNsRTtnQkFFQU4sU0FBU0EsT0FBT08sT0FBTyxDQUFDLE1BQU07Z0JBRTlCLE9BQU9QO1lBQ1Q7Ozs7WUFFT1EsS0FBQUE7bUJBQVAsU0FBT0EsWUFBWWhELE9BQU87Z0JBQ3hCLElBQUlpRCxPQUFPO2dCQUVYLElBQU01QixtQkFBbUJyQixRQUFRVSxtQkFBbUIsSUFDOUNZLGNBQWNDLElBQUFBLGdDQUFtQixFQUFDRjtnQkFFeEMsSUFBSUMsZ0JBQWdCLE1BQU07b0JBQ3hCLDJCQUFvRUEsWUFBNUQ0QixTQUFBQSw0Q0FBVSx5REFBa0Q1QixZQUE1QzZCLGNBQUFBLHNEQUFlLENBQUMsOERBQTRCN0IsWUFBekI4QixpQkFBQUEsNERBQWtCLENBQUMsa0NBQ3hEQyxnQkFBZ0JILFNBQ2hCSSxnQkFBZ0JILGNBQ2hCSSxtQkFBbUJILGlCQUNuQkksaUJBQWlCeEQsUUFBUXlELFVBQVUsSUFDbkNDLHVCQUF1QjFELFFBQVEyRCxnQkFBZ0IsSUFDL0NDLDBCQUEwQjVELFFBQVE2RCxtQkFBbUIsSUFDckQ1RCxjQUFjNkQsZ0JBQVcsQ0FBQ0Msa0NBQWtDLENBQUNWLGVBQWVHLGlCQUM1RXRELG9CQUFvQjhELFlBQU8sQ0FBQ0Msb0JBQW9CLENBQUNYLGVBQWVJLHVCQUNoRXZELHVCQUF1QjZELFlBQU8sQ0FBQ0Msb0JBQW9CLENBQUNWLGtCQUFrQks7b0JBRTVFWCxPQUFPLElBeElRbEQsS0F3SUNDLFNBQVNDLGFBQWFDLG1CQUFtQkM7Z0JBQzNEO2dCQUVBLE9BQU84QztZQUNUOzs7V0E1SW1CbEQifQ==
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return ReleaseMap;
    }
});
var _necessary = require("necessary");
var _release = /*#__PURE__*/ _interop_require_default(require("./release"));
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
var prune = _necessary.arrayUtilities.prune;
var ReleaseMap = /*#__PURE__*/ function() {
    function ReleaseMap(map) {
        _class_call_check(this, ReleaseMap);
        this.map = map;
    }
    _create_class(ReleaseMap, [
        {
            key: "getNames",
            value: function getNames() {
                var names = [], releases = this.getReleases();
                releases.forEach(function(release) {
                    var name = release.getName();
                    if (name !== null) {
                        names.push(name);
                    }
                });
                return names;
            }
        },
        {
            key: "getReleases",
            value: function getReleases() {
                var releases = Object.values(this.map);
                return releases;
            }
        },
        {
            key: "getSubDirectoryPaths",
            value: function getSubDirectoryPaths() {
                var subDirectoryPaths = Object.keys(this.map);
                return subDirectoryPaths;
            }
        },
        {
            key: "getNameToSubDirectoryPathMap",
            value: function getNameToSubDirectoryPathMap() {
                var _this = this;
                var nameToSubDirectoryPathMap = {}, subDirectoryPaths = this.getSubDirectoryPaths();
                subDirectoryPaths.forEach(function(subDirectoryPath) {
                    var release = _this.retrieveRelease(subDirectoryPath), name = release.getName();
                    if (name !== null) {
                        nameToSubDirectoryPathMap[name] = subDirectoryPath;
                    }
                });
                return nameToSubDirectoryPathMap;
            }
        },
        {
            key: "retrieveRelease",
            value: function retrieveRelease(subDirectoryPath) {
                var release = this.map[subDirectoryPath] || null; ///
                return release;
            }
        }
    ], [
        {
            key: "fromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies",
            value: function fromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies) {
                var map = {}, subDirectoryPaths = subDirectoryPathsFromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies);
                subDirectoryPaths.forEach(function(subDirectoryPath) {
                    var release = _release.default.fromSubDirectoryPath(subDirectoryPath);
                    if (release !== null) {
                        map[subDirectoryPath] = release;
                    }
                });
                var releaseMap = new ReleaseMap(map);
                return releaseMap;
            }
        }
    ]);
    return ReleaseMap;
}();
function subDirectoryPathsFromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies) {
    var subDirectoryPaths = [], subDirectoryNames = Object.keys(subDirectoryMap), ignoredDependencySubDirectoryNames = ignoredDependencies; ///
    prune(ignoredDependencySubDirectoryNames, function(ignoredDependencySubDirectoryName) {
        if (ignoredDependencySubDirectoryName !== subDirectoryName) {
            return true;
        }
    });
    subDirectoryNames.forEach(function(subDirectoryName) {
        var ignoredDependencySubDirectoryNamesIncludesSubDirectoryName = ignoredDependencySubDirectoryNames.includes(subDirectoryName);
        if (!ignoredDependencySubDirectoryNamesIncludesSubDirectoryName) {
            var subDirectoryPath = subDirectoryMap[subDirectoryName]; ///
            subDirectoryPaths.push(subDirectoryPath);
        }
    });
    return subDirectoryPaths;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlTWFwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IFJlbGVhc2UgZnJvbSBcIi4vcmVsZWFzZVwiO1xuXG5jb25zdCB7IHBydW5lIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsZWFzZU1hcCB7XG4gIGNvbnN0cnVjdG9yKG1hcCkge1xuICAgIHRoaXMubWFwID0gbWFwO1xuICB9XG5cbiAgZ2V0TmFtZXMoKSB7XG4gICAgY29uc3QgbmFtZXMgPSBbXSxcbiAgICAgICAgICByZWxlYXNlcyA9IHRoaXMuZ2V0UmVsZWFzZXMoKTtcblxuICAgIHJlbGVhc2VzLmZvckVhY2goKHJlbGVhc2UpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSByZWxlYXNlLmdldE5hbWUoKTtcblxuICAgICAgaWYgKG5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbmFtZXMucHVzaChuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuYW1lcztcbiAgfVxuXG4gIGdldFJlbGVhc2VzKCkge1xuICAgIGNvbnN0IHJlbGVhc2VzID0gT2JqZWN0LnZhbHVlcyh0aGlzLm1hcCk7XG5cbiAgICByZXR1cm4gcmVsZWFzZXM7XG4gIH1cblxuICBnZXRTdWJEaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBzdWJEaXJlY3RvcnlQYXRocyA9IE9iamVjdC5rZXlzKHRoaXMubWFwKTtcblxuICAgIHJldHVybiBzdWJEaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldE5hbWVUb1N1YkRpcmVjdG9yeVBhdGhNYXAoKSB7XG4gICAgY29uc3QgbmFtZVRvU3ViRGlyZWN0b3J5UGF0aE1hcCA9IHt9LFxuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGhzID0gdGhpcy5nZXRTdWJEaXJlY3RvcnlQYXRocygpO1xuXG4gICAgc3ViRGlyZWN0b3J5UGF0aHMuZm9yRWFjaCgoc3ViRGlyZWN0b3J5UGF0aCkgPT4ge1xuICAgICAgY29uc3QgcmVsZWFzZSA9IHRoaXMucmV0cmlldmVSZWxlYXNlKHN1YkRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgICAgbmFtZSA9IHJlbGVhc2UuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAobmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBuYW1lVG9TdWJEaXJlY3RvcnlQYXRoTWFwW25hbWVdID0gc3ViRGlyZWN0b3J5UGF0aDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuYW1lVG9TdWJEaXJlY3RvcnlQYXRoTWFwO1xuICB9XG5cbiAgcmV0cmlldmVSZWxlYXNlKHN1YkRpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCByZWxlYXNlID0gdGhpcy5tYXBbc3ViRGlyZWN0b3J5UGF0aF0gfHwgbnVsbDsgIC8vL1xuXG4gICAgcmV0dXJuIHJlbGVhc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbVN1YkRpcmVjdG9yeU1hcFN1YkRpcmVjdG9yeU5hbWVBbmRJZ25vcmVkRGVwZW5kZW5jaWVzKHN1YkRpcmVjdG9yeU1hcCwgc3ViRGlyZWN0b3J5TmFtZSwgaWdub3JlZERlcGVuZGVuY2llcykge1xuICAgIGNvbnN0IG1hcCA9IHt9LFxuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGhzID0gc3ViRGlyZWN0b3J5UGF0aHNGcm9tU3ViRGlyZWN0b3J5TWFwU3ViRGlyZWN0b3J5TmFtZUFuZElnbm9yZWREZXBlbmRlbmNpZXMoc3ViRGlyZWN0b3J5TWFwLCBzdWJEaXJlY3RvcnlOYW1lLCBpZ25vcmVkRGVwZW5kZW5jaWVzKTtcblxuICAgIHN1YkRpcmVjdG9yeVBhdGhzLmZvckVhY2goKHN1YkRpcmVjdG9yeVBhdGgpID0+IHtcbiAgICAgIGNvbnN0IHJlbGVhc2UgPSBSZWxlYXNlLmZyb21TdWJEaXJlY3RvcnlQYXRoKHN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBpZiAocmVsZWFzZSAhPT0gbnVsbCkge1xuICAgICAgICBtYXBbc3ViRGlyZWN0b3J5UGF0aF0gPSByZWxlYXNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVsZWFzZU1hcCA9IG5ldyBSZWxlYXNlTWFwKG1hcCk7XG5cbiAgICByZXR1cm4gcmVsZWFzZU1hcDtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdWJEaXJlY3RvcnlQYXRoc0Zyb21TdWJEaXJlY3RvcnlNYXBTdWJEaXJlY3RvcnlOYW1lQW5kSWdub3JlZERlcGVuZGVuY2llcyhzdWJEaXJlY3RvcnlNYXAsIHN1YkRpcmVjdG9yeU5hbWUsIGlnbm9yZWREZXBlbmRlbmNpZXMpIHtcbiAgY29uc3Qgc3ViRGlyZWN0b3J5UGF0aHMgPSBbXSxcbiAgICAgICAgc3ViRGlyZWN0b3J5TmFtZXMgPSBPYmplY3Qua2V5cyhzdWJEaXJlY3RvcnlNYXApLCAvLy9cbiAgICAgICAgaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lcyA9IGlnbm9yZWREZXBlbmRlbmNpZXM7IC8vL1xuXG4gIHBydW5lKGlnbm9yZWREZXBlbmRlbmN5U3ViRGlyZWN0b3J5TmFtZXMsIChpZ25vcmVkRGVwZW5kZW5jeVN1YkRpcmVjdG9yeU5hbWUpID0+IHtcbiAgICBpZiAoaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lICE9PSBzdWJEaXJlY3RvcnlOYW1lKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHN1YkRpcmVjdG9yeU5hbWVzLmZvckVhY2goKHN1YkRpcmVjdG9yeU5hbWUpID0+IHtcbiAgICBjb25zdCBpZ25vcmVkRGVwZW5kZW5jeVN1YkRpcmVjdG9yeU5hbWVzSW5jbHVkZXNTdWJEaXJlY3RvcnlOYW1lID0gaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lcy5pbmNsdWRlcyhzdWJEaXJlY3RvcnlOYW1lKTtcblxuICAgIGlmICghaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lc0luY2x1ZGVzU3ViRGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3Qgc3ViRGlyZWN0b3J5UGF0aCA9IHN1YkRpcmVjdG9yeU1hcFtzdWJEaXJlY3RvcnlOYW1lXTsgLy8vXG5cbiAgICAgIHN1YkRpcmVjdG9yeVBhdGhzLnB1c2goc3ViRGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc3ViRGlyZWN0b3J5UGF0aHM7XG59XG4iXSwibmFtZXMiOlsiUmVsZWFzZU1hcCIsInBydW5lIiwiYXJyYXlVdGlsaXRpZXMiLCJtYXAiLCJnZXROYW1lcyIsIm5hbWVzIiwicmVsZWFzZXMiLCJnZXRSZWxlYXNlcyIsImZvckVhY2giLCJyZWxlYXNlIiwibmFtZSIsImdldE5hbWUiLCJwdXNoIiwiT2JqZWN0IiwidmFsdWVzIiwiZ2V0U3ViRGlyZWN0b3J5UGF0aHMiLCJzdWJEaXJlY3RvcnlQYXRocyIsImtleXMiLCJnZXROYW1lVG9TdWJEaXJlY3RvcnlQYXRoTWFwIiwibmFtZVRvU3ViRGlyZWN0b3J5UGF0aE1hcCIsInN1YkRpcmVjdG9yeVBhdGgiLCJyZXRyaWV2ZVJlbGVhc2UiLCJmcm9tU3ViRGlyZWN0b3J5TWFwU3ViRGlyZWN0b3J5TmFtZUFuZElnbm9yZWREZXBlbmRlbmNpZXMiLCJzdWJEaXJlY3RvcnlNYXAiLCJzdWJEaXJlY3RvcnlOYW1lIiwiaWdub3JlZERlcGVuZGVuY2llcyIsInN1YkRpcmVjdG9yeVBhdGhzRnJvbVN1YkRpcmVjdG9yeU1hcFN1YkRpcmVjdG9yeU5hbWVBbmRJZ25vcmVkRGVwZW5kZW5jaWVzIiwiUmVsZWFzZSIsImZyb21TdWJEaXJlY3RvcnlQYXRoIiwicmVsZWFzZU1hcCIsInN1YkRpcmVjdG9yeU5hbWVzIiwiaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lcyIsImlnbm9yZWREZXBlbmRlbmN5U3ViRGlyZWN0b3J5TmFtZSIsImlnbm9yZWREZXBlbmRlbmN5U3ViRGlyZWN0b3J5TmFtZXNJbmNsdWRlc1N1YkRp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
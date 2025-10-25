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
            key: "fromSubDirectoryMapAndIgnoredDependencies",
            value: function fromSubDirectoryMapAndIgnoredDependencies(subDirectoryMap, ignoredDependencies) {
                var map = {}, subDirectoryPaths = subDirectoryPathsFromSubDirectoryMapAndIgnoredDependencies(subDirectoryMap, ignoredDependencies);
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
function subDirectoryPathsFromSubDirectoryMapAndIgnoredDependencies(subDirectoryMap, ignoredDependencies) {
    var subDirectoryPaths = [], subDirectoryNames = Object.keys(subDirectoryMap), ignoredDependencySubDirectoryNames = ignoredDependencies; ///
    subDirectoryNames.forEach(function(subDirectoryName) {
        var ignoredDependencySubDirectoryNamesIncludesSubDirectoryName = ignoredDependencySubDirectoryNames.includes(subDirectoryName);
        if (!ignoredDependencySubDirectoryNamesIncludesSubDirectoryName) {
            var subDirectoryPath = subDirectoryMap[subDirectoryName]; ///
            subDirectoryPaths.push(subDirectoryPath);
        }
    });
    return subDirectoryPaths;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlTWFwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgUmVsZWFzZSBmcm9tIFwiLi9yZWxlYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbGVhc2VNYXAge1xuICBjb25zdHJ1Y3RvcihtYXApIHtcbiAgICB0aGlzLm1hcCA9IG1hcDtcbiAgfVxuXG4gIGdldE5hbWVzKCkge1xuICAgIGNvbnN0IG5hbWVzID0gW10sXG4gICAgICAgICAgcmVsZWFzZXMgPSB0aGlzLmdldFJlbGVhc2VzKCk7XG5cbiAgICByZWxlYXNlcy5mb3JFYWNoKChyZWxlYXNlKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gcmVsZWFzZS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChuYW1lICE9PSBudWxsKSB7XG4gICAgICAgIG5hbWVzLnB1c2gobmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmFtZXM7XG4gIH1cblxuICBnZXRSZWxlYXNlcygpIHtcbiAgICBjb25zdCByZWxlYXNlcyA9IE9iamVjdC52YWx1ZXModGhpcy5tYXApO1xuXG4gICAgcmV0dXJuIHJlbGVhc2VzO1xuICB9XG5cbiAgZ2V0U3ViRGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3Qgc3ViRGlyZWN0b3J5UGF0aHMgPSBPYmplY3Qua2V5cyh0aGlzLm1hcCk7XG5cbiAgICByZXR1cm4gc3ViRGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICBnZXROYW1lVG9TdWJEaXJlY3RvcnlQYXRoTWFwKCkge1xuICAgIGNvbnN0IG5hbWVUb1N1YkRpcmVjdG9yeVBhdGhNYXAgPSB7fSxcbiAgICAgICAgICBzdWJEaXJlY3RvcnlQYXRocyA9IHRoaXMuZ2V0U3ViRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHN1YkRpcmVjdG9yeVBhdGhzLmZvckVhY2goKHN1YkRpcmVjdG9yeVBhdGgpID0+IHtcbiAgICAgIGNvbnN0IHJlbGVhc2UgPSB0aGlzLnJldHJpZXZlUmVsZWFzZShzdWJEaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICAgIG5hbWUgPSByZWxlYXNlLmdldE5hbWUoKTtcblxuICAgICAgaWYgKG5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbmFtZVRvU3ViRGlyZWN0b3J5UGF0aE1hcFtuYW1lXSA9IHN1YkRpcmVjdG9yeVBhdGg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmFtZVRvU3ViRGlyZWN0b3J5UGF0aE1hcDtcbiAgfVxuXG4gIHJldHJpZXZlUmVsZWFzZShzdWJEaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgcmVsZWFzZSA9IHRoaXMubWFwW3N1YkRpcmVjdG9yeVBhdGhdIHx8IG51bGw7ICAvLy9cblxuICAgIHJldHVybiByZWxlYXNlO1xuICB9XG5cbiAgc3RhdGljIGZyb21TdWJEaXJlY3RvcnlNYXBBbmRJZ25vcmVkRGVwZW5kZW5jaWVzKHN1YkRpcmVjdG9yeU1hcCwgaWdub3JlZERlcGVuZGVuY2llcykge1xuICAgIGNvbnN0IG1hcCA9IHt9LFxuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGhzID0gc3ViRGlyZWN0b3J5UGF0aHNGcm9tU3ViRGlyZWN0b3J5TWFwQW5kSWdub3JlZERlcGVuZGVuY2llcyhzdWJEaXJlY3RvcnlNYXAsIGlnbm9yZWREZXBlbmRlbmNpZXMpO1xuXG4gICAgc3ViRGlyZWN0b3J5UGF0aHMuZm9yRWFjaCgoc3ViRGlyZWN0b3J5UGF0aCkgPT4ge1xuICAgICAgY29uc3QgcmVsZWFzZSA9IFJlbGVhc2UuZnJvbVN1YkRpcmVjdG9yeVBhdGgoc3ViRGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGlmIChyZWxlYXNlICE9PSBudWxsKSB7XG4gICAgICAgIG1hcFtzdWJEaXJlY3RvcnlQYXRoXSA9IHJlbGVhc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCByZWxlYXNlTWFwID0gbmV3IFJlbGVhc2VNYXAobWFwKTtcblxuICAgIHJldHVybiByZWxlYXNlTWFwO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN1YkRpcmVjdG9yeVBhdGhzRnJvbVN1YkRpcmVjdG9yeU1hcEFuZElnbm9yZWREZXBlbmRlbmNpZXMoc3ViRGlyZWN0b3J5TWFwLCBpZ25vcmVkRGVwZW5kZW5jaWVzKSB7XG4gIGNvbnN0IHN1YkRpcmVjdG9yeVBhdGhzID0gW10sXG4gICAgICAgIHN1YkRpcmVjdG9yeU5hbWVzID0gT2JqZWN0LmtleXMoc3ViRGlyZWN0b3J5TWFwKSwgLy8vXG4gICAgICAgIGlnbm9yZWREZXBlbmRlbmN5U3ViRGlyZWN0b3J5TmFtZXMgPSBpZ25vcmVkRGVwZW5kZW5jaWVzOyAvLy9cblxuICBzdWJEaXJlY3RvcnlOYW1lcy5mb3JFYWNoKChzdWJEaXJlY3RvcnlOYW1lKSA9PiB7XG4gICAgY29uc3QgaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lc0luY2x1ZGVzU3ViRGlyZWN0b3J5TmFtZSA9IGlnbm9yZWREZXBlbmRlbmN5U3ViRGlyZWN0b3J5TmFtZXMuaW5jbHVkZXMoc3ViRGlyZWN0b3J5TmFtZSk7XG5cbiAgICBpZiAoIWlnbm9yZWREZXBlbmRlbmN5U3ViRGlyZWN0b3J5TmFtZXNJbmNsdWRlc1N1YkRpcmVjdG9yeU5hbWUpIHtcbiAgICAgIGNvbnN0IHN1YkRpcmVjdG9yeVBhdGggPSBzdWJEaXJlY3RvcnlNYXBbc3ViRGlyZWN0b3J5TmFtZV07IC8vL1xuXG4gICAgICBzdWJEaXJlY3RvcnlQYXRocy5wdXNoKHN1YkRpcmVjdG9yeVBhdGgpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN1YkRpcmVjdG9yeVBhdGhzO1xufVxuIl0sIm5hbWVzIjpbIlJlbGVhc2VNYXAiLCJtYXAiLCJnZXROYW1lcyIsIm5hbWVzIiwicmVsZWFzZXMiLCJnZXRSZWxlYXNlcyIsImZvckVhY2giLCJyZWxlYXNlIiwibmFtZSIsImdldE5hbWUiLCJwdXNoIiwiT2JqZWN0IiwidmFsdWVzIiwiZ2V0U3ViRGlyZWN0b3J5UGF0aHMiLCJzdWJEaXJlY3RvcnlQYXRocyIsImtleXMiLCJnZXROYW1lVG9TdWJEaXJlY3RvcnlQYXRoTWFwIiwibmFtZVRvU3ViRGlyZWN0b3J5UGF0aE1hcCIsInN1YkRpcmVjdG9yeVBhdGgiLCJyZXRyaWV2ZVJlbGVhc2UiLCJmcm9tU3ViRGlyZWN0b3J5TWFwQW5kSWdub3JlZERlcGVuZGVuY2llcyIsInN1YkRpcmVjdG9yeU1hcCIsImlnbm9yZWREZXBlbmRlbmNpZXMiLCJzdWJEaXJlY3RvcnlQYXRoc0Zyb21TdWJEaXJlY3RvcnlNYXBBbmRJZ25vcmVkRGVwZW5kZW5jaWVzIiwiUmVsZWFzZSIsImZyb21TdWJEaXJlY3RvcnlQYXRoIiwicmVsZWFzZU1hcCIsInN1YkRpcmVjdG9yeU5hbWVzIiwiaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lcyIsInN1YkRpcmVjdG9yeU5hbWUiLCJpZ25vcmVkRGVwZW5kZW5jeVN1YkRpcmVjdG9yeU5hbWVzSW5jbHVkZXNTdWJEaXJlY3RvcnlOYW1lIiwiaW5jbHVkZXMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2VBSXFCQTs7OzhEQUZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUwsSUFBQSxBQUFNQSwyQkFBTjthQUFNQSxXQUNQQyxHQUFHO2dDQURJRDtRQUVqQixJQUFJLENBQUNDLEdBQUcsR0FBR0E7O2tCQUZNRDs7WUFLbkJFLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxJQUFNQyxRQUFRLEVBQUUsRUFDVkMsV0FBVyxJQUFJLENBQUNDLFdBQVc7Z0JBRWpDRCxTQUFTRSxPQUFPLENBQUMsU0FBQ0M7b0JBQ2hCLElBQU1DLE9BQU9ELFFBQVFFLE9BQU87b0JBRTVCLElBQUlELFNBQVMsTUFBTTt3QkFDakJMLE1BQU1PLElBQUksQ0FBQ0Y7b0JBQ2I7Z0JBQ0Y7Z0JBRUEsT0FBT0w7WUFDVDs7O1lBRUFFLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxJQUFNRCxXQUFXTyxPQUFPQyxNQUFNLENBQUMsSUFBSSxDQUFDWCxHQUFHO2dCQUV2QyxPQUFPRztZQUNUOzs7WUFFQVMsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLElBQU1DLG9CQUFvQkgsT0FBT0ksSUFBSSxDQUFDLElBQUksQ0FBQ2QsR0FBRztnQkFFOUMsT0FBT2E7WUFDVDs7O1lBRUFFLEtBQUFBO21CQUFBQSxTQUFBQTs7Z0JBQ0UsSUFBTUMsNEJBQTRCLENBQUMsR0FDN0JILG9CQUFvQixJQUFJLENBQUNELG9CQUFvQjtnQkFFbkRDLGtCQUFrQlIsT0FBTyxDQUFDLFNBQUNZO29CQUN6QixJQUFNWCxVQUFVLE1BQUtZLGVBQWUsQ0FBQ0QsbUJBQy9CVixPQUFPRCxRQUFRRSxPQUFPO29CQUU1QixJQUFJRCxTQUFTLE1BQU07d0JBQ2pCUyx5QkFBeUIsQ0FBQ1QsS0FBSyxHQUFHVTtvQkFDcEM7Z0JBQ0Y7Z0JBRUEsT0FBT0Q7WUFDVDs7O1lBRUFFLEtBQUFBO21CQUFBQSxTQUFBQSxnQkFBZ0JELGdCQUFnQjtnQkFDOUIsSUFBTVgsVUFBVSxJQUFJLENBQUNOLEdBQUcsQ0FBQ2lCLGlCQUFpQixJQUFJLE1BQU8sR0FBRztnQkFFeEQsT0FBT1g7WUFDVDs7OztZQUVPYSxLQUFBQTttQkFBUCxTQUFPQSwwQ0FBMENDLGVBQWUsRUFBRUMsbUJBQW1CO2dCQUNuRixJQUFNckIsTUFBTSxDQUFDLEdBQ1BhLG9CQUFvQlMsMkRBQTJERixpQkFBaUJDO2dCQUV0R1Isa0JBQWtCUixPQUFPLENBQUMsU0FBQ1k7b0JBQ3pCLElBQU1YLFVBQVVpQixnQkFBTyxDQUFDQyxvQkFBb0IsQ0FBQ1A7b0JBRTdDLElBQUlYLFlBQVksTUFBTTt3QkFDcEJOLEdBQUcsQ0FBQ2lCLGlCQUFpQixHQUFHWDtvQkFDMUI7Z0JBQ0Y7Z0JBRUEsSUFBTW1CLGFBQWEsSUFsRUYxQixXQWtFaUJDO2dCQUVsQyxPQUFPeUI7WUFDVDs7O1dBckVtQjFCOztBQXdFckIsU0FBU3VCLDJEQUEyREYsZUFBZSxFQUFFQyxtQkFBbUI7SUFDdEcsSUFBTVIsb0JBQW9CLEVBQUUsRUFDdEJhLG9CQUFvQmhCLE9BQU9JLElBQUksQ0FBQ00sa0JBQ2hDTyxxQ0FBcUNOLHFCQUFxQixHQUFHO0lBRW5FSyxrQkFBa0JyQixPQUFPLENBQUMsU0FBQ3VCO1FBQ3pCLElBQU1DLDZEQUE2REYsbUNBQW1DRyxRQUFRLENBQUNGO1FBRS9HLElBQUksQ0FBQ0MsNERBQTREO1lBQy9ELElBQU1aLG1CQUFtQkcsZUFBZSxDQUFDUSxpQkFBaUIsRUFBRSxHQUFHO1lBRS9EZixrQkFBa0JKLElBQUksQ0FBQ1E7UUFDekI7SUFDRjtJQUVBLE9BQU9KO0FBQ1QifQ==
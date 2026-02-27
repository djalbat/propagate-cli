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
const _necessary = require("necessary");
const _release = /*#__PURE__*/ _interop_require_default(require("./release"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { prune } = _necessary.arrayUtilities;
class ReleaseMap {
    constructor(map){
        this.map = map;
    }
    getNames() {
        const names = [], releases = this.getReleases();
        releases.forEach((release)=>{
            const name = release.getName();
            if (name !== null) {
                names.push(name);
            }
        });
        return names;
    }
    getReleases() {
        const releases = Object.values(this.map);
        return releases;
    }
    getSubDirectoryPaths() {
        const subDirectoryPaths = Object.keys(this.map);
        return subDirectoryPaths;
    }
    getNameToSubDirectoryPathMap() {
        const nameToSubDirectoryPathMap = {}, subDirectoryPaths = this.getSubDirectoryPaths();
        subDirectoryPaths.forEach((subDirectoryPath)=>{
            const release = this.retrieveRelease(subDirectoryPath), name = release.getName();
            if (name !== null) {
                nameToSubDirectoryPathMap[name] = subDirectoryPath;
            }
        });
        return nameToSubDirectoryPathMap;
    }
    retrieveRelease(subDirectoryPath) {
        const release = this.map[subDirectoryPath] || null; ///
        return release;
    }
    static fromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies) {
        const map = {}, subDirectoryPaths = subDirectoryPathsFromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies);
        subDirectoryPaths.forEach((subDirectoryPath)=>{
            const release = _release.default.fromSubDirectoryPath(subDirectoryPath);
            if (release !== null) {
                map[subDirectoryPath] = release;
            }
        });
        const releaseMap = new ReleaseMap(map);
        return releaseMap;
    }
}
function subDirectoryPathsFromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies) {
    const subDirectoryPaths = [], subDirectoryNames = Object.keys(subDirectoryMap), ignoredDependencySubDirectoryNames = ignoredDependencies; ///
    prune(ignoredDependencySubDirectoryNames, (ignoredDependencySubDirectoryName)=>{
        if (ignoredDependencySubDirectoryName !== subDirectoryName) {
            return true;
        }
    });
    subDirectoryNames.forEach((subDirectoryName)=>{
        const ignoredDependencySubDirectoryNamesIncludesSubDirectoryName = ignoredDependencySubDirectoryNames.includes(subDirectoryName);
        if (!ignoredDependencySubDirectoryNamesIncludesSubDirectoryName) {
            const subDirectoryPath = subDirectoryMap[subDirectoryName]; ///
            subDirectoryPaths.push(subDirectoryPath);
        }
    });
    return subDirectoryPaths;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlTWFwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IFJlbGVhc2UgZnJvbSBcIi4vcmVsZWFzZVwiO1xuXG5jb25zdCB7IHBydW5lIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsZWFzZU1hcCB7XG4gIGNvbnN0cnVjdG9yKG1hcCkge1xuICAgIHRoaXMubWFwID0gbWFwO1xuICB9XG5cbiAgZ2V0TmFtZXMoKSB7XG4gICAgY29uc3QgbmFtZXMgPSBbXSxcbiAgICAgICAgICByZWxlYXNlcyA9IHRoaXMuZ2V0UmVsZWFzZXMoKTtcblxuICAgIHJlbGVhc2VzLmZvckVhY2goKHJlbGVhc2UpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSByZWxlYXNlLmdldE5hbWUoKTtcblxuICAgICAgaWYgKG5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbmFtZXMucHVzaChuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuYW1lcztcbiAgfVxuXG4gIGdldFJlbGVhc2VzKCkge1xuICAgIGNvbnN0IHJlbGVhc2VzID0gT2JqZWN0LnZhbHVlcyh0aGlzLm1hcCk7XG5cbiAgICByZXR1cm4gcmVsZWFzZXM7XG4gIH1cblxuICBnZXRTdWJEaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBzdWJEaXJlY3RvcnlQYXRocyA9IE9iamVjdC5rZXlzKHRoaXMubWFwKTtcblxuICAgIHJldHVybiBzdWJEaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldE5hbWVUb1N1YkRpcmVjdG9yeVBhdGhNYXAoKSB7XG4gICAgY29uc3QgbmFtZVRvU3ViRGlyZWN0b3J5UGF0aE1hcCA9IHt9LFxuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGhzID0gdGhpcy5nZXRTdWJEaXJlY3RvcnlQYXRocygpO1xuXG4gICAgc3ViRGlyZWN0b3J5UGF0aHMuZm9yRWFjaCgoc3ViRGlyZWN0b3J5UGF0aCkgPT4ge1xuICAgICAgY29uc3QgcmVsZWFzZSA9IHRoaXMucmV0cmlldmVSZWxlYXNlKHN1YkRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgICAgbmFtZSA9IHJlbGVhc2UuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAobmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBuYW1lVG9TdWJEaXJlY3RvcnlQYXRoTWFwW25hbWVdID0gc3ViRGlyZWN0b3J5UGF0aDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuYW1lVG9TdWJEaXJlY3RvcnlQYXRoTWFwO1xuICB9XG5cbiAgcmV0cmlldmVSZWxlYXNlKHN1YkRpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCByZWxlYXNlID0gdGhpcy5tYXBbc3ViRGlyZWN0b3J5UGF0aF0gfHwgbnVsbDsgIC8vL1xuXG4gICAgcmV0dXJuIHJlbGVhc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbVN1YkRpcmVjdG9yeU1hcFN1YkRpcmVjdG9yeU5hbWVBbmRJZ25vcmVkRGVwZW5kZW5jaWVzKHN1YkRpcmVjdG9yeU1hcCwgc3ViRGlyZWN0b3J5TmFtZSwgaWdub3JlZERlcGVuZGVuY2llcykge1xuICAgIGNvbnN0IG1hcCA9IHt9LFxuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGhzID0gc3ViRGlyZWN0b3J5UGF0aHNGcm9tU3ViRGlyZWN0b3J5TWFwU3ViRGlyZWN0b3J5TmFtZUFuZElnbm9yZWREZXBlbmRlbmNpZXMoc3ViRGlyZWN0b3J5TWFwLCBzdWJEaXJlY3RvcnlOYW1lLCBpZ25vcmVkRGVwZW5kZW5jaWVzKTtcblxuICAgIHN1YkRpcmVjdG9yeVBhdGhzLmZvckVhY2goKHN1YkRpcmVjdG9yeVBhdGgpID0+IHtcbiAgICAgIGNvbnN0IHJlbGVhc2UgPSBSZWxlYXNlLmZyb21TdWJEaXJlY3RvcnlQYXRoKHN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBpZiAocmVsZWFzZSAhPT0gbnVsbCkge1xuICAgICAgICBtYXBbc3ViRGlyZWN0b3J5UGF0aF0gPSByZWxlYXNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVsZWFzZU1hcCA9IG5ldyBSZWxlYXNlTWFwKG1hcCk7XG5cbiAgICByZXR1cm4gcmVsZWFzZU1hcDtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdWJEaXJlY3RvcnlQYXRoc0Zyb21TdWJEaXJlY3RvcnlNYXBTdWJEaXJlY3RvcnlOYW1lQW5kSWdub3JlZERlcGVuZGVuY2llcyhzdWJEaXJlY3RvcnlNYXAsIHN1YkRpcmVjdG9yeU5hbWUsIGlnbm9yZWREZXBlbmRlbmNpZXMpIHtcbiAgY29uc3Qgc3ViRGlyZWN0b3J5UGF0aHMgPSBbXSxcbiAgICAgICAgc3ViRGlyZWN0b3J5TmFtZXMgPSBPYmplY3Qua2V5cyhzdWJEaXJlY3RvcnlNYXApLCAvLy9cbiAgICAgICAgaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lcyA9IGlnbm9yZWREZXBlbmRlbmNpZXM7IC8vL1xuXG4gIHBydW5lKGlnbm9yZWREZXBlbmRlbmN5U3ViRGlyZWN0b3J5TmFtZXMsIChpZ25vcmVkRGVwZW5kZW5jeVN1YkRpcmVjdG9yeU5hbWUpID0+IHtcbiAgICBpZiAoaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lICE9PSBzdWJEaXJlY3RvcnlOYW1lKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHN1YkRpcmVjdG9yeU5hbWVzLmZvckVhY2goKHN1YkRpcmVjdG9yeU5hbWUpID0+IHtcbiAgICBjb25zdCBpZ25vcmVkRGVwZW5kZW5jeVN1YkRpcmVjdG9yeU5hbWVzSW5jbHVkZXNTdWJEaXJlY3RvcnlOYW1lID0gaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lcy5pbmNsdWRlcyhzdWJEaXJlY3RvcnlOYW1lKTtcblxuICAgIGlmICghaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lc0luY2x1ZGVzU3ViRGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3Qgc3ViRGlyZWN0b3J5UGF0aCA9IHN1YkRpcmVjdG9yeU1hcFtzdWJEaXJlY3RvcnlOYW1lXTsgLy8vXG5cbiAgICAgIHN1YkRpcmVjdG9yeVBhdGhzLnB1c2goc3ViRGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc3ViRGlyZWN0b3J5UGF0aHM7XG59XG4iXSwibmFtZXMiOlsiUmVsZWFzZU1hcCIsInBydW5lIiwiYXJyYXlVdGlsaXRpZXMiLCJtYXAiLCJnZXROYW1lcyIsIm5hbWVzIiwicmVsZWFzZXMiLCJnZXRSZWxlYXNlcyIsImZvckVhY2giLCJyZWxlYXNlIiwibmFtZSIsImdldE5hbWUiLCJwdXNoIiwiT2JqZWN0IiwidmFsdWVzIiwiZ2V0U3ViRGlyZWN0b3J5UGF0aHMiLCJzdWJEaXJlY3RvcnlQYXRocyIsImtleXMiLCJnZXROYW1lVG9TdWJEaXJlY3RvcnlQYXRoTWFwIiwibmFtZVRvU3ViRGlyZWN0b3J5UGF0aE1hcCIsInN1YkRpcmVjdG9yeVBhdGgiLCJyZXRyaWV2ZVJlbGVhc2UiLCJmcm9tU3ViRGlyZWN0b3J5TWFwU3ViRGlyZWN0b3J5TmFtZUFuZElnbm9yZWREZXBlbmRlbmNpZXMiLCJzdWJEaXJlY3RvcnlNYXAiLCJzdWJEaXJlY3RvcnlOYW1lIiwiaWdub3JlZERlcGVuZGVuY2llcyIsInN1YkRpcmVjdG9yeVBhdGhzRnJvbVN1YkRpcmVjdG9yeU1hcFN1YkRpcmVjdG9yeU5hbWVBbmRJZ25vcmVkRGVwZW5kZW5jaWVzIiwiUmVsZWFzZSIsImZyb21TdWJEaXJlY3RvcnlQYXRoIiwicmVsZWFzZU1hcCIsInN1YkRpcmVjdG9yeU5hbWVzIiwiaWdub3JlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lcyIsImlnbm9yZWREZXBlbmRlbmN5U3ViRGlyZWN0b3J5TmFtZSIsImlnbm9yZWREZXBlbmRlbmN5U3ViRGlyZWN0b3J5TmFtZXNJbmNsdWRlc1N1YkRp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
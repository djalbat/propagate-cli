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
const _necessary = require("necessary");
const _semver = /*#__PURE__*/ _interop_require_default(require("../diff/semver"));
const _constants = require("../constants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { filter } = _necessary.arrayUtilities;
class MapDiff {
    constructor(semverDiffs){
        this.semverDiffs = semverDiffs;
    }
    getSemverDiffs() {
        return this.semverDiffs;
    }
    isEmpty() {
        const names = Object.keys(this.semverDiffs), namesLength = names.length, empty = namesLength === 0;
        return empty;
    }
    save(packageJSON, name) {
        packageJSON = packageJSON[name]; ///
        this.forEachSemverDiff((semverDiff)=>{
            semverDiff.save(packageJSON);
        });
    }
    someSemverDiff(callback) {
        return this.semverDiffs.some(callback);
    }
    reduceSemverDiff(callback, initialValue) {
        return this.semverDiffs.reduce(callback, initialValue);
    }
    forEachSemverDiff(callback) {
        this.semverDiffs.forEach(callback);
    }
    removeSemverDiff(name) {
        filter(this.semverDiffs, (semverDiff)=>{
            const semverDiffName = semverDiff.getName();
            if (semverDiffName !== name) {
                return true;
            }
        });
    }
    getSpecifiers(specifiers) {
        this.forEachSemverDiff((semverDiff)=>{
            const specifier = semverDiff.getSpecifier();
            specifiers.push(specifier);
        });
        return specifiers;
    }
    asString() {
        const semverDiffsLength = this.semverDiffs.length, lastIndex = semverDiffsLength - 1, semverDiffsString = this.reduceSemverDiff((semverDiffsString, semverDiff, index)=>{
            const last = index === lastIndex, semverDiffString = semverDiff.asString(last);
            semverDiffsString = `${semverDiffsString}${semverDiffString}`;
            return semverDiffsString;
        }, _constants.EMPTY_STRING), string = `{\n${semverDiffsString}\n   }`;
        return string;
    }
    static fromMapAndReleaseMap(map, releaseMap) {
        const names = Object.keys(map), semverDiffs = [];
        names.forEach((name)=>{
            const semver = map[name], releaseSemver = releaseMap[name], semverDiff = _semver.default.fromNameSemverAndReleaseSemver(name, semver, releaseSemver);
            if (semverDiff !== null) {
                semverDiffs.push(semverDiff);
            }
        });
        const mapDiff = new MapDiff(semverDiffs);
        return mapDiff;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL21hcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBTZW12ZXJEaWZmIGZyb20gXCIuLi9kaWZmL3NlbXZlclwiO1xuXG5pbXBvcnQgeyBFTVBUWV9TVFJJTkcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5cbmNvbnN0IHsgZmlsdGVyIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwRGlmZiB7XG4gIGNvbnN0cnVjdG9yKHNlbXZlckRpZmZzKSB7XG4gICAgdGhpcy5zZW12ZXJEaWZmcyA9IHNlbXZlckRpZmZzO1xuICB9XG5cbiAgZ2V0U2VtdmVyRGlmZnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VtdmVyRGlmZnM7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXModGhpcy5zZW12ZXJEaWZmcyksICAvLy9cbiAgICAgICAgICBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChuYW1lc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBzYXZlKHBhY2thZ2VKU09OLCBuYW1lKSB7XG4gICAgcGFja2FnZUpTT04gPSBwYWNrYWdlSlNPTltuYW1lXTsgIC8vL1xuXG4gICAgdGhpcy5mb3JFYWNoU2VtdmVyRGlmZigoc2VtdmVyRGlmZikgPT4ge1xuICAgICAgc2VtdmVyRGlmZi5zYXZlKHBhY2thZ2VKU09OKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVTZW12ZXJEaWZmKGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNlbXZlckRpZmZzLnNvbWUoY2FsbGJhY2spOyB9XG5cbiAgcmVkdWNlU2VtdmVyRGlmZihjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7IHJldHVybiB0aGlzLnNlbXZlckRpZmZzLnJlZHVjZShjYWxsYmFjaywgaW5pdGlhbFZhbHVlKTsgfVxuXG4gIGZvckVhY2hTZW12ZXJEaWZmKGNhbGxiYWNrKSB7IHRoaXMuc2VtdmVyRGlmZnMuZm9yRWFjaChjYWxsYmFjayk7IH1cblxuICByZW1vdmVTZW12ZXJEaWZmKG5hbWUpIHtcbiAgICBmaWx0ZXIodGhpcy5zZW12ZXJEaWZmcywgKHNlbXZlckRpZmYpID0+IHtcbiAgICAgIGNvbnN0IHNlbXZlckRpZmZOYW1lID0gc2VtdmVyRGlmZi5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChzZW12ZXJEaWZmTmFtZSAhPT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFNwZWNpZmllcnMoc3BlY2lmaWVycykge1xuICAgIHRoaXMuZm9yRWFjaFNlbXZlckRpZmYoKHNlbXZlckRpZmYpID0+IHtcbiAgICAgIGNvbnN0IHNwZWNpZmllciA9IHNlbXZlckRpZmYuZ2V0U3BlY2lmaWVyKCk7XG5cbiAgICAgIHNwZWNpZmllcnMucHVzaChzcGVjaWZpZXIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNwZWNpZmllcnM7XG4gIH1cblxuICBhc1N0cmluZygpIHtcbiAgICBjb25zdCBzZW12ZXJEaWZmc0xlbmd0aCA9IHRoaXMuc2VtdmVyRGlmZnMubGVuZ3RoLFxuICAgICAgICAgIGxhc3RJbmRleCA9IHNlbXZlckRpZmZzTGVuZ3RoIC0gMSxcbiAgICAgICAgICBzZW12ZXJEaWZmc1N0cmluZyA9IHRoaXMucmVkdWNlU2VtdmVyRGlmZigoc2VtdmVyRGlmZnNTdHJpbmcsIHNlbXZlckRpZmYsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gKGluZGV4ID09PSBsYXN0SW5kZXgpLFxuICAgICAgICAgICAgICAgICAgc2VtdmVyRGlmZlN0cmluZyA9IHNlbXZlckRpZmYuYXNTdHJpbmcobGFzdCk7XG5cbiAgICAgICAgICAgIHNlbXZlckRpZmZzU3RyaW5nID0gYCR7c2VtdmVyRGlmZnNTdHJpbmd9JHtzZW12ZXJEaWZmU3RyaW5nfWA7XG5cbiAgICAgICAgICAgIHJldHVybiBzZW12ZXJEaWZmc1N0cmluZztcbiAgICAgICAgICB9LCBFTVBUWV9TVFJJTkcpLFxuICAgICAgICAgIHN0cmluZyA9IGB7XFxuJHtzZW12ZXJEaWZmc1N0cmluZ31cXG4gICB9YDtcblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cblxuICBzdGF0aWMgZnJvbU1hcEFuZFJlbGVhc2VNYXAobWFwLCByZWxlYXNlTWFwKSB7XG4gICAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhtYXApLFxuICAgICAgICAgIHNlbXZlckRpZmZzID0gW107XG5cbiAgICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBjb25zdCBzZW12ZXIgPSBtYXBbbmFtZV0sXG4gICAgICAgICAgICByZWxlYXNlU2VtdmVyID0gcmVsZWFzZU1hcFtuYW1lXSxcbiAgICAgICAgICAgIHNlbXZlckRpZmYgPSBTZW12ZXJEaWZmLmZyb21OYW1lU2VtdmVyQW5kUmVsZWFzZVNlbXZlcihuYW1lLCBzZW12ZXIsIHJlbGVhc2VTZW12ZXIpO1xuXG4gICAgICBpZiAoc2VtdmVyRGlmZiAhPT0gbnVsbCkge1xuICAgICAgICBzZW12ZXJEaWZmcy5wdXNoKHNlbXZlckRpZmYpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFwRGlmZiA9IG5ldyBNYXBEaWZmKHNlbXZlckRpZmZzKTtcblxuICAgIHJldHVybiBtYXBEaWZmO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTWFwRGlmZiIsImZpbHRlciIsImFycmF5VXRpbGl0aWVzIiwic2VtdmVyRGlmZnMiLCJnZXRTZW12ZXJEaWZmcyIsImlzRW1wdHkiLCJuYW1lcyIsIk9iamVjdCIsImtleXMiLCJuYW1lc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5Iiwic2F2ZSIsInBhY2thZ2VKU09OIiwibmFtZSIsImZvckVhY2hTZW12ZXJEaWZmIiwic2VtdmVyRGlmZiIsInNvbWVTZW12ZXJEaWZmIiwiY2FsbGJhY2siLCJzb21lIiwicmVkdWNlU2VtdmVyRGlmZiIsImluaXRpYWxWYWx1ZSIsInJlZHVjZSIsImZvckVhY2giLCJyZW1vdmVTZW12ZXJEaWZmIiwic2VtdmVyRGlmZk5hbWUiLCJnZXROYW1lIiwiZ2V0U3BlY2lmaWVycyIsInNwZWNpZmllcnMiLCJzcGVjaWZpZXIiLCJnZXRTcGVjaWZpZXIiLCJwdXNoIiwiYXNTdHJpbmciLCJzZW12ZXJEaWZmc0xlbmd0aCIsImxhc3RJbmRleCIsInNlbXZlckRpZmZzU3RyaW5nIiwiaW5kZXgiLCJsYXN0Iiwic2VtdmVyRGlmZlN0cmluZyIsIkVNUFRZX1NUUklORyIsInN0cmluZyIsImZyb21NYXBBbmRSZWxlYXNlTWFwIiwibWFwIiwicmVsZWFzZU1hcCIsInNlbXZlciIsInJlbGVhc2VTZW12ZXIiLCJTZW12ZXJEaWZmIiwiZnJvbU5hbWVTZW12ZXJBbmRSZWxlYXNlU2VtdmVyIiwibWFwRGlmZiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBVUE7OztlQUFxQkE7OzsyQkFSVTsrREFFUjsyQkFFTTs7Ozs7O0FBRTdCLE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUdDLHlCQUFjO0FBRWxCLE1BQU1GO0lBQ25CLFlBQVlHLFdBQVcsQ0FBRTtRQUN2QixJQUFJLENBQUNBLFdBQVcsR0FBR0E7SUFDckI7SUFFQUMsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUNELFdBQVc7SUFDekI7SUFFQUUsVUFBVTtRQUNSLE1BQU1DLFFBQVFDLE9BQU9DLElBQUksQ0FBQyxJQUFJLENBQUNMLFdBQVcsR0FDcENNLGNBQWNILE1BQU1JLE1BQU0sRUFDMUJDLFFBQVNGLGdCQUFnQjtRQUUvQixPQUFPRTtJQUNUO0lBRUFDLEtBQUtDLFdBQVcsRUFBRUMsSUFBSSxFQUFFO1FBQ3RCRCxjQUFjQSxXQUFXLENBQUNDLEtBQUssRUFBRyxHQUFHO1FBRXJDLElBQUksQ0FBQ0MsaUJBQWlCLENBQUMsQ0FBQ0M7WUFDdEJBLFdBQVdKLElBQUksQ0FBQ0M7UUFDbEI7SUFDRjtJQUVBSSxlQUFlQyxRQUFRLEVBQUU7UUFBRSxPQUFPLElBQUksQ0FBQ2YsV0FBVyxDQUFDZ0IsSUFBSSxDQUFDRDtJQUFXO0lBRW5FRSxpQkFBaUJGLFFBQVEsRUFBRUcsWUFBWSxFQUFFO1FBQUUsT0FBTyxJQUFJLENBQUNsQixXQUFXLENBQUNtQixNQUFNLENBQUNKLFVBQVVHO0lBQWU7SUFFbkdOLGtCQUFrQkcsUUFBUSxFQUFFO1FBQUUsSUFBSSxDQUFDZixXQUFXLENBQUNvQixPQUFPLENBQUNMO0lBQVc7SUFFbEVNLGlCQUFpQlYsSUFBSSxFQUFFO1FBQ3JCYixPQUFPLElBQUksQ0FBQ0UsV0FBVyxFQUFFLENBQUNhO1lBQ3hCLE1BQU1TLGlCQUFpQlQsV0FBV1UsT0FBTztZQUV6QyxJQUFJRCxtQkFBbUJYLE1BQU07Z0JBQzNCLE9BQU87WUFDVDtRQUNGO0lBQ0Y7SUFFQWEsY0FBY0MsVUFBVSxFQUFFO1FBQ3hCLElBQUksQ0FBQ2IsaUJBQWlCLENBQUMsQ0FBQ0M7WUFDdEIsTUFBTWEsWUFBWWIsV0FBV2MsWUFBWTtZQUV6Q0YsV0FBV0csSUFBSSxDQUFDRjtRQUNsQjtRQUVBLE9BQU9EO0lBQ1Q7SUFFQUksV0FBVztRQUNULE1BQU1DLG9CQUFvQixJQUFJLENBQUM5QixXQUFXLENBQUNPLE1BQU0sRUFDM0N3QixZQUFZRCxvQkFBb0IsR0FDaENFLG9CQUFvQixJQUFJLENBQUNmLGdCQUFnQixDQUFDLENBQUNlLG1CQUFtQm5CLFlBQVlvQjtZQUN4RSxNQUFNQyxPQUFRRCxVQUFVRixXQUNsQkksbUJBQW1CdEIsV0FBV2dCLFFBQVEsQ0FBQ0s7WUFFN0NGLG9CQUFvQixHQUFHQSxvQkFBb0JHLGtCQUFrQjtZQUU3RCxPQUFPSDtRQUNULEdBQUdJLHVCQUFZLEdBQ2ZDLFNBQVMsQ0FBQyxHQUFHLEVBQUVMLGtCQUFrQixNQUFNLENBQUM7UUFFOUMsT0FBT0s7SUFDVDtJQUVBLE9BQU9DLHFCQUFxQkMsR0FBRyxFQUFFQyxVQUFVLEVBQUU7UUFDM0MsTUFBTXJDLFFBQVFDLE9BQU9DLElBQUksQ0FBQ2tDLE1BQ3BCdkMsY0FBYyxFQUFFO1FBRXRCRyxNQUFNaUIsT0FBTyxDQUFDLENBQUNUO1lBQ2IsTUFBTThCLFNBQVNGLEdBQUcsQ0FBQzVCLEtBQUssRUFDbEIrQixnQkFBZ0JGLFVBQVUsQ0FBQzdCLEtBQUssRUFDaENFLGFBQWE4QixlQUFVLENBQUNDLDhCQUE4QixDQUFDakMsTUFBTThCLFFBQVFDO1lBRTNFLElBQUk3QixlQUFlLE1BQU07Z0JBQ3ZCYixZQUFZNEIsSUFBSSxDQUFDZjtZQUNuQjtRQUNGO1FBRUEsTUFBTWdDLFVBQVUsSUFBSWhELFFBQVFHO1FBRTVCLE9BQU82QztJQUNUO0FBQ0YifQ==
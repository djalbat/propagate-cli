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
const _version = /*#__PURE__*/ _interop_require_default(require("../version"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class VersionDiff {
    constructor(version, releaseVersion){
        this.version = version;
        this.releaseVersion = releaseVersion;
    }
    isEmpty() {
        let empty = true;
        if (this.version !== null) {
            const versionEqualToReleaseVersion = this.version.isEqualTo(this.releaseVersion);
            empty = versionEqualToReleaseVersion; ///
        }
        return empty;
    }
    getVersion() {
        return this.version;
    }
    getReleaseVersion() {
        return this.releaseVersion;
    }
    save(packageJSON) {
        if (this.version === null) {
            return;
        }
        const releaseVersionString = this.releaseVersion.asString(), version = releaseVersionString; ///
        Object.assign(packageJSON, {
            version
        });
    }
    asString() {
        const versionString = this.version.asString(), releaseVersionString = this.releaseVersion.asString(), string = `"${versionString}" -> "${releaseVersionString}"`;
        return string;
    }
    static fromVersionStringAndReleaseVersion(versionString, releaseVersion) {
        const version = _version.default.fromVersionString(versionString), versionDiff = new VersionDiff(version, releaseVersion);
        return versionDiff;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL3ZlcnNpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBWZXJzaW9uIGZyb20gXCIuLi92ZXJzaW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcnNpb25EaWZmIHtcbiAgY29uc3RydWN0b3IodmVyc2lvbiwgcmVsZWFzZVZlcnNpb24pIHtcbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHRoaXMucmVsZWFzZVZlcnNpb24gPSByZWxlYXNlVmVyc2lvbjtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgbGV0IGVtcHR5ID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnZlcnNpb24gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHZlcnNpb25FcXVhbFRvUmVsZWFzZVZlcnNpb24gPSB0aGlzLnZlcnNpb24uaXNFcXVhbFRvKHRoaXMucmVsZWFzZVZlcnNpb24pO1xuXG4gICAgICBlbXB0eSA9IHZlcnNpb25FcXVhbFRvUmVsZWFzZVZlcnNpb247IC8vL1xuICAgIH1cblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGdldFZlcnNpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbiAgfVxuXG4gIGdldFJlbGVhc2VWZXJzaW9uKCkge1xuICAgIHJldHVybiB0aGlzLnJlbGVhc2VWZXJzaW9uO1xuICB9XG5cbiAgc2F2ZShwYWNrYWdlSlNPTikge1xuICAgIGlmICh0aGlzLnZlcnNpb24gPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZWxlYXNlVmVyc2lvblN0cmluZyA9IHRoaXMucmVsZWFzZVZlcnNpb24uYXNTdHJpbmcoKSxcbiAgICAgICAgICB2ZXJzaW9uID0gcmVsZWFzZVZlcnNpb25TdHJpbmc7IC8vL1xuXG4gICAgT2JqZWN0LmFzc2lnbihwYWNrYWdlSlNPTiwge1xuICAgICAgdmVyc2lvblxuICAgIH0pO1xuICB9XG5cbiAgYXNTdHJpbmcoKSB7XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IHRoaXMudmVyc2lvbi5hc1N0cmluZygpLFxuICAgICAgICAgIHJlbGVhc2VWZXJzaW9uU3RyaW5nID0gdGhpcy5yZWxlYXNlVmVyc2lvbi5hc1N0cmluZygpLFxuICAgICAgICAgIHN0cmluZyA9IGBcIiR7dmVyc2lvblN0cmluZ31cIiAtPiBcIiR7cmVsZWFzZVZlcnNpb25TdHJpbmd9XCJgO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVmVyc2lvblN0cmluZ0FuZFJlbGVhc2VWZXJzaW9uKHZlcnNpb25TdHJpbmcsIHJlbGVhc2VWZXJzaW9uKSB7XG4gICAgY29uc3QgdmVyc2lvbiA9IFZlcnNpb24uZnJvbVZlcnNpb25TdHJpbmcodmVyc2lvblN0cmluZyksXG4gICAgICAgICAgdmVyc2lvbkRpZmYgPSBuZXcgVmVyc2lvbkRpZmYodmVyc2lvbiwgcmVsZWFzZVZlcnNpb24pO1xuXG4gICAgcmV0dXJuIHZlcnNpb25EaWZmO1xuICB9XG59XG4iXSwibmFtZXMiOlsiVmVyc2lvbkRpZmYiLCJ2ZXJzaW9uIiwicmVsZWFzZVZlcnNpb24iLCJpc0VtcHR5IiwiZW1wdHkiLCJ2ZXJzaW9uRXF1YWxUb1JlbGVhc2VWZXJzaW9uIiwiaXNFcXVhbFRvIiwiZ2V0VmVyc2lvbiIsImdldFJlbGVhc2VWZXJzaW9uIiwic2F2ZSIsInBhY2thZ2VKU09OIiwicmVsZWFzZVZlcnNpb25TdHJpbmciLCJhc1N0cmluZyIsIk9iamVjdCIsImFzc2lnbiIsInZlcnNpb25TdHJpbmciLCJzdHJpbmciLCJmcm9tVmVyc2lvblN0cmluZ0FuZFJlbGVhc2VWZXJzaW9uIiwiVmVyc2lvbiIsImZyb21WZXJzaW9uU3RyaW5nIiwidmVyc2lvbkRpZmYiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQUlBOzs7ZUFBcUJBOzs7Z0VBRkQ7Ozs7OztBQUVMLE1BQU1BO0lBQ25CLFlBQVlDLE9BQU8sRUFBRUMsY0FBYyxDQUFFO1FBQ25DLElBQUksQ0FBQ0QsT0FBTyxHQUFHQTtRQUNmLElBQUksQ0FBQ0MsY0FBYyxHQUFHQTtJQUN4QjtJQUVBQyxVQUFVO1FBQ1IsSUFBSUMsUUFBUTtRQUVaLElBQUksSUFBSSxDQUFDSCxPQUFPLEtBQUssTUFBTTtZQUN6QixNQUFNSSwrQkFBK0IsSUFBSSxDQUFDSixPQUFPLENBQUNLLFNBQVMsQ0FBQyxJQUFJLENBQUNKLGNBQWM7WUFFL0VFLFFBQVFDLDhCQUE4QixHQUFHO1FBQzNDO1FBRUEsT0FBT0Q7SUFDVDtJQUVBRyxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUNOLE9BQU87SUFDckI7SUFFQU8sb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDTixjQUFjO0lBQzVCO0lBRUFPLEtBQUtDLFdBQVcsRUFBRTtRQUNoQixJQUFJLElBQUksQ0FBQ1QsT0FBTyxLQUFLLE1BQU07WUFDekI7UUFDRjtRQUVBLE1BQU1VLHVCQUF1QixJQUFJLENBQUNULGNBQWMsQ0FBQ1UsUUFBUSxJQUNuRFgsVUFBVVUsc0JBQXNCLEdBQUc7UUFFekNFLE9BQU9DLE1BQU0sQ0FBQ0osYUFBYTtZQUN6QlQ7UUFDRjtJQUNGO0lBRUFXLFdBQVc7UUFDVCxNQUFNRyxnQkFBZ0IsSUFBSSxDQUFDZCxPQUFPLENBQUNXLFFBQVEsSUFDckNELHVCQUF1QixJQUFJLENBQUNULGNBQWMsQ0FBQ1UsUUFBUSxJQUNuREksU0FBUyxDQUFDLENBQUMsRUFBRUQsY0FBYyxNQUFNLEVBQUVKLHFCQUFxQixDQUFDLENBQUM7UUFFaEUsT0FBT0s7SUFDVDtJQUVBLE9BQU9DLG1DQUFtQ0YsYUFBYSxFQUFFYixjQUFjLEVBQUU7UUFDdkUsTUFBTUQsVUFBVWlCLGdCQUFPLENBQUNDLGlCQUFpQixDQUFDSixnQkFDcENLLGNBQWMsSUFBSXBCLFlBQVlDLFNBQVNDO1FBRTdDLE9BQU9rQjtJQUNUO0FBQ0YifQ==
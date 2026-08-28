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
const _semver = require("../utilities/semver");
class SemverDiff {
    constructor(name, semver, releaseSemver){
        this.name = name;
        this.semver = semver;
        this.releaseSemver = releaseSemver;
    }
    getName() {
        return this.name;
    }
    getSemver() {
        return this.semver;
    }
    getReleaseSemver() {
        return this.releaseSemver;
    }
    save(packageJSON) {
        const semver = this.releaseSemver;
        packageJSON[this.name] = semver;
    }
    getSpecifier() {
        const releaseSemver = (0, _semver.trimRangeModifier)(this.releaseSemver), specifier = `${this.name}@${releaseSemver}`;
        return specifier;
    }
    asString(last) {
        let string = `     "${this.name}": "${this.semver}" -> "${this.releaseSemver}"`;
        if (!last) {
            string = `${string},\n`;
        }
        return string;
    }
    static fromNameSemverAndReleaseSemver(name, semver, releaseSemver) {
        let semverDiff = null;
        if (semver !== releaseSemver) {
            semverDiff = new SemverDiff(name, semver, releaseSemver);
        }
        return semverDiff;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL3NlbXZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgdHJpbVJhbmdlTW9kaWZpZXIgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3NlbXZlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW12ZXJEaWZmIHtcbiAgY29uc3RydWN0b3IobmFtZSwgc2VtdmVyLCByZWxlYXNlU2VtdmVyKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnNlbXZlciA9IHNlbXZlcjtcbiAgICB0aGlzLnJlbGVhc2VTZW12ZXIgPSByZWxlYXNlU2VtdmVyO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0U2VtdmVyKCkge1xuICAgIHJldHVybiB0aGlzLnNlbXZlcjtcbiAgfVxuXG4gIGdldFJlbGVhc2VTZW12ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVsZWFzZVNlbXZlcjtcbiAgfVxuXG4gIHNhdmUocGFja2FnZUpTT04pIHtcbiAgICBjb25zdCBzZW12ZXIgPSB0aGlzLnJlbGVhc2VTZW12ZXI7XG5cbiAgICBwYWNrYWdlSlNPTlt0aGlzLm5hbWVdID0gc2VtdmVyO1xuICB9XG5cbiAgZ2V0U3BlY2lmaWVyKCkge1xuICAgIGNvbnN0IHJlbGVhc2VTZW12ZXIgPSB0cmltUmFuZ2VNb2RpZmllcih0aGlzLnJlbGVhc2VTZW12ZXIpLFxuICAgICAgICAgIHNwZWNpZmllciA9IGAke3RoaXMubmFtZX1AJHtyZWxlYXNlU2VtdmVyfWA7XG5cbiAgICByZXR1cm4gc3BlY2lmaWVyO1xuICB9XG5cbiAgYXNTdHJpbmcobGFzdCkge1xuICAgIGxldCBzdHJpbmcgPSBgICAgICBcIiR7dGhpcy5uYW1lfVwiOiBcIiR7dGhpcy5zZW12ZXJ9XCIgLT4gXCIke3RoaXMucmVsZWFzZVNlbXZlcn1cImA7XG5cbiAgICBpZiAoIWxhc3QpIHtcbiAgICAgIHN0cmluZyA9IGAke3N0cmluZ30sXFxuYDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lU2VtdmVyQW5kUmVsZWFzZVNlbXZlcihuYW1lLCBzZW12ZXIsIHJlbGVhc2VTZW12ZXIpIHtcbiAgICBsZXQgc2VtdmVyRGlmZiA9IG51bGw7XG5cbiAgICBpZiAoc2VtdmVyICE9PSByZWxlYXNlU2VtdmVyKSB7XG4gICAgICBzZW12ZXJEaWZmID0gbmV3IFNlbXZlckRpZmYobmFtZSwgc2VtdmVyLCByZWxlYXNlU2VtdmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VtdmVyRGlmZjtcbiAgfVxufVxuXG4iXSwibmFtZXMiOlsiU2VtdmVyRGlmZiIsIm5hbWUiLCJzZW12ZXIiLCJyZWxlYXNlU2VtdmVyIiwiZ2V0TmFtZSIsImdldFNlbXZlciIsImdldFJlbGVhc2VTZW12ZXIiLCJzYXZlIiwicGFja2FnZUpTT04iLCJnZXRTcGVjaWZpZXIiLCJ0cmltUmFuZ2VNb2RpZmllciIsInNwZWNpZmllciIsImFzU3RyaW5nIiwibGFzdCIsInN0cmluZyIsImZyb21OYW1lU2VtdmVyQW5kUmVsZWFzZVNlbXZlciIsInNlbXZlckRpZmYiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQUlBOzs7ZUFBcUJBOzs7d0JBRmE7QUFFbkIsTUFBTUE7SUFDbkIsWUFBWUMsSUFBSSxFQUFFQyxNQUFNLEVBQUVDLGFBQWEsQ0FBRTtRQUN2QyxJQUFJLENBQUNGLElBQUksR0FBR0E7UUFDWixJQUFJLENBQUNDLE1BQU0sR0FBR0E7UUFDZCxJQUFJLENBQUNDLGFBQWEsR0FBR0E7SUFDdkI7SUFFQUMsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDSCxJQUFJO0lBQ2xCO0lBRUFJLFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQ0gsTUFBTTtJQUNwQjtJQUVBSSxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUNILGFBQWE7SUFDM0I7SUFFQUksS0FBS0MsV0FBVyxFQUFFO1FBQ2hCLE1BQU1OLFNBQVMsSUFBSSxDQUFDQyxhQUFhO1FBRWpDSyxXQUFXLENBQUMsSUFBSSxDQUFDUCxJQUFJLENBQUMsR0FBR0M7SUFDM0I7SUFFQU8sZUFBZTtRQUNiLE1BQU1OLGdCQUFnQk8sSUFBQUEseUJBQWlCLEVBQUMsSUFBSSxDQUFDUCxhQUFhLEdBQ3BEUSxZQUFZLEdBQUcsSUFBSSxDQUFDVixJQUFJLENBQUMsQ0FBQyxFQUFFRSxlQUFlO1FBRWpELE9BQU9RO0lBQ1Q7SUFFQUMsU0FBU0MsSUFBSSxFQUFFO1FBQ2IsSUFBSUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUNiLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQ0MsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUUvRSxJQUFJLENBQUNVLE1BQU07WUFDVEMsU0FBUyxHQUFHQSxPQUFPLEdBQUcsQ0FBQztRQUN6QjtRQUVBLE9BQU9BO0lBQ1Q7SUFFQSxPQUFPQywrQkFBK0JkLElBQUksRUFBRUMsTUFBTSxFQUFFQyxhQUFhLEVBQUU7UUFDakUsSUFBSWEsYUFBYTtRQUVqQixJQUFJZCxXQUFXQyxlQUFlO1lBQzVCYSxhQUFhLElBQUloQixXQUFXQyxNQUFNQyxRQUFRQztRQUM1QztRQUVBLE9BQU9hO0lBQ1Q7QUFDRiJ9
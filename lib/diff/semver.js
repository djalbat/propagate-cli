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
        const specifier = `${this.name}@${this.releaseSemver}`;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL3NlbXZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VtdmVyRGlmZiB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHNlbXZlciwgcmVsZWFzZVNlbXZlcikge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5zZW12ZXIgPSBzZW12ZXI7XG4gICAgdGhpcy5yZWxlYXNlU2VtdmVyID0gcmVsZWFzZVNlbXZlcjtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldFNlbXZlcigpIHtcbiAgICByZXR1cm4gdGhpcy5zZW12ZXI7XG4gIH1cblxuICBnZXRSZWxlYXNlU2VtdmVyKCkge1xuICAgIHJldHVybiB0aGlzLnJlbGVhc2VTZW12ZXI7XG4gIH1cblxuICBzYXZlKHBhY2thZ2VKU09OKSB7XG4gICAgY29uc3Qgc2VtdmVyID0gdGhpcy5yZWxlYXNlU2VtdmVyO1xuXG4gICAgcGFja2FnZUpTT05bdGhpcy5uYW1lXSA9IHNlbXZlcjtcbiAgfVxuXG4gIGdldFNwZWNpZmllcigpIHtcbiAgICBjb25zdCBzcGVjaWZpZXIgPSBgJHt0aGlzLm5hbWV9QCR7dGhpcy5yZWxlYXNlU2VtdmVyfWA7XG5cbiAgICByZXR1cm4gc3BlY2lmaWVyO1xuICB9XG5cbiAgYXNTdHJpbmcobGFzdCkge1xuICAgIGxldCBzdHJpbmcgPSBgICAgICBcIiR7dGhpcy5uYW1lfVwiOiBcIiR7dGhpcy5zZW12ZXJ9XCIgLT4gXCIke3RoaXMucmVsZWFzZVNlbXZlcn1cImA7XG5cbiAgICBpZiAoIWxhc3QpIHtcbiAgICAgIHN0cmluZyA9IGAke3N0cmluZ30sXFxuYDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lU2VtdmVyQW5kUmVsZWFzZVNlbXZlcihuYW1lLCBzZW12ZXIsIHJlbGVhc2VTZW12ZXIpIHtcbiAgICBsZXQgc2VtdmVyRGlmZiA9IG51bGw7XG5cbiAgICBpZiAoc2VtdmVyICE9PSByZWxlYXNlU2VtdmVyKSB7XG4gICAgICBzZW12ZXJEaWZmID0gbmV3IFNlbXZlckRpZmYobmFtZSwgc2VtdmVyLCByZWxlYXNlU2VtdmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VtdmVyRGlmZjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlNlbXZlckRpZmYiLCJuYW1lIiwic2VtdmVyIiwicmVsZWFzZVNlbXZlciIsImdldE5hbWUiLCJnZXRTZW12ZXIiLCJnZXRSZWxlYXNlU2VtdmVyIiwic2F2ZSIsInBhY2thZ2VKU09OIiwiZ2V0U3BlY2lmaWVyIiwic3BlY2lmaWVyIiwiYXNTdHJpbmciLCJsYXN0Iiwic3RyaW5nIiwiZnJvbU5hbWVTZW12ZXJBbmRSZWxlYXNlU2VtdmVyIiwic2VtdmVyRGlmZiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBRUE7OztlQUFxQkE7OztBQUFOLE1BQU1BO0lBQ25CLFlBQVlDLElBQUksRUFBRUMsTUFBTSxFQUFFQyxhQUFhLENBQUU7UUFDdkMsSUFBSSxDQUFDRixJQUFJLEdBQUdBO1FBQ1osSUFBSSxDQUFDQyxNQUFNLEdBQUdBO1FBQ2QsSUFBSSxDQUFDQyxhQUFhLEdBQUdBO0lBQ3ZCO0lBRUFDLFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQ0gsSUFBSTtJQUNsQjtJQUVBSSxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUNILE1BQU07SUFDcEI7SUFFQUksbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDSCxhQUFhO0lBQzNCO0lBRUFJLEtBQUtDLFdBQVcsRUFBRTtRQUNoQixNQUFNTixTQUFTLElBQUksQ0FBQ0MsYUFBYTtRQUVqQ0ssV0FBVyxDQUFDLElBQUksQ0FBQ1AsSUFBSSxDQUFDLEdBQUdDO0lBQzNCO0lBRUFPLGVBQWU7UUFDYixNQUFNQyxZQUFZLEdBQUcsSUFBSSxDQUFDVCxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0UsYUFBYSxFQUFFO1FBRXRELE9BQU9PO0lBQ1Q7SUFFQUMsU0FBU0MsSUFBSSxFQUFFO1FBQ2IsSUFBSUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQ0MsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUUvRSxJQUFJLENBQUNTLE1BQU07WUFDVEMsU0FBUyxHQUFHQSxPQUFPLEdBQUcsQ0FBQztRQUN6QjtRQUVBLE9BQU9BO0lBQ1Q7SUFFQSxPQUFPQywrQkFBK0JiLElBQUksRUFBRUMsTUFBTSxFQUFFQyxhQUFhLEVBQUU7UUFDakUsSUFBSVksYUFBYTtRQUVqQixJQUFJYixXQUFXQyxlQUFlO1lBQzVCWSxhQUFhLElBQUlmLFdBQVdDLE1BQU1DLFFBQVFDO1FBQzVDO1FBRUEsT0FBT1k7SUFDVDtBQUNGIn0=
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return retrieveReleaseOperation;
    }
});
const _messages = require("../messages");
function retrieveReleaseOperation(proceed, abort, context) {
    const { subDirectoryPath, releaseMap } = context, release = releaseMap.retrieveRelease(subDirectoryPath);
    if (release === null) {
        console.log(_messages.NO_RELEASE_MESSAGE);
        abort();
        return;
    }
    const releasePublishable = release.isPublishable();
    if (!releasePublishable) {
        console.log(_messages.RELEASE_NOT_PUBLISHABLE_MESSAGE);
        abort();
        return;
    }
    Object.assign(context, {
        release
    });
    proceed();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vcmV0cmlldmVSZWxlYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBOT19SRUxFQVNFX01FU1NBR0UsIFJFTEVBU0VfTk9UX1BVQkxJU0hBQkxFX01FU1NBR0UgfSBmcm9tIFwiLi4vbWVzc2FnZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV0cmlldmVSZWxlYXNlT3BlcmF0aW9uKHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgc3ViRGlyZWN0b3J5UGF0aCwgcmVsZWFzZU1hcCB9ID0gY29udGV4dCxcbiAgICAgICAgcmVsZWFzZSA9IHJlbGVhc2VNYXAucmV0cmlldmVSZWxlYXNlKHN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gIGlmIChyZWxlYXNlID09PSBudWxsKSB7XG4gICAgY29uc29sZS5sb2coTk9fUkVMRUFTRV9NRVNTQUdFKTtcblxuICAgIGFib3J0KCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWxlYXNlUHVibGlzaGFibGUgPSByZWxlYXNlLmlzUHVibGlzaGFibGUoKTtcblxuICBpZiAoIXJlbGVhc2VQdWJsaXNoYWJsZSkge1xuICAgIGNvbnNvbGUubG9nKFJFTEVBU0VfTk9UX1BVQkxJU0hBQkxFX01FU1NBR0UpO1xuXG4gICAgYWJvcnQoKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgIHJlbGVhc2VcbiAgfSk7XG5cbiAgcHJvY2VlZCgpO1xufVxuIl0sIm5hbWVzIjpbInJldHJpZXZlUmVsZWFzZU9wZXJhdGlvbiIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJzdWJEaXJlY3RvcnlQYXRoIiwicmVsZWFzZU1hcCIsInJlbGVhc2UiLCJyZXRyaWV2ZVJlbGVhc2UiLCJjb25zb2xlIiwibG9nIiwiTk9fUkVMRUFTRV9NRVNTQUdFIiwicmVsZWFzZVB1Ymxpc2hhYmxlIiwiaXNQdWJsaXNoYWJsZSIsIlJFTEVBU0VfTk9UX1BVQkxJU0hBQkxFX01FU1NBR0UiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQUlBOzs7ZUFBd0JBOzs7MEJBRjRDO0FBRXJELFNBQVNBLHlCQUF5QkMsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDdEUsTUFBTSxFQUFFQyxnQkFBZ0IsRUFBRUMsVUFBVSxFQUFFLEdBQUdGLFNBQ25DRyxVQUFVRCxXQUFXRSxlQUFlLENBQUNIO0lBRTNDLElBQUlFLFlBQVksTUFBTTtRQUNwQkUsUUFBUUMsR0FBRyxDQUFDQyw0QkFBa0I7UUFFOUJSO1FBRUE7SUFDRjtJQUVBLE1BQU1TLHFCQUFxQkwsUUFBUU0sYUFBYTtJQUVoRCxJQUFJLENBQUNELG9CQUFvQjtRQUN2QkgsUUFBUUMsR0FBRyxDQUFDSSx5Q0FBK0I7UUFFM0NYO1FBRUE7SUFDRjtJQUVBWSxPQUFPQyxNQUFNLENBQUNaLFNBQVM7UUFDckJHO0lBQ0Y7SUFFQUw7QUFDRiJ9
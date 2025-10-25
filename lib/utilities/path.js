"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "absolutePathFromName", {
    enumerable: true,
    get: function() {
        return absolutePathFromName;
    }
});
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function absolutePathFromName(name) {
    var currentWorkingDirectoryPath = process.cwd(), absolutePath = _path.default.join(currentWorkingDirectoryPath, name);
    return absolutePath;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvcGF0aC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFic29sdXRlUGF0aEZyb21OYW1lKG5hbWUpIHtcbiAgY29uc3QgY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoID0gcHJvY2Vzcy5jd2QoKSwgLy8vXG4gICAgICAgIGFic29sdXRlUGF0aCA9IHBhdGguam9pbihjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGgsIG5hbWUpO1xuXG4gIHJldHVybiBhYnNvbHV0ZVBhdGg7XG59XG4iXSwibmFtZXMiOlsiYWJzb2x1dGVQYXRoRnJvbU5hbWUiLCJuYW1lIiwiY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoIiwicHJvY2VzcyIsImN3ZCIsImFic29sdXRlUGF0aCIsInBhdGgiLCJqb2luIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFJZ0JBOzs7ZUFBQUE7OzsyREFGQzs7Ozs7O0FBRVYsU0FBU0EscUJBQXFCQyxJQUFJO0lBQ3ZDLElBQU1DLDhCQUE4QkMsUUFBUUMsR0FBRyxJQUN6Q0MsZUFBZUMsYUFBSSxDQUFDQyxJQUFJLENBQUNMLDZCQUE2QkQ7SUFFNUQsT0FBT0k7QUFDVCJ9
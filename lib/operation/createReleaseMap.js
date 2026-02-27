"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return createReleaseMapOperation;
    }
});
const _releaseMap = /*#__PURE__*/ _interop_require_default(require("../releaseMap"));
const _configuration = require("../configuration");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createReleaseMapOperation(proceed, abort, context) {
    const { subDirectoryMap, subDirectoryName } = context, ignoredDependencies = (0, _configuration.retrieveIgnoredDependencies)(), releaseMap = _releaseMap.default.fromSubDirectoryMapSubDirectoryNameAndIgnoredDependencies(subDirectoryMap, subDirectoryName, ignoredDependencies);
    Object.assign(context, {
        releaseMap
    });
    proceed();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vY3JlYXRlUmVsZWFzZU1hcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IFJlbGVhc2VNYXAgZnJvbSBcIi4uL3JlbGVhc2VNYXBcIlxuXG5pbXBvcnQgeyByZXRyaWV2ZUlnbm9yZWREZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi4vY29uZmlndXJhdGlvblwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVJlbGVhc2VNYXBPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBzdWJEaXJlY3RvcnlNYXAsIHN1YkRpcmVjdG9yeU5hbWUgfSA9IGNvbnRleHQsXG4gICAgICAgIGlnbm9yZWREZXBlbmRlbmNpZXMgPSByZXRyaWV2ZUlnbm9yZWREZXBlbmRlbmNpZXMoKSxcbiAgICAgICAgcmVsZWFzZU1hcCA9IFJlbGVhc2VNYXAuZnJvbVN1YkRpcmVjdG9yeU1hcFN1YkRpcmVjdG9yeU5hbWVBbmRJZ25vcmVkRGVwZW5kZW5jaWVzKHN1YkRpcmVjdG9yeU1hcCwgc3ViRGlyZWN0b3J5TmFtZSwgaWdub3JlZERlcGVuZGVuY2llcyk7XG5cbiAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgcmVsZWFzZU1hcFxuICB9KTtcblxuICBwcm9jZWVkKCk7XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlUmVsZWFzZU1hcE9wZXJhdGlvbiIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJzdWJEaXJlY3RvcnlNYXAiLCJzdWJEaXJlY3RvcnlOYW1lIiwiaWdub3JlZERlcGVuZGVuY2llcyIsInJldHJpZXZlSWdub3JlZERlcGVuZGVuY2llcyIsInJlbGVhc2VNYXAiLCJSZWxlYXNlTWFwIiwiZnJvbVN1YkRpcmVjdG9yeU1hcFN1YkRpcmVjdG9yeU5hbWVBbmRJZ25vcmVkRGVwZW5kZW5jaWVzIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFNQTs7O2VBQXdCQTs7O21FQUpEOytCQUVxQjs7Ozs7O0FBRTdCLFNBQVNBLDBCQUEwQkMsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDdkUsTUFBTSxFQUFFQyxlQUFlLEVBQUVDLGdCQUFnQixFQUFFLEdBQUdGLFNBQ3hDRyxzQkFBc0JDLElBQUFBLDBDQUEyQixLQUNqREMsYUFBYUMsbUJBQVUsQ0FBQ0MseURBQXlELENBQUNOLGlCQUFpQkMsa0JBQWtCQztJQUUzSEssT0FBT0MsTUFBTSxDQUFDVCxTQUFTO1FBQ3JCSztJQUNGO0lBRUFQO0FBQ0YifQ==
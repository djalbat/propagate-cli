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
var _releaseMap = /*#__PURE__*/ _interop_require_default(require("../releaseMap"));
var _configuration = require("../configuration");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createReleaseMapOperation(proceed, abort, context) {
    var subDirectoryMap = context.subDirectoryMap, ignoredDependencies = (0, _configuration.retrieveIgnoredDependencies)(), releaseMap = _releaseMap.default.fromSubDirectoryMapAndIgnoredDependencies(subDirectoryMap, ignoredDependencies);
    Object.assign(context, {
        releaseMap: releaseMap
    });
    proceed();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vY3JlYXRlUmVsZWFzZU1hcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IFJlbGVhc2VNYXAgZnJvbSBcIi4uL3JlbGVhc2VNYXBcIlxuXG5pbXBvcnQgeyByZXRyaWV2ZUlnbm9yZWREZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi4vY29uZmlndXJhdGlvblwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVJlbGVhc2VNYXBPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBzdWJEaXJlY3RvcnlNYXAgfSA9IGNvbnRleHQsXG4gICAgICAgIGlnbm9yZWREZXBlbmRlbmNpZXMgPSByZXRyaWV2ZUlnbm9yZWREZXBlbmRlbmNpZXMoKSxcbiAgICAgICAgcmVsZWFzZU1hcCA9IFJlbGVhc2VNYXAuZnJvbVN1YkRpcmVjdG9yeU1hcEFuZElnbm9yZWREZXBlbmRlbmNpZXMoc3ViRGlyZWN0b3J5TWFwLCBpZ25vcmVkRGVwZW5kZW5jaWVzKTtcblxuICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICByZWxlYXNlTWFwXG4gIH0pO1xuXG4gIHByb2NlZWQoKTtcbn1cbiJdLCJuYW1lcyI6WyJjcmVhdGVSZWxlYXNlTWFwT3BlcmF0aW9uIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsInN1YkRpcmVjdG9yeU1hcCIsImlnbm9yZWREZXBlbmRlbmNpZXMiLCJyZXRyaWV2ZUlnbm9yZWREZXBlbmRlbmNpZXMiLCJyZWxlYXNlTWFwIiwiUmVsZWFzZU1hcCIsImZyb21TdWJEaXJlY3RvcnlNYXBBbmRJZ25vcmVkRGVwZW5kZW5jaWVzIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFNQTs7O2VBQXdCQTs7O2lFQUpEOzZCQUVxQjs7Ozs7O0FBRTdCLFNBQVNBLDBCQUEwQkMsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDdkUsSUFBTSxBQUFFQyxrQkFBb0JELFFBQXBCQyxpQkFDRkMsc0JBQXNCQyxJQUFBQSwwQ0FBMkIsS0FDakRDLGFBQWFDLG1CQUFVLENBQUNDLHlDQUF5QyxDQUFDTCxpQkFBaUJDO0lBRXpGSyxPQUFPQyxNQUFNLENBQUNSLFNBQVM7UUFDckJJLFlBQUFBO0lBQ0Y7SUFFQU47QUFDRiJ9
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return saveAndApplyDiffOperation;
    }
});
var _git = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/git"));
var _save = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/save"));
var _build = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/build"));
var _install = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/install"));
var _publish = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/publish"));
var _constants = require("../constants");
var _operation = require("../utilities/operation");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function saveAndApplyDiffOperation(diff, proceed, abort, context) {
    var diffs = context.diffs, index = diffs.indexOf(diff);
    if (index > 0) {
        var dependencyMapDiffEmpty = diff.isDependencyMapDiffEmpty(), devDependencyMapDiffEmpty = diff.isDevDependencyMapDiffEmpty();
        if (dependencyMapDiffEmpty && devDependencyMapDiffEmpty) {
            proceed();
            return;
        }
    }
    Object.assign(context, {
        diff: diff
    });
    var operations = [
        _save.default,
        _install.default,
        _build.default,
        _git.default,
        _publish.default
    ];
    console.log(_constants.EMPTY_STRING);
    (0, _operation.executeOperations)(operations, function(completed) {
        delete context.diff;
        proceed();
    }, context);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vc2F2ZUFuZEFwcGx5RGlmZi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGdpdFByb21wdE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3Byb21wdC9naXRcIjtcbmltcG9ydCBzYXZlUHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L3NhdmVcIjtcbmltcG9ydCBidWlsZFByb21wdE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3Byb21wdC9idWlsZFwiO1xuaW1wb3J0IGluc3RhbGxQcm9tcHRPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9wcm9tcHQvaW5zdGFsbFwiO1xuaW1wb3J0IHB1Ymxpc2hQcm9tcHRPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9wcm9tcHQvcHVibGlzaFwiO1xuXG5pbXBvcnQgeyBFTVBUWV9TVFJJTkcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBleGVjdXRlT3BlcmF0aW9ucyB9IGZyb20gXCIuLi91dGlsaXRpZXMvb3BlcmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhdmVBbmRBcHBseURpZmZPcGVyYXRpb24oZGlmZiwgcHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBkaWZmcyB9ID0gY29udGV4dCxcbiAgICAgICAgaW5kZXggPSBkaWZmcy5pbmRleE9mKGRpZmYpO1xuXG4gIGlmIChpbmRleCA+IDApIHtcbiAgICBjb25zdCBkZXBlbmRlbmN5TWFwRGlmZkVtcHR5ID0gZGlmZi5pc0RlcGVuZGVuY3lNYXBEaWZmRW1wdHkoKSxcbiAgICAgICAgICBkZXZEZXBlbmRlbmN5TWFwRGlmZkVtcHR5ID0gZGlmZi5pc0RldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkoKTtcblxuICAgIGlmIChkZXBlbmRlbmN5TWFwRGlmZkVtcHR5ICYmIGRldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkpIHtcbiAgICAgIHByb2NlZWQoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgIGRpZmZcbiAgfSk7XG5cbiAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICAgICAgICBzYXZlUHJvbXB0T3BlcmF0aW9uLFxuICAgICAgICAgIGluc3RhbGxQcm9tcHRPcGVyYXRpb24sXG4gICAgICAgICAgYnVpbGRQcm9tcHRPcGVyYXRpb24sXG4gICAgICAgICAgZ2l0UHJvbXB0T3BlcmF0aW9uLFxuICAgICAgICAgIHB1Ymxpc2hQcm9tcHRPcGVyYXRpb25cbiAgICAgICAgXTtcblxuICBjb25zb2xlLmxvZyhFTVBUWV9TVFJJTkcpO1xuXG4gIGV4ZWN1dGVPcGVyYXRpb25zKG9wZXJhdGlvbnMsIChjb21wbGV0ZWQpID0+IHtcbiAgICBkZWxldGUgY29udGV4dC5kaWZmO1xuXG4gICAgcHJvY2VlZCgpO1xuICB9LCBjb250ZXh0KTtcbn1cbiJdLCJuYW1lcyI6WyJzYXZlQW5kQXBwbHlEaWZmT3BlcmF0aW9uIiwiZGlmZiIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJkaWZmcyIsImluZGV4IiwiaW5kZXhPZiIsImRlcGVuZGVuY3lNYXBEaWZmRW1wdHkiLCJpc0RlcGVuZGVuY3lNYXBEaWZmRW1wdHkiLCJkZXZEZXBlbmRlbmN5TWFwRGlmZkVtcHR5IiwiaXNEZXZEZXBlbmRlbmN5TWFwRGlmZkVtcHR5IiwiT2JqZWN0IiwiYXNzaWduIiwib3BlcmF0aW9ucyIsInNhdmVQcm9tcHRPcGVyYXRpb24iLCJpbnN0YWxsUHJvbXB0T3BlcmF0aW9uIiwiYnVpbGRQcm9tcHRPcGVyYXRpb24iLCJnaXRQcm9tcHRPcGVyYXRpb24iLCJwdWJsaXNoUHJvbXB0T3BlcmF0aW9uIiwiY29uc29sZSIsImxvZyIsIkVNUFRZX1NUUklORyIsImV4ZWN1dGVPcGVyYXRpb25zIiwiY29tcGxldGVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFXQTs7O2VBQXdCQTs7OzBEQVRPOzJEQUNDOzREQUNDOzhEQUNFOzhEQUNBO3lCQUVOO3lCQUNLOzs7Ozs7QUFFbkIsU0FBU0EsMEJBQTBCQyxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxPQUFPO0lBQzdFLElBQU0sQUFBRUMsUUFBVUQsUUFBVkMsT0FDRkMsUUFBUUQsTUFBTUUsT0FBTyxDQUFDTjtJQUU1QixJQUFJSyxRQUFRLEdBQUc7UUFDYixJQUFNRSx5QkFBeUJQLEtBQUtRLHdCQUF3QixJQUN0REMsNEJBQTRCVCxLQUFLVSwyQkFBMkI7UUFFbEUsSUFBSUgsMEJBQTBCRSwyQkFBMkI7WUFDdkRSO1lBRUE7UUFDRjtJQUNGO0lBRUFVLE9BQU9DLE1BQU0sQ0FBQ1QsU0FBUztRQUNyQkgsTUFBQUE7SUFDRjtJQUVBLElBQU1hLGFBQWE7UUFDWEMsYUFBbUI7UUFDbkJDLGdCQUFzQjtRQUN0QkMsY0FBb0I7UUFDcEJDLFlBQWtCO1FBQ2xCQyxnQkFBc0I7S0FDdkI7SUFFUEMsUUFBUUMsR0FBRyxDQUFDQyx1QkFBWTtJQUV4QkMsSUFBQUEsNEJBQWlCLEVBQUNULFlBQVksU0FBQ1U7UUFDN0IsT0FBT3BCLFFBQVFILElBQUk7UUFFbkJDO0lBQ0YsR0FBR0U7QUFDTCJ9
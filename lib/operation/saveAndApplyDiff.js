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
var _poll = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/poll"));
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
        _poll.default,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vc2F2ZUFuZEFwcGx5RGlmZi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGdpdFByb21wdE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3Byb21wdC9naXRcIjtcbmltcG9ydCBwb2xsUHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L3BvbGxcIjtcbmltcG9ydCBzYXZlUHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L3NhdmVcIjtcbmltcG9ydCBidWlsZFByb21wdE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3Byb21wdC9idWlsZFwiO1xuaW1wb3J0IGluc3RhbGxQcm9tcHRPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9wcm9tcHQvaW5zdGFsbFwiO1xuaW1wb3J0IHB1Ymxpc2hQcm9tcHRPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9wcm9tcHQvcHVibGlzaFwiO1xuXG5pbXBvcnQgeyBFTVBUWV9TVFJJTkcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBleGVjdXRlT3BlcmF0aW9ucyB9IGZyb20gXCIuLi91dGlsaXRpZXMvb3BlcmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhdmVBbmRBcHBseURpZmZPcGVyYXRpb24oZGlmZiwgcHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBkaWZmcyB9ID0gY29udGV4dCxcbiAgICAgICAgaW5kZXggPSBkaWZmcy5pbmRleE9mKGRpZmYpO1xuXG4gIGlmIChpbmRleCA+IDApIHtcbiAgICBjb25zdCBkZXBlbmRlbmN5TWFwRGlmZkVtcHR5ID0gZGlmZi5pc0RlcGVuZGVuY3lNYXBEaWZmRW1wdHkoKSxcbiAgICAgICAgICBkZXZEZXBlbmRlbmN5TWFwRGlmZkVtcHR5ID0gZGlmZi5pc0RldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkoKTtcblxuICAgIGlmIChkZXBlbmRlbmN5TWFwRGlmZkVtcHR5ICYmIGRldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkpIHtcbiAgICAgIHByb2NlZWQoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgIGRpZmZcbiAgfSk7XG5cbiAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICBzYXZlUHJvbXB0T3BlcmF0aW9uLFxuICAgIHBvbGxQcm9tcHRPcGVyYXRpb24sXG4gICAgaW5zdGFsbFByb21wdE9wZXJhdGlvbixcbiAgICBidWlsZFByb21wdE9wZXJhdGlvbixcbiAgICBnaXRQcm9tcHRPcGVyYXRpb24sXG4gICAgcHVibGlzaFByb21wdE9wZXJhdGlvblxuICBdO1xuXG4gIGNvbnNvbGUubG9nKEVNUFRZX1NUUklORyk7XG5cbiAgZXhlY3V0ZU9wZXJhdGlvbnMob3BlcmF0aW9ucywgKGNvbXBsZXRlZCkgPT4ge1xuICAgIGRlbGV0ZSBjb250ZXh0LmRpZmY7XG5cbiAgICBwcm9jZWVkKCk7XG4gIH0sIGNvbnRleHQpO1xufVxuIl0sIm5hbWVzIjpbInNhdmVBbmRBcHBseURpZmZPcGVyYXRpb24iLCJkaWZmIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsImRpZmZzIiwiaW5kZXgiLCJpbmRleE9mIiwiZGVwZW5kZW5jeU1hcERpZmZFbXB0eSIsImlzRGVwZW5kZW5jeU1hcERpZmZFbXB0eSIsImRldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkiLCJpc0RldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkiLCJPYmplY3QiLCJhc3NpZ24iLCJvcGVyYXRpb25zIiwic2F2ZVByb21wdE9wZXJhdGlvbiIsInBvbGxQcm9tcHRPcGVyYXRpb24iLCJpbnN0YWxsUHJvbXB0T3BlcmF0aW9uIiwiYnVpbGRQcm9tcHRPcGVyYXRpb24iLCJnaXRQcm9tcHRPcGVyYXRpb24iLCJwdWJsaXNoUHJvbXB0T3BlcmF0aW9uIiwiY29uc29sZSIsImxvZyIsIkVNUFRZX1NUUklORyIsImV4ZWN1dGVPcGVyYXRpb25zIiwiY29tcGxldGVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFZQTs7O2VBQXdCQTs7OzBEQVZPOzJEQUNDOzJEQUNBOzREQUNDOzhEQUNFOzhEQUNBO3lCQUVOO3lCQUNLOzs7Ozs7QUFFbkIsU0FBU0EsMEJBQTBCQyxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxPQUFPO0lBQzdFLElBQU0sQUFBRUMsUUFBVUQsUUFBVkMsT0FDRkMsUUFBUUQsTUFBTUUsT0FBTyxDQUFDTjtJQUU1QixJQUFJSyxRQUFRLEdBQUc7UUFDYixJQUFNRSx5QkFBeUJQLEtBQUtRLHdCQUF3QixJQUN0REMsNEJBQTRCVCxLQUFLVSwyQkFBMkI7UUFFbEUsSUFBSUgsMEJBQTBCRSwyQkFBMkI7WUFDdkRSO1lBRUE7UUFDRjtJQUNGO0lBRUFVLE9BQU9DLE1BQU0sQ0FBQ1QsU0FBUztRQUNyQkgsTUFBQUE7SUFDRjtJQUVBLElBQU1hLGFBQWE7UUFDakJDLGFBQW1CO1FBQ25CQyxhQUFtQjtRQUNuQkMsZ0JBQXNCO1FBQ3RCQyxjQUFvQjtRQUNwQkMsWUFBa0I7UUFDbEJDLGdCQUFzQjtLQUN2QjtJQUVEQyxRQUFRQyxHQUFHLENBQUNDLHVCQUFZO0lBRXhCQyxJQUFBQSw0QkFBaUIsRUFBQ1YsWUFBWSxTQUFDVztRQUM3QixPQUFPckIsUUFBUUgsSUFBSTtRQUVuQkM7SUFDRixHQUFHRTtBQUNMIn0=
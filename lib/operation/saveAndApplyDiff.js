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
const _git = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/git"));
const _poll = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/poll"));
const _save = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/save"));
const _build = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/build"));
const _install = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/install"));
const _publish = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/publish"));
const _constants = require("../constants");
const _operation = require("../utilities/operation");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function saveAndApplyDiffOperation(diff, proceed, abort, context) {
    const { diffs } = context, index = diffs.indexOf(diff);
    if (index > 0) {
        const dependencyMapDiffEmpty = diff.isDependencyMapDiffEmpty(), devDependencyMapDiffEmpty = diff.isDevDependencyMapDiffEmpty();
        if (dependencyMapDiffEmpty && devDependencyMapDiffEmpty) {
            proceed();
            return;
        }
    }
    Object.assign(context, {
        diff
    });
    const operations = [
        _save.default,
        _poll.default,
        _install.default,
        _build.default,
        _git.default,
        _publish.default
    ];
    console.log(_constants.EMPTY_STRING);
    (0, _operation.executeOperations)(operations, (completed)=>{
        delete context.diff;
        completed ? proceed() : abort();
    }, context);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vc2F2ZUFuZEFwcGx5RGlmZi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGdpdFByb21wdE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3Byb21wdC9naXRcIjtcbmltcG9ydCBwb2xsUHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L3BvbGxcIjtcbmltcG9ydCBzYXZlUHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L3NhdmVcIjtcbmltcG9ydCBidWlsZFByb21wdE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3Byb21wdC9idWlsZFwiO1xuaW1wb3J0IGluc3RhbGxQcm9tcHRPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9wcm9tcHQvaW5zdGFsbFwiO1xuaW1wb3J0IHB1Ymxpc2hQcm9tcHRPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9wcm9tcHQvcHVibGlzaFwiO1xuXG5pbXBvcnQgeyBFTVBUWV9TVFJJTkcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBleGVjdXRlT3BlcmF0aW9ucyB9IGZyb20gXCIuLi91dGlsaXRpZXMvb3BlcmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhdmVBbmRBcHBseURpZmZPcGVyYXRpb24oZGlmZiwgcHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBkaWZmcyB9ID0gY29udGV4dCxcbiAgICAgICAgaW5kZXggPSBkaWZmcy5pbmRleE9mKGRpZmYpO1xuXG4gIGlmIChpbmRleCA+IDApIHtcbiAgICBjb25zdCBkZXBlbmRlbmN5TWFwRGlmZkVtcHR5ID0gZGlmZi5pc0RlcGVuZGVuY3lNYXBEaWZmRW1wdHkoKSxcbiAgICAgICAgICBkZXZEZXBlbmRlbmN5TWFwRGlmZkVtcHR5ID0gZGlmZi5pc0RldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkoKTtcblxuICAgIGlmIChkZXBlbmRlbmN5TWFwRGlmZkVtcHR5ICYmIGRldkRlcGVuZGVuY3lNYXBEaWZmRW1wdHkpIHtcbiAgICAgIHByb2NlZWQoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgIGRpZmZcbiAgfSk7XG5cbiAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICBzYXZlUHJvbXB0T3BlcmF0aW9uLFxuICAgIHBvbGxQcm9tcHRPcGVyYXRpb24sXG4gICAgaW5zdGFsbFByb21wdE9wZXJhdGlvbixcbiAgICBidWlsZFByb21wdE9wZXJhdGlvbixcbiAgICBnaXRQcm9tcHRPcGVyYXRpb24sXG4gICAgcHVibGlzaFByb21wdE9wZXJhdGlvblxuICBdO1xuXG4gIGNvbnNvbGUubG9nKEVNUFRZX1NUUklORyk7XG5cbiAgZXhlY3V0ZU9wZXJhdGlvbnMob3BlcmF0aW9ucywgKGNvbXBsZXRlZCkgPT4ge1xuICAgIGRlbGV0ZSBjb250ZXh0LmRpZmY7XG5cbiAgICBjb21wbGV0ZWQgP1xuICAgICAgcHJvY2VlZCgpIDpcbiAgICAgICAgYWJvcnQoKTtcbiAgfSwgY29udGV4dCk7XG59XG4iXSwibmFtZXMiOlsic2F2ZUFuZEFwcGx5RGlmZk9wZXJhdGlvbiIsImRpZmYiLCJwcm9jZWVkIiwiYWJvcnQiLCJjb250ZXh0IiwiZGlmZnMiLCJpbmRleCIsImluZGV4T2YiLCJkZXBlbmRlbmN5TWFwRGlmZkVtcHR5IiwiaXNEZXBlbmRlbmN5TWFwRGlmZkVtcHR5IiwiZGV2RGVwZW5kZW5jeU1hcERpZmZFbXB0eSIsImlzRGV2RGVwZW5kZW5jeU1hcERpZmZFbXB0eSIsIk9iamVjdCIsImFzc2lnbiIsIm9wZXJhdGlvbnMiLCJzYXZlUHJvbXB0T3BlcmF0aW9uIiwicG9sbFByb21wdE9wZXJhdGlvbiIsImluc3RhbGxQcm9tcHRPcGVyYXRpb24iLCJidWlsZFByb21wdE9wZXJhdGlvbiIsImdpdFByb21wdE9wZXJhdGlvbiIsInB1Ymxpc2hQcm9tcHRPcGVyYXRpb24iLCJjb25zb2xlIiwibG9nIiwiRU1QVFlfU1RSSU5HIiwiZXhlY3V0ZU9wZXJhdGlvbnMiLCJjb21wbGV0ZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQVlBOzs7ZUFBd0JBOzs7NERBVk87NkRBQ0M7NkRBQ0E7OERBQ0M7Z0VBQ0U7Z0VBQ0E7MkJBRU47MkJBQ0s7Ozs7OztBQUVuQixTQUFTQSwwQkFBMEJDLElBQUksRUFBRUMsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDN0UsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBR0QsU0FDWkUsUUFBUUQsTUFBTUUsT0FBTyxDQUFDTjtJQUU1QixJQUFJSyxRQUFRLEdBQUc7UUFDYixNQUFNRSx5QkFBeUJQLEtBQUtRLHdCQUF3QixJQUN0REMsNEJBQTRCVCxLQUFLVSwyQkFBMkI7UUFFbEUsSUFBSUgsMEJBQTBCRSwyQkFBMkI7WUFDdkRSO1lBRUE7UUFDRjtJQUNGO0lBRUFVLE9BQU9DLE1BQU0sQ0FBQ1QsU0FBUztRQUNyQkg7SUFDRjtJQUVBLE1BQU1hLGFBQWE7UUFDakJDLGFBQW1CO1FBQ25CQyxhQUFtQjtRQUNuQkMsZ0JBQXNCO1FBQ3RCQyxjQUFvQjtRQUNwQkMsWUFBa0I7UUFDbEJDLGdCQUFzQjtLQUN2QjtJQUVEQyxRQUFRQyxHQUFHLENBQUNDLHVCQUFZO0lBRXhCQyxJQUFBQSw0QkFBaUIsRUFBQ1YsWUFBWSxDQUFDVztRQUM3QixPQUFPckIsUUFBUUgsSUFBSTtRQUVuQndCLFlBQ0V2QixZQUNFQztJQUNOLEdBQUdDO0FBQ0wifQ==
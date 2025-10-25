"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return propagateAction;
    }
});
var _dryRun = /*#__PURE__*/ _interop_require_default(require("../operation/dryRun"));
var _createDiffs = /*#__PURE__*/ _interop_require_default(require("../operation/createDiffs"));
var _retrieveRelease = /*#__PURE__*/ _interop_require_default(require("../operation/retrieveRelease"));
var _createReleaseMap = /*#__PURE__*/ _interop_require_default(require("../operation/createReleaseMap"));
var _propagateRelease = /*#__PURE__*/ _interop_require_default(require("../operation/propagateRelease"));
var _saveAndApplyDiffs = /*#__PURE__*/ _interop_require_default(require("../operation/saveAndApplyDiffs"));
var _createReleaseGraph = /*#__PURE__*/ _interop_require_default(require("../operation/createReleaseGraph"));
var _checkDevDependencies = /*#__PURE__*/ _interop_require_default(require("../operation/checkDevDependencies"));
var _createSubDirectoryMap = /*#__PURE__*/ _interop_require_default(require("../operation/createSubDirectoryMap"));
var _createSubDirectoryPath = /*#__PURE__*/ _interop_require_default(require("../operation/createSubDirectoryPath"));
var _operation = require("../utilities/operation");
var _messages = require("../messages");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function propagateAction(subDirectoryName, quietly, dryRun, yes) {
    var operations = [
        _createSubDirectoryPath.default,
        _createSubDirectoryMap.default,
        _createReleaseMap.default,
        _retrieveRelease.default,
        _createReleaseGraph.default,
        _propagateRelease.default,
        _createDiffs.default,
        _dryRun.default,
        _checkDevDependencies.default,
        _saveAndApplyDiffs.default
    ], context = {
        subDirectoryName: subDirectoryName,
        quietly: quietly,
        dryRun: dryRun,
        yes: yes
    };
    (0, _operation.executeOperations)(operations, function(completed) {
        if (!completed) {
            console.log(_messages.FAILED_PROPAGATE_MESSAGE);
            return;
        }
        if (!dryRun) {
            console.log(_messages.SUCCESSFUL_PROPAGATE_MESSAGE);
        }
    }, context);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vcHJvcGFnYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZHJ5UnVuT3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vZHJ5UnVuXCI7XG5pbXBvcnQgY3JlYXRlRGlmZnNPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9jcmVhdGVEaWZmc1wiO1xuaW1wb3J0IHJldHJpZXZlUmVsZWFzZU9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3JldHJpZXZlUmVsZWFzZVwiO1xuaW1wb3J0IGNyZWF0ZVJlbGVhc2VNYXBPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9jcmVhdGVSZWxlYXNlTWFwXCI7XG5pbXBvcnQgcHJvcGFnYXRlUmVsZWFzZU9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3Byb3BhZ2F0ZVJlbGVhc2VcIjtcbmltcG9ydCBzYXZlQW5kQXBwbHlEaWZmc09wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3NhdmVBbmRBcHBseURpZmZzXCI7XG5pbXBvcnQgY3JlYXRlUmVsZWFzZUdyYXBoT3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vY3JlYXRlUmVsZWFzZUdyYXBoXCI7XG5pbXBvcnQgY2hlY2tEZXZEZXBlbmRlbmNpZXNPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9jaGVja0RldkRlcGVuZGVuY2llc1wiO1xuaW1wb3J0IGNyZWF0ZVN1YkRpcmVjdG9yeU1hcE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2NyZWF0ZVN1YkRpcmVjdG9yeU1hcFwiO1xuaW1wb3J0IGNyZWF0ZVN1YkRpcmVjdG9yeVBhdGhPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9jcmVhdGVTdWJEaXJlY3RvcnlQYXRoXCI7XG5cbmltcG9ydCB7IGV4ZWN1dGVPcGVyYXRpb25zIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9vcGVyYXRpb25cIjtcbmltcG9ydCB7IEZBSUxFRF9QUk9QQUdBVEVfTUVTU0FHRSwgU1VDQ0VTU0ZVTF9QUk9QQUdBVEVfTUVTU0FHRSB9IGZyb20gXCIuLi9tZXNzYWdlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcm9wYWdhdGVBY3Rpb24oc3ViRGlyZWN0b3J5TmFtZSwgcXVpZXRseSwgZHJ5UnVuLCB5ZXMpIHtcbiAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICAgICAgICBjcmVhdGVTdWJEaXJlY3RvcnlQYXRoT3BlcmF0aW9uLFxuICAgICAgICAgIGNyZWF0ZVN1YkRpcmVjdG9yeU1hcE9wZXJhdGlvbixcbiAgICAgICAgICBjcmVhdGVSZWxlYXNlTWFwT3BlcmF0aW9uLFxuICAgICAgICAgIHJldHJpZXZlUmVsZWFzZU9wZXJhdGlvbixcbiAgICAgICAgICBjcmVhdGVSZWxlYXNlR3JhcGhPcGVyYXRpb24sXG4gICAgICAgICAgcHJvcGFnYXRlUmVsZWFzZU9wZXJhdGlvbixcbiAgICAgICAgICBjcmVhdGVEaWZmc09wZXJhdGlvbixcbiAgICAgICAgICBkcnlSdW5PcGVyYXRpb24sXG4gICAgICAgICAgY2hlY2tEZXZEZXBlbmRlbmNpZXNPcGVyYXRpb24sXG4gICAgICAgICAgc2F2ZUFuZEFwcGx5RGlmZnNPcGVyYXRpb25cbiAgICAgICAgXSxcbiAgICAgICAgY29udGV4dCA9IHtcbiAgICAgICAgICBzdWJEaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIHF1aWV0bHksXG4gICAgICAgICAgZHJ5UnVuLFxuICAgICAgICAgIHllc1xuICAgICAgICB9O1xuXG4gIGV4ZWN1dGVPcGVyYXRpb25zKG9wZXJhdGlvbnMsIChjb21wbGV0ZWQpID0+IHtcbiAgICBpZiAoIWNvbXBsZXRlZCkge1xuICAgICAgY29uc29sZS5sb2coRkFJTEVEX1BST1BBR0FURV9NRVNTQUdFKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZHJ5UnVuKSB7XG4gICAgICBjb25zb2xlLmxvZyhTVUNDRVNTRlVMX1BST1BBR0FURV9NRVNTQUdFKTtcbiAgICB9XG4gIH0sIGNvbnRleHQpO1xufVxuIl0sIm5hbWVzIjpbInByb3BhZ2F0ZUFjdGlvbiIsInN1YkRpcmVjdG9yeU5hbWUiLCJxdWlldGx5IiwiZHJ5UnVuIiwieWVzIiwib3BlcmF0aW9ucyIsImNyZWF0ZVN1YkRpcmVjdG9yeVBhdGhPcGVyYXRpb24iLCJjcmVhdGVTdWJEaXJlY3RvcnlNYXBPcGVyYXRpb24iLCJjcmVhdGVSZWxlYXNlTWFwT3BlcmF0aW9uIiwicmV0cmlldmVSZWxlYXNlT3BlcmF0aW9uIiwiY3JlYXRlUmVsZWFzZUdyYXBoT3BlcmF0aW9uIiwicHJvcGFnYXRlUmVsZWFzZU9wZXJhdGlvbiIsImNyZWF0ZURpZmZzT3BlcmF0aW9uIiwiZHJ5UnVuT3BlcmF0aW9uIiwiY2hlY2tEZXZEZXBlbmRlbmNpZXNPcGVyYXRpb24iLCJzYXZlQW5kQXBwbHlEaWZmc09wZXJhdGlvbiIsImNvbnRleHQiLCJleGVjdXRlT3BlcmF0aW9ucyIsImNvbXBsZXRlZCIsImNvbnNvbGUiLCJsb2ciLCJGQUlMRURfUFJPUEFHQVRFX01FU1NBR0UiLCJTVUNDRVNTRlVMX1BST1BBR0FURV9NRVNTQUdFIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFnQkE7OztlQUF3QkE7Ozs2REFkSTtrRUFDSztzRUFDSTt1RUFDQzt1RUFDQTt3RUFDQzt5RUFDQzsyRUFDRTs0RUFDQzs2RUFDQzt5QkFFVjt3QkFDcUM7Ozs7OztBQUV4RCxTQUFTQSxnQkFBZ0JDLGdCQUFnQixFQUFFQyxPQUFPLEVBQUVDLE1BQU0sRUFBRUMsR0FBRztJQUM1RSxJQUFNQyxhQUFhO1FBQ1hDLCtCQUErQjtRQUMvQkMsOEJBQThCO1FBQzlCQyx5QkFBeUI7UUFDekJDLHdCQUF3QjtRQUN4QkMsMkJBQTJCO1FBQzNCQyx5QkFBeUI7UUFDekJDLG9CQUFvQjtRQUNwQkMsZUFBZTtRQUNmQyw2QkFBNkI7UUFDN0JDLDBCQUEwQjtLQUMzQixFQUNEQyxVQUFVO1FBQ1JmLGtCQUFBQTtRQUNBQyxTQUFBQTtRQUNBQyxRQUFBQTtRQUNBQyxLQUFBQTtJQUNGO0lBRU5hLElBQUFBLDRCQUFpQixFQUFDWixZQUFZLFNBQUNhO1FBQzdCLElBQUksQ0FBQ0EsV0FBVztZQUNkQyxRQUFRQyxHQUFHLENBQUNDLGtDQUF3QjtZQUVwQztRQUNGO1FBRUEsSUFBSSxDQUFDbEIsUUFBUTtZQUNYZ0IsUUFBUUMsR0FBRyxDQUFDRSxzQ0FBNEI7UUFDMUM7SUFDRixHQUFHTjtBQUNMIn0=
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return saveAndApplyDiffsOperation;
    }
});
var _saveAndApplyDiff = /*#__PURE__*/ _interop_require_default(require("../operation/saveAndApplyDiff"));
var _operation = require("../utilities/operation");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function saveAndApplyDiffsOperation(proceed, abort, context) {
    var diffs = context.diffs, dryRun = context.dryRun;
    if (dryRun) {
        proceed();
        return;
    }
    (0, _operation.executeOperation)(diffs, _saveAndApplyDiff.default, proceed, abort, context);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vc2F2ZUFuZEFwcGx5RGlmZnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBzYXZlQW5kQXBwbHlEaWZmT3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vc2F2ZUFuZEFwcGx5RGlmZlwiO1xuXG5pbXBvcnQgeyBleGVjdXRlT3BlcmF0aW9uIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9vcGVyYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2F2ZUFuZEFwcGx5RGlmZnNPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBkaWZmcywgZHJ5UnVuIH0gPSBjb250ZXh0O1xuXG4gIGlmIChkcnlSdW4pIHtcbiAgICBwcm9jZWVkKCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBleGVjdXRlT3BlcmF0aW9uKGRpZmZzLCBzYXZlQW5kQXBwbHlEaWZmT3BlcmF0aW9uLCBwcm9jZWVkLCBhYm9ydCwgY29udGV4dCk7XG59XG4iXSwibmFtZXMiOlsic2F2ZUFuZEFwcGx5RGlmZnNPcGVyYXRpb24iLCJwcm9jZWVkIiwiYWJvcnQiLCJjb250ZXh0IiwiZGlmZnMiLCJkcnlSdW4iLCJleGVjdXRlT3BlcmF0aW9uIiwic2F2ZUFuZEFwcGx5RGlmZk9wZXJhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBTUE7OztlQUF3QkE7Ozt1RUFKYzt5QkFFTDs7Ozs7O0FBRWxCLFNBQVNBLDJCQUEyQkMsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDeEUsSUFBUUMsUUFBa0JELFFBQWxCQyxPQUFPQyxTQUFXRixRQUFYRTtJQUVmLElBQUlBLFFBQVE7UUFDVko7UUFFQTtJQUNGO0lBRUFLLElBQUFBLDJCQUFnQixFQUFDRixPQUFPRyx5QkFBeUIsRUFBRU4sU0FBU0MsT0FBT0M7QUFDckUifQ==
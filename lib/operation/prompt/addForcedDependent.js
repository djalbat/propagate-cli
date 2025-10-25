"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return addForcedDependentPromptOperation;
    }
});
var _necessary = require("necessary");
var _validate = require("../../utilities/validate");
var _descriptions = require("../../descriptions");
var _messages = require("../../messages");
var prompt = _necessary.shellUtilities.prompt;
function addForcedDependentPromptOperation(proceed, abort, context) {
    var attempts = Infinity, description = _descriptions.FORCED_DEPENDENT_DESCRIPTION, errorMessage = _messages.INVALID_FORCED_DEPENDENT_NAME_MESSAGE, validationFunction = _validate.validateForcedDependentName, options = {
        attempts: attempts,
        description: description,
        errorMessage: errorMessage,
        validationFunction: validationFunction
    };
    prompt(options, function(answer) {
        var forcedDependentName = answer, valid = forcedDependentName !== null;
        if (valid) {
            var forcedDependent = forcedDependentName; ///
            Object.assign(context, {
                forcedDependent: forcedDependent
            });
            proceed();
            return;
        }
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L2FkZEZvcmNlZERlcGVuZGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgc2hlbGxVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IHZhbGlkYXRlRm9yY2VkRGVwZW5kZW50TmFtZSB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IEZPUkNFRF9ERVBFTkRFTlRfREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBJTlZBTElEX0ZPUkNFRF9ERVBFTkRFTlRfTkFNRV9NRVNTQUdFIH0gZnJvbSBcIi4uLy4uL21lc3NhZ2VzXCI7XG5cbmNvbnN0IHsgcHJvbXB0IH0gPSBzaGVsbFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkRm9yY2VkRGVwZW5kZW50UHJvbXB0T3BlcmF0aW9uKHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGNvbnN0IGF0dGVtcHRzID0gSW5maW5pdHksXG4gICAgICAgIGRlc2NyaXB0aW9uID0gRk9SQ0VEX0RFUEVOREVOVF9ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9GT1JDRURfREVQRU5ERU5UX05BTUVfTUVTU0FHRSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uID0gdmFsaWRhdGVGb3JjZWREZXBlbmRlbnROYW1lLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgYXR0ZW1wdHMsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIHZhbGlkYXRpb25GdW5jdGlvblxuICAgICAgICB9O1xuXG4gIHByb21wdChvcHRpb25zLCAoYW5zd2VyKSA9PiB7XG4gICAgY29uc3QgZm9yY2VkRGVwZW5kZW50TmFtZSA9IGFuc3dlciwgLy8vXG4gICAgICAgICAgdmFsaWQgPSAoZm9yY2VkRGVwZW5kZW50TmFtZSAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGNvbnN0IGZvcmNlZERlcGVuZGVudCA9IGZvcmNlZERlcGVuZGVudE5hbWU7ICAvLy9cblxuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIGZvcmNlZERlcGVuZGVudFxuICAgICAgfSk7XG5cbiAgICAgIHByb2NlZWQoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFib3J0KCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImFkZEZvcmNlZERlcGVuZGVudFByb21wdE9wZXJhdGlvbiIsInByb21wdCIsInNoZWxsVXRpbGl0aWVzIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsImF0dGVtcHRzIiwiSW5maW5pdHkiLCJkZXNjcmlwdGlvbiIsIkZPUkNFRF9ERVBFTkRFTlRfREVTQ1JJUFRJT04iLCJlcnJvck1lc3NhZ2UiLCJJTlZBTElEX0ZPUkNFRF9ERVBFTkRFTlRfTkFNRV9NRVNTQUdFIiwidmFsaWRhdGlvbkZ1bmN0aW9uIiwidmFsaWRhdGVGb3JjZWREZXBlbmRlbnROYW1lIiwib3B0aW9ucyIsImFuc3dlciIsImZvcmNlZERlcGVuZGVudE5hbWUiLCJ2YWxpZCIsImZvcmNlZERlcGVuZGVudCIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBVUE7OztlQUF3QkE7Ozt5QkFSTzt3QkFFYTs0QkFDQzt3QkFDUztBQUV0RCxJQUFNLEFBQUVDLFNBQVdDLHlCQUFjLENBQXpCRDtBQUVPLFNBQVNELGtDQUFrQ0csT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDL0UsSUFBTUMsV0FBV0MsVUFDWEMsY0FBY0MsMENBQTRCLEVBQzFDQyxlQUFlQywrQ0FBcUMsRUFDcERDLHFCQUFxQkMscUNBQTJCLEVBQ2hEQyxVQUFVO1FBQ1JSLFVBQUFBO1FBQ0FFLGFBQUFBO1FBQ0FFLGNBQUFBO1FBQ0FFLG9CQUFBQTtJQUNGO0lBRU5YLE9BQU9hLFNBQVMsU0FBQ0M7UUFDZixJQUFNQyxzQkFBc0JELFFBQ3RCRSxRQUFTRCx3QkFBd0I7UUFFdkMsSUFBSUMsT0FBTztZQUNULElBQU1DLGtCQUFrQkYscUJBQXNCLEdBQUc7WUFFakRHLE9BQU9DLE1BQU0sQ0FBQ2YsU0FBUztnQkFDckJhLGlCQUFBQTtZQUNGO1lBRUFmO1lBRUE7UUFDRjtRQUVBQztJQUNGO0FBQ0YifQ==
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return addDirectoryPromptOperation;
    }
});
var _necessary = require("necessary");
var _validate = require("../../utilities/validate");
var _descriptions = require("../../descriptions");
var _messages = require("../../messages");
var prompt = _necessary.shellUtilities.prompt;
function addDirectoryPromptOperation(proceed, abort, context) {
    var attempts = Infinity, description = _descriptions.DIRECTORY_PATH_DESCRIPTION, errorMessage = _messages.INVALID_DIRECTORY_PATH_MESSAGE, validationFunction = _validate.validateDirectoryPath, options = {
        attempts: attempts,
        description: description,
        errorMessage: errorMessage,
        validationFunction: validationFunction
    };
    prompt(options, function(answer) {
        var directoryPath = answer, valid = directoryPath !== null;
        if (valid) {
            var directory = directoryPath; ///
            Object.assign(context, {
                directory: directory
            });
            proceed();
            return;
        }
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L2FkZERpcmVjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgc2hlbGxVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IHZhbGlkYXRlRGlyZWN0b3J5UGF0aCB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IERJUkVDVE9SWV9QQVRIX0RFU0NSSVBUSU9OIH0gZnJvbSBcIi4uLy4uL2Rlc2NyaXB0aW9uc1wiO1xuaW1wb3J0IHsgSU5WQUxJRF9ESVJFQ1RPUllfUEFUSF9NRVNTQUdFIH0gZnJvbSBcIi4uLy4uL21lc3NhZ2VzXCI7XG5cbmNvbnN0IHsgcHJvbXB0IH0gPSBzaGVsbFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkRGlyZWN0b3J5UHJvbXB0T3BlcmF0aW9uKHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGNvbnN0IGF0dGVtcHRzID0gSW5maW5pdHksXG4gICAgICAgIGRlc2NyaXB0aW9uID0gRElSRUNUT1JZX1BBVEhfREVTQ1JJUFRJT04sXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IElOVkFMSURfRElSRUNUT1JZX1BBVEhfTUVTU0FHRSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uID0gdmFsaWRhdGVEaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgYXR0ZW1wdHMsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIHZhbGlkYXRpb25GdW5jdGlvblxuICAgICAgICB9O1xuXG4gIHByb21wdChvcHRpb25zLCAoYW5zd2VyKSA9PiB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aCA9IGFuc3dlciwgLy8vXG4gICAgICAgICAgdmFsaWQgPSAoZGlyZWN0b3J5UGF0aCAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IGRpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIGRpcmVjdG9yeVxuICAgICAgfSk7XG5cbiAgICAgIHByb2NlZWQoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFib3J0KCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImFkZERpcmVjdG9yeVByb21wdE9wZXJhdGlvbiIsInByb21wdCIsInNoZWxsVXRpbGl0aWVzIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsImF0dGVtcHRzIiwiSW5maW5pdHkiLCJkZXNjcmlwdGlvbiIsIkRJUkVDVE9SWV9QQVRIX0RFU0NSSVBUSU9OIiwiZXJyb3JNZXNzYWdlIiwiSU5WQUxJRF9ESVJFQ1RPUllfUEFUSF9NRVNTQUdFIiwidmFsaWRhdGlvbkZ1bmN0aW9uIiwidmFsaWRhdGVEaXJlY3RvcnlQYXRoIiwib3B0aW9ucyIsImFuc3dlciIsImRpcmVjdG9yeVBhdGgiLCJ2YWxpZCIsImRpcmVjdG9yeSIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBVUE7OztlQUF3QkE7Ozt5QkFSTzt3QkFFTzs0QkFDSzt3QkFDSTtBQUUvQyxJQUFNLEFBQUVDLFNBQVdDLHlCQUFjLENBQXpCRDtBQUVPLFNBQVNELDRCQUE0QkcsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDekUsSUFBTUMsV0FBV0MsVUFDWEMsY0FBY0Msd0NBQTBCLEVBQ3hDQyxlQUFlQyx3Q0FBOEIsRUFDN0NDLHFCQUFxQkMsK0JBQXFCLEVBQzFDQyxVQUFVO1FBQ1JSLFVBQUFBO1FBQ0FFLGFBQUFBO1FBQ0FFLGNBQUFBO1FBQ0FFLG9CQUFBQTtJQUNGO0lBRU5YLE9BQU9hLFNBQVMsU0FBQ0M7UUFDZixJQUFNQyxnQkFBZ0JELFFBQ2hCRSxRQUFTRCxrQkFBa0I7UUFFakMsSUFBSUMsT0FBTztZQUNULElBQU1DLFlBQVlGLGVBQWdCLEdBQUc7WUFFckNHLE9BQU9DLE1BQU0sQ0FBQ2YsU0FBUztnQkFDckJhLFdBQUFBO1lBQ0Y7WUFFQWY7WUFFQTtRQUNGO1FBRUFDO0lBQ0Y7QUFDRiJ9
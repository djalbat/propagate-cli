"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return addForcedDependencyPromptOperation;
    }
});
var _necessary = require("necessary");
var _validate = require("../../utilities/validate");
var _descriptions = require("../../descriptions");
var _messages = require("../../messages");
var prompt = _necessary.shellUtilities.prompt;
function addForcedDependencyPromptOperation(proceed, abort, context) {
    var attempts = Infinity, description = _descriptions.FORCED_DEPENDENCY_DESCRIPTION, errorMessage = _messages.INVALID_FORCED_DEPENDENCY_NAME_MESSAGE, validationFunction = _validate.validateForcedDependencyName, options = {
        attempts: attempts,
        description: description,
        errorMessage: errorMessage,
        validationFunction: validationFunction
    };
    prompt(options, function(answer) {
        var forcedDependencyName = answer, valid = forcedDependencyName !== null;
        if (valid) {
            var forcedDependency = forcedDependencyName; ///
            Object.assign(context, {
                forcedDependency: forcedDependency
            });
            proceed();
            return;
        }
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L2FkZEZvcmNlZERlcGVuZGVuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNoZWxsVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyB2YWxpZGF0ZUZvcmNlZERlcGVuZGVuY3lOYW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy92YWxpZGF0ZVwiO1xuaW1wb3J0IHsgRk9SQ0VEX0RFUEVOREVOQ1lfREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBJTlZBTElEX0ZPUkNFRF9ERVBFTkRFTkNZX05BTUVfTUVTU0FHRSB9IGZyb20gXCIuLi8uLi9tZXNzYWdlc1wiO1xuXG5jb25zdCB7IHByb21wdCB9ID0gc2hlbGxVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZEZvcmNlZERlcGVuZGVuY3lQcm9tcHRPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgYXR0ZW1wdHMgPSBJbmZpbml0eSxcbiAgICAgICAgZGVzY3JpcHRpb24gPSBGT1JDRURfREVQRU5ERU5DWV9ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9GT1JDRURfREVQRU5ERU5DWV9OQU1FX01FU1NBR0UsXG4gICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbiA9IHZhbGlkYXRlRm9yY2VkRGVwZW5kZW5jeU5hbWUsICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBhdHRlbXB0cyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uXG4gICAgICAgIH07XG5cbiAgcHJvbXB0KG9wdGlvbnMsIChhbnN3ZXIpID0+IHtcbiAgICBjb25zdCBmb3JjZWREZXBlbmRlbmN5TmFtZSA9IGFuc3dlciwgLy8vXG4gICAgICAgICAgdmFsaWQgPSAoZm9yY2VkRGVwZW5kZW5jeU5hbWUgIT09IG51bGwpO1xuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICBjb25zdCBmb3JjZWREZXBlbmRlbmN5ID0gZm9yY2VkRGVwZW5kZW5jeU5hbWU7ICAvLy9cblxuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIGZvcmNlZERlcGVuZGVuY3lcbiAgICAgIH0pO1xuXG4gICAgICBwcm9jZWVkKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhYm9ydCgpO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJhZGRGb3JjZWREZXBlbmRlbmN5UHJvbXB0T3BlcmF0aW9uIiwicHJvbXB0Iiwic2hlbGxVdGlsaXRpZXMiLCJwcm9jZWVkIiwiYWJvcnQiLCJjb250ZXh0IiwiYXR0ZW1wdHMiLCJJbmZpbml0eSIsImRlc2NyaXB0aW9uIiwiRk9SQ0VEX0RFUEVOREVOQ1lfREVTQ1JJUFRJT04iLCJlcnJvck1lc3NhZ2UiLCJJTlZBTElEX0ZPUkNFRF9ERVBFTkRFTkNZX05BTUVfTUVTU0FHRSIsInZhbGlkYXRpb25GdW5jdGlvbiIsInZhbGlkYXRlRm9yY2VkRGVwZW5kZW5jeU5hbWUiLCJvcHRpb25zIiwiYW5zd2VyIiwiZm9yY2VkRGVwZW5kZW5jeU5hbWUiLCJ2YWxpZCIsImZvcmNlZERlcGVuZGVuY3kiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQVVBOzs7ZUFBd0JBOzs7eUJBUk87d0JBRWM7NEJBQ0M7d0JBQ1M7QUFFdkQsSUFBTSxBQUFFQyxTQUFXQyx5QkFBYyxDQUF6QkQ7QUFFTyxTQUFTRCxtQ0FBbUNHLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxPQUFPO0lBQ2hGLElBQU1DLFdBQVdDLFVBQ1hDLGNBQWNDLDJDQUE2QixFQUMzQ0MsZUFBZUMsZ0RBQXNDLEVBQ3JEQyxxQkFBcUJDLHNDQUE0QixFQUNqREMsVUFBVTtRQUNSUixVQUFBQTtRQUNBRSxhQUFBQTtRQUNBRSxjQUFBQTtRQUNBRSxvQkFBQUE7SUFDRjtJQUVOWCxPQUFPYSxTQUFTLFNBQUNDO1FBQ2YsSUFBTUMsdUJBQXVCRCxRQUN2QkUsUUFBU0QseUJBQXlCO1FBRXhDLElBQUlDLE9BQU87WUFDVCxJQUFNQyxtQkFBbUJGLHNCQUF1QixHQUFHO1lBRW5ERyxPQUFPQyxNQUFNLENBQUNmLFNBQVM7Z0JBQ3JCYSxrQkFBQUE7WUFDRjtZQUVBZjtZQUVBO1FBQ0Y7UUFFQUM7SUFDRjtBQUNGIn0=
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return buildPromptOperation;
    }
});
var _necessary = require("necessary");
var _constants = require("../../constants");
var _validate = require("../../utilities/validate");
var _prompt = require("../../utilities/prompt");
var _descriptions = require("../../descriptions");
var _console = require("../../utilities/console");
var _messages = require("../../messages");
var prompt = _necessary.shellUtilities.prompt;
function buildPromptOperation(proceed, abort, context) {
    var yes = context.yes, diff = context.diff, diffs = context.diffs, quietly = context.quietly, answer = yes ? _constants.YES : null, attempts = Infinity, description = _descriptions.BUILD_YES_NO_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
        answer: answer,
        attempts: attempts,
        description: description,
        errorMessage: errorMessage,
        validationFunction: validationFunction
    };
    prompt(options, function(answer) {
        var valid = answer !== null;
        if (valid) {
            var affirmative = (0, _prompt.isAnswerAffirmative)(answer);
            if (!affirmative) {
                proceed();
                return;
            }
            diff.build(quietly, function(success) {
                if (!success) {
                    (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
                    console.log(_messages.FAILED_BUILD_MESSAGE);
                    abort();
                    return;
                }
                proceed();
            });
            return;
        }
        (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
        console.log(_messages.FAILED_BUILD_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L2J1aWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBzaGVsbFV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IHsgWUVTIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdmFsaWRhdGVBbnN3ZXIgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3ZhbGlkYXRlXCI7XG5pbXBvcnQgeyBpc0Fuc3dlckFmZmlybWF0aXZlIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9wcm9tcHRcIjtcbmltcG9ydCB7IEJVSUxEX1lFU19OT19ERVNDUklQVElPTiB9IGZyb20gXCIuLi8uLi9kZXNjcmlwdGlvbnNcIjtcbmltcG9ydCB7IGNvbnNvbGVMb2dVbnB1Ymxpc2hlZERpZmZzIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9jb25zb2xlXCI7XG5pbXBvcnQgeyBGQUlMRURfQlVJTERfTUVTU0FHRSwgSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSB9IGZyb20gXCIuLi8uLi9tZXNzYWdlc1wiO1xuXG5jb25zdCB7IHByb21wdCB9ID0gc2hlbGxVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkUHJvbXB0T3BlcmF0aW9uKHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgeWVzLCBkaWZmLCBkaWZmcywgcXVpZXRseSB9ID0gY29udGV4dCxcbiAgICAgICAgYW5zd2VyID0geWVzID9cbiAgICAgICAgICAgICAgICAgICBZRVMgOlxuICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgYXR0ZW1wdHMgPSBJbmZpbml0eSxcbiAgICAgICAgZGVzY3JpcHRpb24gPSBCVUlMRF9ZRVNfTk9fREVTQ1JJUFRJT04sXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IElOVkFMSURfQU5TV0VSX01FU1NBR0UsXG4gICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbiA9IHZhbGlkYXRlQW5zd2VyLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgYW5zd2VyLFxuICAgICAgICAgIGF0dGVtcHRzLFxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb25cbiAgICAgICAgfTtcblxuICBwcm9tcHQob3B0aW9ucywgKGFuc3dlcikgPT4ge1xuICAgIGNvbnN0IHZhbGlkID0gKGFuc3dlciAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGNvbnN0IGFmZmlybWF0aXZlID0gaXNBbnN3ZXJBZmZpcm1hdGl2ZShhbnN3ZXIpO1xuXG4gICAgICBpZiAoIWFmZmlybWF0aXZlKSB7XG4gICAgICAgIHByb2NlZWQoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRpZmYuYnVpbGQocXVpZXRseSwgKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZnMoZGlmZiwgZGlmZnMpO1xuXG4gICAgICAgICAgY29uc29sZS5sb2coRkFJTEVEX0JVSUxEX01FU1NBR0UpO1xuXG4gICAgICAgICAgYWJvcnQoKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb2NlZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZnMoZGlmZiwgZGlmZnMpO1xuXG4gICAgY29uc29sZS5sb2coRkFJTEVEX0JVSUxEX01FU1NBR0UpO1xuXG4gICAgYWJvcnQoKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsiYnVpbGRQcm9tcHRPcGVyYXRpb24iLCJwcm9tcHQiLCJzaGVsbFV0aWxpdGllcyIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJ5ZXMiLCJkaWZmIiwiZGlmZnMiLCJxdWlldGx5IiwiYW5zd2VyIiwiWUVTIiwiYXR0ZW1wdHMiLCJJbmZpbml0eSIsImRlc2NyaXB0aW9uIiwiQlVJTERfWUVTX05PX0RFU0NSSVBUSU9OIiwiZXJyb3JNZXNzYWdlIiwiSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSIsInZhbGlkYXRpb25GdW5jdGlvbiIsInZhbGlkYXRlQW5zd2VyIiwib3B0aW9ucyIsInZhbGlkIiwiYWZmaXJtYXRpdmUiLCJpc0Fuc3dlckFmZmlybWF0aXZlIiwiYnVpbGQiLCJzdWNjZXNzIiwiY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZnMiLCJjb25zb2xlIiwibG9nIiwiRkFJTEVEX0JVSUxEX01FU1NBR0UiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQWFBOzs7ZUFBd0JBOzs7eUJBWE87eUJBRVg7d0JBQ1c7c0JBQ0s7NEJBQ0s7dUJBQ0U7d0JBQ2tCO0FBRTdELElBQU0sQUFBRUMsU0FBV0MseUJBQWMsQ0FBekJEO0FBRU8sU0FBU0QscUJBQXFCRyxPQUFPLEVBQUVDLEtBQUssRUFBRUMsT0FBTztJQUNsRSxJQUFRQyxNQUE4QkQsUUFBOUJDLEtBQUtDLE9BQXlCRixRQUF6QkUsTUFBTUMsUUFBbUJILFFBQW5CRyxPQUFPQyxVQUFZSixRQUFaSSxTQUNwQkMsU0FBU0osTUFDRUssY0FBRyxHQUNELE1BQ2JDLFdBQVdDLFVBQ1hDLGNBQWNDLHNDQUF3QixFQUN0Q0MsZUFBZUMsZ0NBQXNCLEVBQ3JDQyxxQkFBcUJDLHdCQUFjLEVBQ25DQyxVQUFVO1FBQ1JWLFFBQUFBO1FBQ0FFLFVBQUFBO1FBQ0FFLGFBQUFBO1FBQ0FFLGNBQUFBO1FBQ0FFLG9CQUFBQTtJQUNGO0lBRU5qQixPQUFPbUIsU0FBUyxTQUFDVjtRQUNmLElBQU1XLFFBQVNYLFdBQVc7UUFFMUIsSUFBSVcsT0FBTztZQUNULElBQU1DLGNBQWNDLElBQUFBLDJCQUFtQixFQUFDYjtZQUV4QyxJQUFJLENBQUNZLGFBQWE7Z0JBQ2hCbkI7Z0JBRUE7WUFDRjtZQUVBSSxLQUFLaUIsS0FBSyxDQUFDZixTQUFTLFNBQUNnQjtnQkFDbkIsSUFBSSxDQUFDQSxTQUFTO29CQUNaQyxJQUFBQSxtQ0FBMEIsRUFBQ25CLE1BQU1DO29CQUVqQ21CLFFBQVFDLEdBQUcsQ0FBQ0MsOEJBQW9CO29CQUVoQ3pCO29CQUVBO2dCQUNGO2dCQUVBRDtZQUNGO1lBRUE7UUFDRjtRQUVBdUIsSUFBQUEsbUNBQTBCLEVBQUNuQixNQUFNQztRQUVqQ21CLFFBQVFDLEdBQUcsQ0FBQ0MsOEJBQW9CO1FBRWhDekI7SUFDRjtBQUNGIn0=
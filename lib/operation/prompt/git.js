"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return gitPromptOperation;
    }
});
var _necessary = require("necessary");
var _constants = require("../../constants");
var _validate = require("../../utilities/validate");
var _prompt = require("../../utilities/prompt");
var _console = require("../../utilities/console");
var _descriptions = require("../../descriptions");
var _messages = require("../../messages");
var prompt = _necessary.shellUtilities.prompt;
function gitPromptOperation(proceed, abort, context) {
    var yes = context.yes, diff = context.diff, diffs = context.diffs, quietly = context.quietly, answer = yes ? _constants.YES : null, attempts = Infinity, description = _descriptions.ADD_COMMIT_PUSH_GIT_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
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
            diff.git(quietly, function(success) {
                if (!success) {
                    (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
                    console.log(_messages.FAILED_GIT_MESSAGE);
                    abort();
                    return;
                }
                proceed();
            });
            return;
        }
        (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
        console.log(_messages.FAILED_GIT_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L2dpdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgc2hlbGxVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFlFUyB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHZhbGlkYXRlQW5zd2VyIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy92YWxpZGF0ZVwiO1xuaW1wb3J0IHsgaXNBbnN3ZXJBZmZpcm1hdGl2ZSB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvcHJvbXB0XCI7XG5pbXBvcnQgeyBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvY29uc29sZVwiO1xuaW1wb3J0IHsgQUREX0NPTU1JVF9QVVNIX0dJVF9ERVNDUklQVElPTiB9IGZyb20gXCIuLi8uLi9kZXNjcmlwdGlvbnNcIjtcbmltcG9ydCB7IEZBSUxFRF9HSVRfTUVTU0FHRSwgSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSB9IGZyb20gXCIuLi8uLi9tZXNzYWdlc1wiO1xuXG5jb25zdCB7IHByb21wdCB9ID0gc2hlbGxVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdpdFByb21wdE9wZXJhdGlvbihwcm9jZWVkLCBhYm9ydCwgY29udGV4dCkge1xuICBjb25zdCB7IHllcywgZGlmZiwgZGlmZnMsIHF1aWV0bHkgfSA9IGNvbnRleHQsXG4gICAgICAgIGFuc3dlciA9IHllcyA/XG4gICAgICAgICAgICAgICAgICAgWUVTIDpcbiAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgIGF0dGVtcHRzID0gSW5maW5pdHksXG4gICAgICAgIGRlc2NyaXB0aW9uID0gQUREX0NPTU1JVF9QVVNIX0dJVF9ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uID0gdmFsaWRhdGVBbnN3ZXIsICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBhbnN3ZXIsXG4gICAgICAgICAgYXR0ZW1wdHMsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIHZhbGlkYXRpb25GdW5jdGlvblxuICAgICAgICB9O1xuXG4gIHByb21wdChvcHRpb25zLCAoYW5zd2VyKSA9PiB7XG4gICAgY29uc3QgdmFsaWQgPSAoYW5zd2VyICE9PSBudWxsKTtcblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgY29uc3QgYWZmaXJtYXRpdmUgPSBpc0Fuc3dlckFmZmlybWF0aXZlKGFuc3dlcik7XG5cbiAgICAgIGlmICghYWZmaXJtYXRpdmUpIHtcbiAgICAgICAgcHJvY2VlZCgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZGlmZi5naXQocXVpZXRseSwgKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZnMoZGlmZiwgZGlmZnMpO1xuXG4gICAgICAgICAgY29uc29sZS5sb2coRkFJTEVEX0dJVF9NRVNTQUdFKTtcblxuICAgICAgICAgIGFib3J0KCk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcm9jZWVkKCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGVMb2dVbnB1Ymxpc2hlZERpZmZzKGRpZmYsIGRpZmZzKTtcblxuICAgIGNvbnNvbGUubG9nKEZBSUxFRF9HSVRfTUVTU0FHRSk7XG5cbiAgICBhYm9ydCgpO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJnaXRQcm9tcHRPcGVyYXRpb24iLCJwcm9tcHQiLCJzaGVsbFV0aWxpdGllcyIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJ5ZXMiLCJkaWZmIiwiZGlmZnMiLCJxdWlldGx5IiwiYW5zd2VyIiwiWUVTIiwiYXR0ZW1wdHMiLCJJbmZpbml0eSIsImRlc2NyaXB0aW9uIiwiQUREX0NPTU1JVF9QVVNIX0dJVF9ERVNDUklQVElPTiIsImVycm9yTWVzc2FnZSIsIklOVkFMSURfQU5TV0VSX01FU1NBR0UiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJ2YWxpZGF0ZUFuc3dlciIsIm9wdGlvbnMiLCJ2YWxpZCIsImFmZmlybWF0aXZlIiwiaXNBbnN3ZXJBZmZpcm1hdGl2ZSIsImdpdCIsInN1Y2Nlc3MiLCJjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyIsImNvbnNvbGUiLCJsb2ciLCJGQUlMRURfR0lUX01FU1NBR0UiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQWFBOzs7ZUFBd0JBOzs7eUJBWE87eUJBRVg7d0JBQ1c7c0JBQ0s7dUJBQ087NEJBQ0s7d0JBQ1c7QUFFM0QsSUFBTSxBQUFFQyxTQUFXQyx5QkFBYyxDQUF6QkQ7QUFFTyxTQUFTRCxtQkFBbUJHLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxPQUFPO0lBQ2hFLElBQVFDLE1BQThCRCxRQUE5QkMsS0FBS0MsT0FBeUJGLFFBQXpCRSxNQUFNQyxRQUFtQkgsUUFBbkJHLE9BQU9DLFVBQVlKLFFBQVpJLFNBQ3BCQyxTQUFTSixNQUNFSyxjQUFHLEdBQ0QsTUFDYkMsV0FBV0MsVUFDWEMsY0FBY0MsNkNBQStCLEVBQzdDQyxlQUFlQyxnQ0FBc0IsRUFDckNDLHFCQUFxQkMsd0JBQWMsRUFDbkNDLFVBQVU7UUFDUlYsUUFBQUE7UUFDQUUsVUFBQUE7UUFDQUUsYUFBQUE7UUFDQUUsY0FBQUE7UUFDQUUsb0JBQUFBO0lBQ0Y7SUFFTmpCLE9BQU9tQixTQUFTLFNBQUNWO1FBQ2YsSUFBTVcsUUFBU1gsV0FBVztRQUUxQixJQUFJVyxPQUFPO1lBQ1QsSUFBTUMsY0FBY0MsSUFBQUEsMkJBQW1CLEVBQUNiO1lBRXhDLElBQUksQ0FBQ1ksYUFBYTtnQkFDaEJuQjtnQkFFQTtZQUNGO1lBRUFJLEtBQUtpQixHQUFHLENBQUNmLFNBQVMsU0FBQ2dCO2dCQUNqQixJQUFJLENBQUNBLFNBQVM7b0JBQ1pDLElBQUFBLG1DQUEwQixFQUFDbkIsTUFBTUM7b0JBRWpDbUIsUUFBUUMsR0FBRyxDQUFDQyw0QkFBa0I7b0JBRTlCekI7b0JBRUE7Z0JBQ0Y7Z0JBRUFEO1lBQ0Y7WUFFQTtRQUNGO1FBRUF1QixJQUFBQSxtQ0FBMEIsRUFBQ25CLE1BQU1DO1FBRWpDbUIsUUFBUUMsR0FBRyxDQUFDQyw0QkFBa0I7UUFFOUJ6QjtJQUNGO0FBQ0YifQ==
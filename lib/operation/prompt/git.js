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
                    console.log(_messages.FAILED_GIT_MESSAGE);
                    abort();
                    return;
                }
                proceed();
            });
            return;
        }
        console.log(_messages.FAILED_GIT_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L2dpdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgc2hlbGxVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFlFUyB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHZhbGlkYXRlQW5zd2VyIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy92YWxpZGF0ZVwiO1xuaW1wb3J0IHsgaXNBbnN3ZXJBZmZpcm1hdGl2ZSB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvcHJvbXB0XCI7XG5pbXBvcnQgeyBBRERfQ09NTUlUX1BVU0hfR0lUX0RFU0NSSVBUSU9OIH0gZnJvbSBcIi4uLy4uL2Rlc2NyaXB0aW9uc1wiO1xuaW1wb3J0IHsgRkFJTEVEX0dJVF9NRVNTQUdFLCBJTlZBTElEX0FOU1dFUl9NRVNTQUdFIH0gZnJvbSBcIi4uLy4uL21lc3NhZ2VzXCI7XG5cbmNvbnN0IHsgcHJvbXB0IH0gPSBzaGVsbFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2l0UHJvbXB0T3BlcmF0aW9uKHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgeWVzLCBkaWZmLCBkaWZmcywgcXVpZXRseSB9ID0gY29udGV4dCxcbiAgICAgICAgYW5zd2VyID0geWVzID9cbiAgICAgICAgICAgICAgICAgICBZRVMgOlxuICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgYXR0ZW1wdHMgPSBJbmZpbml0eSxcbiAgICAgICAgZGVzY3JpcHRpb24gPSBBRERfQ09NTUlUX1BVU0hfR0lUX0RFU0NSSVBUSU9OLFxuICAgICAgICBlcnJvck1lc3NhZ2UgPSBJTlZBTElEX0FOU1dFUl9NRVNTQUdFLFxuICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb24gPSB2YWxpZGF0ZUFuc3dlciwgIC8vL1xuICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgIGFuc3dlcixcbiAgICAgICAgICBhdHRlbXB0cyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uXG4gICAgICAgIH07XG5cbiAgcHJvbXB0KG9wdGlvbnMsIChhbnN3ZXIpID0+IHtcbiAgICBjb25zdCB2YWxpZCA9IChhbnN3ZXIgIT09IG51bGwpO1xuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICBjb25zdCBhZmZpcm1hdGl2ZSA9IGlzQW5zd2VyQWZmaXJtYXRpdmUoYW5zd2VyKTtcblxuICAgICAgaWYgKCFhZmZpcm1hdGl2ZSkge1xuICAgICAgICBwcm9jZWVkKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkaWZmLmdpdChxdWlldGx5LCAoc3VjY2VzcykgPT4ge1xuICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhGQUlMRURfR0lUX01FU1NBR0UpO1xuXG4gICAgICAgICAgYWJvcnQoKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb2NlZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coRkFJTEVEX0dJVF9NRVNTQUdFKTtcblxuICAgIGFib3J0KCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImdpdFByb21wdE9wZXJhdGlvbiIsInByb21wdCIsInNoZWxsVXRpbGl0aWVzIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsInllcyIsImRpZmYiLCJkaWZmcyIsInF1aWV0bHkiLCJhbnN3ZXIiLCJZRVMiLCJhdHRlbXB0cyIsIkluZmluaXR5IiwiZGVzY3JpcHRpb24iLCJBRERfQ09NTUlUX1BVU0hfR0lUX0RFU0NSSVBUSU9OIiwiZXJyb3JNZXNzYWdlIiwiSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSIsInZhbGlkYXRpb25GdW5jdGlvbiIsInZhbGlkYXRlQW5zd2VyIiwib3B0aW9ucyIsInZhbGlkIiwiYWZmaXJtYXRpdmUiLCJpc0Fuc3dlckFmZmlybWF0aXZlIiwiZ2l0Iiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJGQUlMRURfR0lUX01FU1NBR0UiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQVlBOzs7ZUFBd0JBOzs7eUJBVk87eUJBRVg7d0JBQ1c7c0JBQ0s7NEJBQ1k7d0JBQ1c7QUFFM0QsSUFBTSxBQUFFQyxTQUFXQyx5QkFBYyxDQUF6QkQ7QUFFTyxTQUFTRCxtQkFBbUJHLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxPQUFPO0lBQ2hFLElBQVFDLE1BQThCRCxRQUE5QkMsS0FBS0MsT0FBeUJGLFFBQXpCRSxNQUFNQyxRQUFtQkgsUUFBbkJHLE9BQU9DLFVBQVlKLFFBQVpJLFNBQ3BCQyxTQUFTSixNQUNFSyxjQUFHLEdBQ0QsTUFDYkMsV0FBV0MsVUFDWEMsY0FBY0MsNkNBQStCLEVBQzdDQyxlQUFlQyxnQ0FBc0IsRUFDckNDLHFCQUFxQkMsd0JBQWMsRUFDbkNDLFVBQVU7UUFDUlYsUUFBQUE7UUFDQUUsVUFBQUE7UUFDQUUsYUFBQUE7UUFDQUUsY0FBQUE7UUFDQUUsb0JBQUFBO0lBQ0Y7SUFFTmpCLE9BQU9tQixTQUFTLFNBQUNWO1FBQ2YsSUFBTVcsUUFBU1gsV0FBVztRQUUxQixJQUFJVyxPQUFPO1lBQ1QsSUFBTUMsY0FBY0MsSUFBQUEsMkJBQW1CLEVBQUNiO1lBRXhDLElBQUksQ0FBQ1ksYUFBYTtnQkFDaEJuQjtnQkFFQTtZQUNGO1lBRUFJLEtBQUtpQixHQUFHLENBQUNmLFNBQVMsU0FBQ2dCO2dCQUNqQixJQUFJLENBQUNBLFNBQVM7b0JBQ1pDLFFBQVFDLEdBQUcsQ0FBQ0MsNEJBQWtCO29CQUU5QnhCO29CQUVBO2dCQUNGO2dCQUVBRDtZQUNGO1lBRUE7UUFDRjtRQUVBdUIsUUFBUUMsR0FBRyxDQUFDQyw0QkFBa0I7UUFFOUJ4QjtJQUNGO0FBQ0YifQ==